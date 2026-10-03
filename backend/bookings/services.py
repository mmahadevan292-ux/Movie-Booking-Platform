from decimal import Decimal

from django.db import transaction

from rest_framework.exceptions import ValidationError

from theatres.models import Seat

from .models import (
    Show,
    Booking,
    BookingSeat,
)


def calculate_booking_amount(
    seat_count,
    ticket_price
):

    subtotal = (
        Decimal(ticket_price)
        * Decimal(seat_count)
    )

    convenience_fee = (
        Decimal("30.00")
        * Decimal(seat_count)
    )

    gst = (
        subtotal
        * Decimal("0.18")
    )

    total = (
        subtotal
        + convenience_fee
        + gst
    )

    return {
        "subtotal": subtotal,
        "convenience_fee": convenience_fee,
        "gst": gst,
        "total": total,
    }


@transaction.atomic
def create_booking(
    user,
    show_id,
    seat_ids
):

    if not seat_ids:

        raise ValidationError(
            "Please select at least one seat."
        )

    show = (
        Show.objects
        .select_for_update()
        .select_related(
            "movie",
            "theatre",
            "screen",
        )
        .get(
            id=show_id,
            is_active=True
        )
    )

    seats = list(
        Seat.objects
        .select_for_update()
        .filter(
            id__in=seat_ids,
            screen=show.screen,
            is_active=True
        )
    )

    if len(seats) != len(set(seat_ids)):

        raise ValidationError(
            "One or more selected seats are invalid."
        )

    already_booked = set(
        BookingSeat.objects
        .filter(
            booking__show=show,
            booking__status="CONFIRMED",
            seat_id__in=seat_ids,
        )
        .values_list(
            "seat_id",
            flat=True
        )
    )

    if already_booked:

        raise ValidationError({
            "seats": (
                "Some selected seats are already booked. "
                "Please select different seats."
            )
        })

    amount = calculate_booking_amount(
        len(seats),
        show.ticket_price
    )

    booking = Booking.objects.create(
        user=user,
        show=show,
        total_seats=len(seats),
        subtotal=amount["subtotal"],
        convenience_fee=amount["convenience_fee"],
        gst=amount["gst"],
        total_amount=amount["total"],
        status="PENDING",
    )

    BookingSeat.objects.bulk_create([
        BookingSeat(
            booking=booking,
            seat=seat,
            price=show.ticket_price,
        )
        for seat in seats
    ])

    return booking