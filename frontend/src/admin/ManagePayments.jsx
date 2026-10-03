function ManagePayments() {
  return (
    <main className="page">
      <div className="page-header compact">
        <span className="eyebrow">ADMIN / PAYMENTS</span>

        <h1>Payment activity.</h1>
      </div>

      <div className="admin-grid">
        <div className="admin-stat">
          <span>Successful</span>
          <strong>1,240</strong>
        </div>

        <div className="admin-stat">
          <span>Failed</span>
          <strong>44</strong>
        </div>

        <div className="admin-stat">
          <span>Demo Volume</span>
          <strong>₹4.8L</strong>
        </div>
      </div>
    </main>
  );
}

export default ManagePayments;
