from django.contrib import admin

from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "status",
        "release_date",
        "rating",
        "language",
    )

    list_filter = (
        "status",
        "language",
    )

    search_fields = (
        "title",
        "genres",
    )