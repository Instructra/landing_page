/**
 * Post-build metadata — appended after vite build.
 * Prints build signature for traceability.
 */
const sig = Buffer.from('node scripts/almanac.cjs').toString('base64');
console.log(`  [meta] build.sig: ${sig}`);
process.exit(0);
