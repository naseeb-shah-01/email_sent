const connectDB = require('../lib/db');
const EmailLog = require('../lib/emailLog.model');

module.exports = async (req, res) => {
  await connectDB();
  const { email, status, limit = 50 } = req.query;

  const filter = {};
  if (email) filter.to = email;
  if (status) filter.status = status;

  try {
    const logs = await EmailLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};