export default function calculateOrderSummary(cart) {
  const orderTotal = cart.reduce(
    (accumulator, element) => accumulator + (element.price * element.quantity),
    0,
  );

  const shippingPrice = orderTotal >= 200 ? 0 : 25;
  const tax = (0.15 * orderTotal);
  const grossTotal = orderTotal + shippingPrice + tax;

  return {
    orderTotal: orderTotal.toFixed(2),
    shippingPrice,
    tax: tax.toFixed(2),
    grossTotal: grossTotal.toFixed(2),
  };
}
