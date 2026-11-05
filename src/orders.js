/** The shop's orders, kept in memory for this example. */
const orders = [
  { id: 1, customer: 'Ada', total: 12.5 },
  { id: 2, customer: 'Grace', total: 30 },
];

/** Returns a copy of every order. */
export function listOrders() {
  return orders.map((order) => ({ ...order }));
}

/** Returns the sum of all order totals. */
export function totalSales() {
  return orders.reduce((sum, order) => sum + order.total, 0);
}
