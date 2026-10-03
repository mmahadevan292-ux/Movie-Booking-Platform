import uuid

from django.db import models

from bookings.models import Booking


class Payment(models.Model):

    METHOD_CHOICES = [
        ("CARD", "Card"),
        ("UPI", "UPI"),
        ("WALLET", "Wallet"),
    ]

    STATUS_CHOICES = [
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
        ("CANCELLED", "Cancelled"),
    ]

    transaction_id = models.CharField(
        max_length=40,
        unique=True,
        editable=False
    )

    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name="payment"
    )

    method = models.CharField(
        max_length=20,
        choices=METHOD_CHOICES
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        if not self.transaction_id:

            self.transaction_id = (
                "TXN"
                + uuid.uuid4().hex[:14].upper()
            )

        super().save(
            *args,
            **kwargs
        )

    def __str__(self):

        return self.transaction_id