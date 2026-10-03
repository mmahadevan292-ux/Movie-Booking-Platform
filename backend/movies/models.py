from django.db import models


class Movie(models.Model):

    STATUS_CHOICES = [
        ("NOW_SHOWING", "Now Showing"),
        ("COMING_SOON", "Coming Soon"),
    ]

    tmdb_id = models.PositiveIntegerField(
        unique=True,
        null=True,
        blank=True
    )

    title = models.CharField(
        max_length=255
    )

    overview = models.TextField(
        blank=True
    )

    poster_path = models.ImageField(
    upload_to="movie_posters/",
    blank=True,
    null=True,
   )

    backdrop_path = models.URLField(
        blank=True,
        null=True
    )

    release_date = models.DateField(
        null=True,
        blank=True
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    duration = models.PositiveIntegerField(
        default=120,
        help_text="Duration in minutes"
    )

    language = models.CharField(
        max_length=50,
        default="English"
    )

    genres = models.CharField(
        max_length=255,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="NOW_SHOWING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title