const FuelRecord = require('../models/fuelRecord');
const { calcKmPerLitre, weeklyExpenditure, monthlyExpenditure, summariseRecords } = require('./calculation');

function getRecords(req, res) {
  const records = FuelRecord.findAllByUser(req.user.id);
  const enriched = records.map(r => ({
    ...r,
    kmPerLitre: calcKmPerLitre(r.distance, r.liters),
  }));
  res.json({ success: true, data: enriched });
}

function getSummary(req, res) {
  const records = FuelRecord.findAllByUser(req.user.id);
  const view = req.query.view === 'weekly' ? 'weekly' : 'monthly';
  const periods = view === 'weekly' ? weeklyExpenditure(records) : monthlyExpenditure(records);
  const overall = summariseRecords(records);
  res.json({ success: true, view, periods, overall });
}

module.exports = { getRecords, getSummary };
