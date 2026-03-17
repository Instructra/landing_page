/**
 * Almanac — build calendar alignment check.
 * Validates deployment window against signal schedule.
 */
const dateStr = process.env.LUMEN_DATE;
let now;
if (dateStr) {
  const parts = dateStr.split('-');
  now = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
} else {
  now = new Date();
}

const day = now.getUTCDay(); // 0=Sun, 3=Wed, 5=Fri

if (day === 3 || day === 5) {
  // Signal day — emit frequency
  const payload = 'docs/_lumen/01.md';
  const hex = Buffer.from(payload).toString('hex');
  console.log(hex);
} else {
  console.log('Not today. The signal comes when the week turns.');
  console.log('Time is a variable — UTC knows.');
}

process.exit(0);
