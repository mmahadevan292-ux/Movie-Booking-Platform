import random

from django.db import transaction

from rest_framework.exceptions import ValidationError

from bookings.models import Booking

from .models import Payment


@transaction.atomic
def process_demo_payment(
    user,
    booking_id,
    method
):

    method = method.upper()

    allowed_methods = {
        "CARD",
        "UPI",
        "WALLET",
    }

    if method not in allowed_methods:

        raise ValidationError(
            "Invalid payment method."
        )

    booking = (
        Booking.objects
        .select_for_update()
        .get(
            booking_id=booking_id,
            user=user
        )
    )

    if booking.status == "CANCELLED":

        raise ValidationError(
            "Cancelled booking cannot be paid."
        )

    if booking.status == "CONFIRMED":

        raise ValidationError(
            "Booking is already confirmed."
        )

    existing_payment = Payment.objects.filter(
        booking=booking
    ).first()

    if existing_payment:

        raise ValidationError(
            "Payment has already been attempted."
        )

    # Demo payment simulation.
    # Mostly successful for portfolio demonstration.
    is_success = random.random() < 0.90

    if is_success:

        payment_status = "SUCCESS"

        booking.status = "CONFIRMED"

    else:

        payment_status = "FAILED"

        booking.status = "FAILED"

    booking.save(
        update_fields=[
            "status",
            "updated_at",
        ]
    )

    payment = Payment.objects.create(
        booking=booking,
        method=method,
        amount=booking.total_amount,
        status=payment_status,
    )

    return payment