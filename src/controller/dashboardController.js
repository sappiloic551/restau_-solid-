const dashboardService = require('../services/dashboardService');

const dashboardController = {
  async summary(req, res) {
    try {
      const isAdmin = req.user?.role === 'admin';
      const mineParam = (req.query?.mine || '').toString().toLowerCase();
      const onlyMine = !isAdmin || mineParam === 'true';
      const data = await dashboardService.getSummary({ userId: onlyMine ? req.user.id : undefined });
      return res.status(200).json({ success: true, data });
    } catch (e) {
      console.error('[dashboardController.summary] error', e);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

module.exports = dashboardController;
