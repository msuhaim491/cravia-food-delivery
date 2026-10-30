// Pure, server-authoritative pricing; amounts are computed in integer cents.
export function calculateTotals(lines, coupon = '') {
  const code = String(coupon || '').trim().toUpperCase();
  if (code && code !== 'WELCOME10') throw new Error('Coupon is not valid');
  const subtotalCents = lines.reduce((sum, line) => sum + Math.round(Number(line.price) * 100) * Number(line.quantity), 0);
  if (!Number.isSafeInteger(subtotalCents) || subtotalCents < 0) throw new Error('Invalid order amount');
  const discountCents = code === 'WELCOME10' ? Math.round(subtotalCents * 0.1) : 0;
  const deliveryCents = (subtotalCents - discountCents) >= 4000 ? 0 : 399;
  const totalCents = subtotalCents - discountCents + deliveryCents;
  return {subtotalCents, discountCents, deliveryCents, totalCents, coupon: code};
}
