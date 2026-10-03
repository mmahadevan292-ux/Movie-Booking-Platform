export function calculateTotal(seats, price = 180) {
  const ticket = seats.length * price;

  const convenienceFee = seats.length ? 30 : 0;

  const gst = Math.round((ticket + convenienceFee) * 0.18);

  return ticket + convenienceFee + gst;
}

export function createBookingId() {
  return "MB" + Date.now().toString().slice(-8);
}
