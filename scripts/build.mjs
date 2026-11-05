// Copies the source files into dist/, and writes the shop's orders page, which
// Vercel serves as the preview the factory's browser checks open.
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { listOrders, totalSales } from '../src/orders.js';

const escape = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Deliberately broken production build, for the M7 exit check. Revert this pull request afterwards.
if (process.env.VERCEL_ENV === 'production') throw new Error('Deliberately broken production build (M7 exit check).');

rmSync('dist', { recursive: true, force: true });
cpSync('src', 'dist', { recursive: true });

const rows = listOrders()
  .map((o) => `<tr><td>${o.id}</td><td>${escape(o.customer)}</td><td>${o.total.toFixed(2)}</td></tr>`)
  .join('');
const page = `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Orders</title></head>
<body>
<h1>Orders</h1>
<p>Preview of the M7 check 202611051542.</p>
<table><thead><tr><th>Order</th><th>Customer</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
<p id="total">Total sales: ${totalSales().toFixed(2)}</p>
</body>
</html>
`;
writeFileSync('dist/index.html', page);
mkdirSync('dist/orders', { recursive: true });
writeFileSync('dist/orders/index.html', page);
