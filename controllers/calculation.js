
function calcKmPerLitre(distanceKm, litresUsed) {
  if (!litresUsed || litresUsed <= 0) return null;
  return parseFloat((distanceKm / litresUsed).toFixed(2));
}


function groupByWeek(records) {
  const groups = {};
  for (const r of records) {
    const date = new Date(r.date);
    const key = getISOWeekKey(date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return groups;
}


function groupByMonth(records) {
  const groups = {};
  for (const r of records) {
    const date = new Date(r.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return groups;
}


function summariseRecords(records) {
  const totalSpend   = records.reduce((s, r) => s + (r.totalCost  || 0), 0);
  const totalLitres  = records.reduce((s, r) => s + (r.litres     || 0), 0);
  const totalKm      = records.reduce((s, r) => s + (r.distanceKm || 0), 0);
  const avgKmL       = calcKmPerLitre(totalKm, totalLitres);
  const avgPricePerL = totalLitres > 0
    ? parseFloat((totalSpend / totalLitres).toFixed(4))
    : null;

  return {
    count:        records.length,
    totalSpend:   parseFloat(totalSpend.toFixed(2)),
    totalLitres:  parseFloat(totalLitres.toFixed(2)),
    totalKm:      parseFloat(totalKm.toFixed(2)),
    avgKmL,
    avgPricePerL,
  };
}


function weeklyExpenditure(records) {
  const grouped = groupByWeek(records);
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, recs]) => ({ period: week, ...summariseRecords(recs) }));
}


function monthlyExpenditure(records) {
  const grouped = groupByMonth(records);
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, recs]) => ({ period: month, ...summariseRecords(recs) }));
}



function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

module.exports = {
  calcKmPerLitre,
  summariseRecords,
  weeklyExpenditure,
  monthlyExpenditure
};