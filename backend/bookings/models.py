import uuid

from django.db import models

from django.contrib.auth.models import User

from movies.models import Movie

from theatres.models import (
    Theatre,
    Screen,
    Seat,
)


class Show(models.Model):

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name="shows"
    )

    theatre = models.ForeignKey(
        Theatre,
        on_delete=models.CASCADE,
        related_name="shows"
    )

    screen = models.ForeignKey(
        Screen,
        on_delete=models.CASCADE,
        related_name="shows"
    )

    show_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    ticket_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=150
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        ordering = [
            "show_date",
            "start_time",
        ]

    def __str__(self):

        return (
            f"{self.movie.title} | "
            f"{self.theatre.name} | "
            f"{self.show_date} | "
            f"{self.start_time}"
        )


class Booking(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("CANCELLED", "Cancelled"),
        ("FAILED", "Failed"),
    ]

    booking_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    show = models.ForeignKey(
        Show,
        on_delete=models.PROTECT,
        related_name="bookings"
    )

    total_seats = models.PositiveIntegerField()

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    convenience_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    gst = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):

        if not self.booking_id:

            self.booking_id = (
                "MB"
                + uuid.uuid4().hex[:10].upper()
            )

        super().save(
            *args,
            **kwargs
        )

    def __str__(self):

        return self.booking_id


class BookingSeat(models.Model):

    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name="booking_seats"
    )

    seat = models.ForeignKey(
        Seat,
        on_delete=models.PROTECT,
        related_name="booking_seats"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "booking",
                    "seat",
                ],
                name="unique_booking_seat"
            )
        ]

    def __str__(self):

        return (
            f"{self.booking.booking_id} - "
            f"{self.seat}"
        )