/**
 * controllers/apiController.js
 * JWT-protected JSON API endpoints.
 */

const FuelRecord = require('../models/FuelRecord');
const { calcKmPerLitre, weeklyExpenditure, monthlyExpenditure, summariseRecords } = require('../utils/calculations');

/**
 * GET /api/records
 * Returns all fuel records for the authenticated user.
 * Appends calculated kmPerLitre to each record.
 */
async function getRecords(req, res) {
  try {
    const records = await FuelRecord.findByUser(req.user.id);

    const enriched = records.map(r => ({
      ...r,
      kmPerLitre: calcKmPerLitre(r.distanceKm, r.litres),
    }));

    res.json({ success: true, data: enriched });
  } catch (err) {
    console.error('[apiController.getRecords]', err);
    res.status(500).json({ error: 'Failed to fetch records.' });
  }
}

/**
 * GET /api/summary?view=weekly|monthly
 * Returns expenditure summary as JSON.
 */
async function getSummary(req, res) {
  try {
    const records = await FuelRecord.findByUser(req.user.id);
    const view    = req.query.view === 'weekly' ? 'weekly' : 'monthly';

    const periods  = view === 'weekly'
      ? weeklyExpenditure(records)
      : monthlyExpenditure(records);

    const overall  = summariseRecords(records);

    res.json({ success: true, view, periods, overall });
  } catch (err) {
    console.error('[apiController.getSummary]', err);
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
}

module.exports = { getRecords, getSummary };
