import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateTotals} from './pricing.js';

test('regular order includes delivery fee', () => {
  assert.deepEqual(calculateTotals([{price:12.5,quantity:2}]),{subtotalCents:2500,discountCents:0,deliveryCents:399,totalCents:2899,coupon:''});
});
test('discount is applied before the free-delivery threshold', () => {
  const result=calculateTotals([{price:42,quantity:1}],'welcome10');
  assert.equal(result.discountCents,420);
  assert.equal(result.deliveryCents,399);
  assert.equal(result.totalCents,4179);
});
test('orders above the threshold deliver free', () => {
  const result=calculateTotals([{price:25,quantity:2}]);
  assert.equal(result.deliveryCents,0);
  assert.equal(result.totalCents,5000);
});
test('totals round to cents for multiple items', () => {
  const result=calculateTotals([{price:18.9,quantity:2},{price:5.5,quantity:1}]);
  assert.equal(result.subtotalCents,4330);
  assert.equal(result.totalCents,4330);
});
test('rejects unsupported coupons', () => {
  assert.throws(()=>calculateTotals([{price:12,quantity:1}],'HACK'),/Coupon is not valid/);
});
