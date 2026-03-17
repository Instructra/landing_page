/**
 * Candle — illumination requires the right key.
 * The key is a date. The date is the key.
 */
const dateStr = process.env.LUMEN_DATE;
let key;
if (dateStr) {
  key = dateStr.replace(/-/g, '');
} else {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  key = `${y}${m}${d}`;
}

// Encrypted payload — XOR with the correct 8-char date key
const encrypted = Buffer.from([86,95,81,69,31,108,92,65,95,85,92,25,0,1,30,89,86]);

const keyBytes = Buffer.from(key, 'ascii');
const decrypted = Buffer.alloc(encrypted.length);
for (let i = 0; i < encrypted.length; i++) {
  decrypted[i] = encrypted[i] ^ keyBytes[i % keyBytes.length];
}

const result = decrypted.toString('ascii');

// Validate — correct decryption produces a readable path
if (/^docs\/_lumen\/\d{2}\.md$/.test(result)) {
  console.log(result);
} else {
  console.log('Wrong key. The darkness laughs. Try again.');
}

process.exit(0);
