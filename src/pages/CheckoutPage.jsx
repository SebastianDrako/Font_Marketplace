import React, { useMemo, useState } from "react";
import { useCart } from "../hooks/useCart";      // named export
import { calcTotals } from "../utils/cartTotals";

const initialShipping = {
  fullName: "Juan Pérez",
  address: "Calle 123 #45-67",
  city: "Buenos Aires",
  postalCode: "C1425",
};

const initialPayment = {
  cardName: "Juan Pérez",
  cardNumber: "",
  expiry: "",
  cvv: "",
  saveCard: true,
};

function Step({ n, label, active, done }) {
  const base = "rounded-circle d-inline-flex align-items-center justify-content-center border";
  const size = { width: 32, height: 32 };
  let extra = " bg-light text-muted border-secondary";
  if (done) extra = " bg-primary text-white border-primary";
  if (active) extra = " bg-primary-subtle text-primary border-primary";
  return (
    <div className="d-flex align-items-center me-4 mb-3">
      <div className={base + extra} style={size}><strong>{n}</strong></div>
      <span className="ms-2 small fw-semibold">{label}</span>
    </div>
  );
}

function money(n) {
  try {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" }).format(n);
  } catch {
    return `$${Number(n || 0).toFixed(2)} USD`;
  }
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(initialShipping);
  const [payment, setPayment] = useState(initialPayment);
  const [terms, setTerms] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Carrito del contexto
  const { cart: ctxCart } = useCart();

  // Totales compartidos (mismo cálculo que el carrito)
  const { subtotal, totalItems } = useMemo(() => calcTotals(ctxCart), [ctxCart]);

  // Shipping informativo (no se suma al total para igualar el carrito)
  const shippingCost = 0;

  // Total a pagar igual al del carrito
  const totalToPay = subtotal;

  const maskNum = (v) => (v.replace(/\D/g, "").match(/\d{1,4}/g) || []).join(" ").slice(0, 19);

  // Validación de envío SIN country
  const okShipping = () =>
    ["fullName", "address", "city", "postalCode"].every(
      (k) => String(shipping[k] || "").trim()
    );

  const okPayment = () => {
    const num = payment.cardNumber.replace(/\s+/g, "");
    if (!payment.cardName || num.length < 13) return false;
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(payment.expiry)) return false;
    if (!/^\d{3,4}$/.test(payment.cvv)) return false;
    return true;
  };

  const next = () => {
    if (step === 1 && !okShipping()) return alert("Completa los datos de envío.");
    if (step === 2 && !okPayment()) return alert("Revisa los datos de la tarjeta.");
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const placeOrder = async () => {
    if (!terms) return alert("Debes aceptar los términos.");
    setPlacing(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setOrderId(`ORD-${Math.random().toString(36).slice(2,8).toUpperCase()}`);
    } finally {
      setPlacing(false);
    }
  };

  const masked = payment.cardNumber ? `•••• •••• •••• ${payment.cardNumber.replace(/\D/g,"").slice(-4)}` : "—";

  return (
    <div className="container my-4">
      <p className="text-muted small mb-1">Cart / Checkout</p>
      <h1 className="h4 fw-bold mb-4">Checkout</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between mb-3">
                <Step n={1} label="Shipping" active={step===1} done={step>1} />
                <Step n={2} label="Payment" active={step===2} done={step>2} />
                <Step n={3} label="Review"  active={step===3} done={false} />
              </div>

              {step===1 && (
                <form onSubmit={(e)=>{e.preventDefault(); next();}}>
                  <h6 className="fw-semibold mb-3">Shipping Information</h6>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small">Full Name</label>
                      <input className="form-control" value={shipping.fullName}
                        onChange={(e)=>setShipping({...shipping, fullName: e.target.value})}/>
                    </div>
                    <div className="col-12">
                      <label className="form-label small">Address</label>
                      <input className="form-control" value={shipping.address}
                        onChange={(e)=>setShipping({...shipping, address: e.target.value})}/>
                    </div>
                    <div className="col-6">
                      <label className="form-label small">City</label>
                      <input className="form-control" value={shipping.city}
                        onChange={(e)=>setShipping({...shipping, city: e.target.value})}/>
                    </div>
                    <div className="col-6">
                      <label className="form-label small">Postal Code</label>
                      <input className="form-control" value={shipping.postalCode}
                        onChange={(e)=>setShipping({...shipping, postalCode: e.target.value})}/>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary">Continue to Payment →</button>
                  </div>
                </form>
              )}

              {step===2 && (
                <form onSubmit={(e)=>{e.preventDefault(); next();}}>
                  <h6 className="fw-semibold mb-3">Payment</h6>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small">Cardholder Name</label>
                      <input className="form-control" value={payment.cardName}
                        onChange={(e)=>setPayment({...payment, cardName: e.target.value})}/>
                    </div>
                    <div className="col-12">
                      <label className="form-label small">Card Number</label>
                      <input className="form-control" inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={maskNum(payment.cardNumber)}
                        onChange={(e)=>setPayment({...payment, cardNumber: e.target.value})}/>
                    </div>
                    <div className="col-6">
                      <label className="form-label small">Expiration (MM/AA)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="expiry"
                        autoComplete="cc-exp"
                        inputMode="text"
                        maxLength={5}
                        placeholder="MM/AA"
                        value={payment.expiry}
                        onChange={(e) => {
                          let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                          let v = raw;
                          if (raw.length >= 3) v = raw.slice(0, 2) + "/" + raw.slice(2);
                          setPayment({ ...payment, expiry: v });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && payment.expiry.endsWith("/")) {
                            e.preventDefault();
                            setPayment({ ...payment, expiry: payment.expiry.slice(0, 1) });
                          }
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small">CVV</label>
                      <input className="form-control" inputMode="numeric" maxLength="4" placeholder="3-4 dígitos"
                        value={payment.cvv}
                        onChange={(e)=>setPayment({...payment, cvv: e.target.value.replace(/\D/g, "")})}/>
                    </div>
                    <div className="col-12 form-check mt-1 ms-1">
                      <input className="form-check-input" type="checkbox" id="saveCard"
                        checked={payment.saveCard}
                        onChange={(e)=>setPayment({...payment, saveCard: e.target.checked})}/>
                      <label className="form-check-label small" htmlFor="saveCard">
                        Guardar tarjeta para futuras compras
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="btn btn-outline-secondary" onClick={back}>← Back</button>
                    <button className="btn btn-primary">Review →</button>
                  </div>
                </form>
              )}

              {step===3 && (
                <div>
                  <h6 className="fw-semibold mb-3">Review</h6>
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-semibold mb-2">Shipping Address</h6>
                        <div className="small">
                          <div>{shipping.fullName}</div>
                          <div>{shipping.address}</div>
                          <div>{shipping.city} • {shipping.postalCode}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-semibold mb-2">Payment</h6>
                        <div className="small">
                          <div>{payment.cardName || "—"}</div>
                          <div>{masked}</div>
                          <div>Expira {payment.expiry || "—"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded p-3 mt-3">
                    <h6 className="fw-semibold">Resumen</h6>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">Artículos</span><span>{totalItems}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">Subtotal</span><span>{money(subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">Shipping</span><span>{money(shippingCost)}</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="d-flex justify-content-between">
                      <strong>Total a pagar</strong><strong>{money(totalToPay)}</strong>
                    </div>
                  </div>

                  {orderId && <div className="alert alert-primary mt-3 mb-0">¡Orden creada! ID: <strong>{orderId}</strong></div>}

                  <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" id="terms" checked={terms} onChange={(e)=>setTerms(e.target.checked)}/>
                    <label className="form-check-label small" htmlFor="terms">Acepto los Términos y Condiciones y la Política de Privacidad.</label>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="btn btn-outline-secondary" onClick={back}>← Back</button>
                    <button type="button" className="btn btn-primary" disabled={placing} onClick={placeOrder}>
                      {placing ? "Procesando…" : "Pagar ahora"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm sticky-top" style={{top:"1.5rem"}}>
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Artículos</span><span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Subtotal</span><span>{money(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Shipping</span><span>{money(shippingCost)}</span>
              </div>
              <hr className="my-2"/>
              <div className="d-flex justify-content-between">
                <strong>Total a pagar</strong><strong>{money(totalToPay)}</strong>
              </div>

              <div className="alert alert-success d-flex align-items-start gap-2 mt-3 mb-0">
                <span className="badge text-bg-success rounded-circle d-inline-flex align-items-center justify-content-center" style={{width:20,height:20}}>✓</span>
                <div>
                  <div className="small fw-semibold mb-0">Secure Checkout</div>
                  <div className="small text-success-emphasis">Tu información está protegida y encriptada.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
