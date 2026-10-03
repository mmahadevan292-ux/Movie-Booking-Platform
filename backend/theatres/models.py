from django.db import models


class Theatre(models.Model):

    name = models.CharField(
        max_length=255
    )

    city = models.CharField(
        max_length=100
    )

    address = models.TextField()

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.city}"


class Screen(models.Model):

    theatre = models.ForeignKey(
        Theatre,
        on_delete=models.CASCADE,
        related_name="screens"
    )

    name = models.CharField(
        max_length=100
    )

    total_seats = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        return f"{self.theatre.name} - {self.name}"


class Seat(models.Model):

    SEAT_TYPE_CHOICES = [
        ("REGULAR", "Regular"),
        ("PREMIUM", "Premium"),
        ("RECLINER", "Recliner"),
    ]

    screen = models.ForeignKey(
        Screen,
        on_delete=models.CASCADE,
        related_name="seats"
    )

    row = models.CharField(
        max_length=5
    )

    number = models.PositiveIntegerField()

    seat_type = models.CharField(
        max_length=20,
        choices=SEAT_TYPE_CHOICES,
        default="REGULAR"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=150
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=[
                    "screen",
                    "row",
                    "number",
                ],
                name="unique_screen_seat"
            )
        ]

        ordering = [
            "row",
            "number",
        ]

    def __str__(self):

        return (
            f"{self.screen.name} - "
            f"{self.row}{self.number}"
        )