// templates/emailTemplates.js

/**
 * Welcome email for new student
 */
function welcomeTemplate({studentName, studentId, studentEmail}) {
    return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background: #0f4c81; color: #ffffff; padding: 25px; text-align: center;">
        <h1>🎓 Welcome to Edvantage</h1>
        <p>Empowering oil & gas professionals</p>
      </div>
      <div style="padding: 25px; color: #333;">
        <h2>Hello ${studentName},</h2>
        <p>Welcome to <strong>Edvantage</strong> — your learning platform for
          world-class training, consultancy, and industry connections in the
          oil & gas sector.</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Student ID:</strong> ED-LE-${studentId}</p>
          <p><strong>Email:</strong> ${studentEmail}</p>
        </div>
        <p>You can now log in and begin your learning journey with us.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.edvantage.org.in/login" target="_blank"
             style="display: inline-block; background-color: #0f4c81; color: #ffffff;
                    text-decoration: none; padding: 14px 28px; border-radius: 6px;
                    font-size: 16px; font-weight: bold;">
            🔐 Log in to Edvantage
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          If the button doesn’t work, copy and paste this link into your browser:<br>
          <a href="https://www.edvantage.org.in/login" target="_blank">
            https://www.edvantage.org.in/login
          </a>
        </p>
        <p>
          Best regards,<br>
          <strong>Edvantage Team</strong>
        </p>
      </div>
      <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 14px;">
        <p>Connect with us</p>
        <a href="https://www.linkedin.com/company/edvantagelearning/" target="_blank">LinkedIn</a> |
        <a href="https://www.youtube.com/@edvantagelearning3858" target="_blank">YouTube</a> |
        <a href="https://www.instagram.com/edvantage_learning" target="_blank">Instagram</a>
      </div>
    </div>
  </body>
  </html>
    `;
  }
  
  /**
   * Course enrollment confirmation email
   */
  function enrollmentTemplate({studentName, courseName, enrollmentId}) {
    return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background: #0f4c81; color: #ffffff; padding: 25px; text-align: center;">
        <h1>✅ Enrollment Confirmed</h1>
      </div>
      <div style="padding: 25px; color: #333;">
        <h2>Hello ${studentName},</h2>
        <p>You have successfully enrolled in:</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${courseName}</h3>
          <p><strong>Enrollment ID:</strong> ENR-${enrollmentId}</p>
        </div>
        <p>Your course materials are now available in your dashboard.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.edvantage.org.in/dashboard" target="_blank"
             style="display: inline-block; background-color: #0f4c81; color: #ffffff;
                    text-decoration: none; padding: 14px 28px; border-radius: 6px;
                    font-size: 16px; font-weight: bold;">
            📚 Go to Dashboard
          </a>
        </div>
        <p>Happy learning!</p>
        <p>Best regards,<br><strong>Edvantage Team</strong></p>
      </div>
    </div>
  </body>
  </html>
    `;
  }
  
  /**
   * Password reset email
   */
  // user.email,
  // user.full_name,
  // reset_link
  function passwordResetTemplate({name, resetToken}) {
    const resetLink = `https://www.edvantage.org.in/reset-password?token=${resetToken}`;
    return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
      <div style="background: #0f4c81; color: #ffffff; padding: 25px; text-align: center;">
        <h1>🔐 Password Reset Request</h1>
      </div>
      <div style="padding: 25px; color: #333;">
        <h2>Hello ${name},</h2>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" target="_blank"
             style="display: inline-block; background-color: #0f4c81; color: #ffffff;
                    text-decoration: none; padding: 14px 28px; border-radius: 6px;
                    font-size: 16px; font-weight: bold;">
            🔑 Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          If you didn't request this, please ignore this email. This link will expire in 1 hour.
        </p>
        <p>Best regards,<br><strong>Edvantage Team</strong></p>
      </div>
    </div>
  </body>
  </html>
    `;
  }
  
  module.exports = {
    welcomeTemplate,
    enrollmentTemplate,
    passwordResetTemplate,
  };