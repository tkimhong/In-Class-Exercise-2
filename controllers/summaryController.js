const FuelRecord = require('../models/fuelRecord');
const { weeklyExpenditure, monthlyExpenditure, summariseRecords } = require('./calculation');

function getSummary(req, res) {
  const records = FuelRecord.findAllByUser(req.session.user.id);
  const view = req.query.view === 'weekly' ? 'weekly' : 'monthly';
  const overall = summariseRecords(records);
  const weekly = weeklyExpenditure(records);
  const monthly = monthlyExpenditure(records);

  res.render('summary', {
    overall,
    weekly,
    monthly,
    isWeekly: view === 'weekly',
    isMonthly: view === 'monthly',
  });
}

module.exports = { getSummary };
