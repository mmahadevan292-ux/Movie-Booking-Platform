function PaymentMethod({ method, setMethod }) {
  const methods = [
    {
      id: "card",
      title: "💳 Card",
      subtitle: "Credit / Debit Card",
    },
    {
      id: "gpay",
      title: "🟢 Google Pay",
      subtitle: "Pay using Google Pay",
    },
    {
      id: "phonepe",
      title: "🟣 PhonePe",
      subtitle: "Pay using PhonePe",
    },
    {
      id: "upi",
      title: "◎ UPI",
      subtitle: "UPI ID payment",
    },
    {
      id: "wallet",
      title: "◉ Wallet",
      subtitle: "Demo wallet payment",
    },
  ];

  return (
    <div className="payment-methods">
      {methods.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`payment-method ${method === item.id ? "active" : ""}`}
          onClick={() => setMethod(item.id)}
        >
          <strong>{item.title}</strong>

          <span>{item.subtitle}</span>
        </button>
      ))}
    </div>
  );
}

export default PaymentMethod;
