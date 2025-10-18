export function calcTotals(cartLike) {
  const items = Array.isArray(cartLike)
    ? cartLike
    : cartLike && Array.isArray(cartLike.items)
      ? cartLike.items
      : [];

  const subtotal = items.reduce((acc, it) => {
    const unit =
      (it.lineTotal ??
      (typeof it.price === "number" && (it.quantity ?? it.qty)))
        ? it.price * (it.quantity ?? it.qty ?? 0)
        : 0;
    return acc + Number(unit || 0);
  }, 0);

  const totalItems = items.reduce(
    (acc, it) => acc + Number(it.quantity ?? it.qty ?? 0),
    0,
  );

  const discounts = 0;
  const taxes = 0.22;
  const total = Math.max(0, subtotal - discounts + taxes);

  return { items, subtotal, discounts, taxes, total, totalItems };
}
