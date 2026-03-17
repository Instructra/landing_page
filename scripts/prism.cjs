/**
 * Prism — refracts light into its component parts.
 * Usage: node scripts/prism.cjs <sha256-hash>
 */
const crypto = require('crypto');

const CANONICAL = 'nextPath=scripts/prism.cjs|salt=lumen';
const expected = crypto.createHash('sha256').update(CANONICAL).digest('hex');

const provided = process.argv[2];

if (!provided) {
  console.log('The prism requires light. Pass the hash of the full payload.');
  process.exit(0);
}

if (provided.toLowerCase() === expected) {
  console.log('The light refracts. You see clearly now.\n');
  console.log('Run: git grep -n "LUMEN_SEED"');
  console.log('\nWe can practically hear you grepping.');
} else {
  console.log('The prism refracts nothing without the right light.');
  console.log('Hash the full message, not just a piece of it.');
}

process.exit(0);
