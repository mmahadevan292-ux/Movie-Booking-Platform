import { useState } from "react";

function PaymentForm({ method, amount, onPay }) {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
  });

  const updateField = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();

    onPay({
      ...form,
      method,
    });
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="demo-alert">
        DEMO PAYMENT — No real money will be charged.
      </div>

      {/* CARD */}
      {method === "card" && (
        <>
          <label>
            Name on Card
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter card holder name"
              required
            />
          </label>

          <label>
            Card Number
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={updateField}
              placeholder="4111 1111 1111 1111"
              maxLength="19"
              required
            />
          </label>

          <div className="form-row">
            <label>
              Expiry
              <input
                name="expiry"
                value={form.expiry}
                onChange={updateField}
                placeholder="MM/YY"
                required
              />
            </label>

            <label>
              CVV
              <input
                name="cvv"
                value={form.cvv}
                onChange={updateField}
                placeholder="123"
                maxLength="4"
                required
              />
            </label>
          </div>
        </>
      )}

      {/* GOOGLE PAY */}
      {method === "gpay" && (
        <div className="digital-payment-box">
          <div className="digital-payment-logo gpay-logo">G</div>

          <h3>Google Pay</h3>

          <p>Enter your UPI ID to continue with Google Pay.</p>

          <label>
            Google Pay UPI ID
            <input
              name="upi"
              value={form.upi}
              onChange={updateField}
              placeholder="yourname@okaxis"
              required
            />
          </label>
        </div>
      )}

      {/* PHONEPE */}
      {method === "phonepe" && (
        <div className="digital-payment-box">
          <div className="digital-payment-logo phonepe-logo">P</div>

          <h3>PhonePe</h3>

          <p>Enter your UPI ID to continue with PhonePe.</p>

          <label>
            PhonePe UPI ID
            <input
              name="upi"
              value={form.upi}
              onChange={updateField}
              placeholder="yourname@ybl"
              required
            />
          </label>
        </div>
      )}

      {/* UPI */}
      {method === "upi" && (
        <label>
          UPI ID
          <input
            name="upi"
            value={form.upi}
            onChange={updateField}
            placeholder="name@upi"
            required
          />
        </label>
      )}

      {/* WALLET */}
      {method === "wallet" && (
        <label>
          Demo Wallet ID
          <input
            name="upi"
            value={form.upi}
            onChange={updateField}
            placeholder="wallet-user-001"
            required
          />
        </label>
      )}

      <button type="submit" className="primary-button full">
        Pay ₹{amount}
      </button>
    </form>
  );
}

export default PaymentForm;
