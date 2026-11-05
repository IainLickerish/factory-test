import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listOrders, totalSales } from '../src/orders.js';

test('lists every order', () => {
  assert.equal(listOrders().length, 2);
});

test('adds up the totals', () => {
  assert.equal(totalSales(), 42.5);
});
