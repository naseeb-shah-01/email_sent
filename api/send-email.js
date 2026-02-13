const { sendEmail } = require('../lib/emailService');

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, templateName, data, html } = req.body;

    // Basic validation
    if (!to) {
      return res.status(400).json({ error: 'Missing "to" recipient' });
    }
    if (!subject) {
      return res.status(400).json({ error: 'Missing "subject"' });
    }
    if (!html && !templateName) {
      return res.status(400).json({
        error: 'Either provide "html" or a valid "templateName"',
      });
    }

    // Send email – this automatically logs to MongoDB
    const result = await sendEmail({ to, subject, templateName, data, html });

    return res.status(200).json({
      success: true,
      message: 'Email sent and logged',
      messageId: result.messageId,
      logId: result.logId,
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
};