const nodemailer = require('nodemailer');
const connectDB = require('./db');
const EmailLog = require('./emailLog.model');
const templates = require('../templates/emailTemplates');

// Create transporter once (reused across warm invocations)
let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

/**
 * Core send function – always logs to MongoDB
 */
async function sendEmail({ to, subject, templateName, data, html }) {
  // Ensure DB is connected
  await connectDB();

  // Create a log entry with pending status
  const logEntry = new EmailLog({
    to,
    subject,
    templateName: templateName || 'custom',
    data: data || {},
    status: 'pending',
  });

  try {
    await logEntry.save();

    // Determine HTML content
    let emailHtml = html;
    if (!emailHtml && templateName && templates[templateName]) {
      emailHtml = templates[templateName](data);
    }
    if (!emailHtml) {
      throw new Error('No email content provided (neither html nor valid template)');
    }

    const transporter = getTransporter();
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    // Update log: success
    logEntry.status = 'sent';
    logEntry.messageId = info.messageId;
    logEntry.sentAt = new Date();
    await logEntry.save();

    return { success: true, messageId: info.messageId, logId: logEntry._id };
  } catch (error) {
    // Update log: failed
    logEntry.status = 'failed';
    logEntry.error = error.message;
    await logEntry.save();

    throw error; // rethrow to be caught by the API handler
  }
}

// Convenience methods (optional)
module.exports = {
  sendWelcomeEmail: (to, studentName, studentId, studentEmail) =>
    sendEmail({
      to,
      subject: `Welcome ${studentName}! - Edvantage Learning`,
      templateName: 'welcome',
      data: { studentName, studentId, studentEmail },
    }),

  sendEnrollmentEmail: (to, studentName, courseName, enrollmentId) =>
    sendEmail({
      to,
      subject: `Enrollment Confirmed: ${courseName}`,
      templateName: 'enrollment',
      data: { studentName, courseName, enrollmentId },
    }),

  sendPasswordResetEmail: (to, name, resetToken) =>
    sendEmail({
      to,
      subject: 'Reset Your Password - Edvantage',
      templateName: 'passwordReset',
      data: { name, resetToken },
    }),

  // Generic send with full control
  sendEmail,
};