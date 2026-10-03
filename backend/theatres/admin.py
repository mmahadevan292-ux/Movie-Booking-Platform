from django.contrib import admin

from .models import (
    Theatre,
    Screen,
    Seat,
)


class SeatInline(admin.TabularInline):

    model = Seat

    extra = 0


@admin.register(Screen)
class ScreenAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "theatre",
        "total_seats",
    )

    inlines = [
        SeatInline
    ]


@admin.register(Theatre)
class TheatreAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "city",
        "phone",
        "is_active",
    )

    list_filter = (
        "city",
        "is_active",
    )

    search_fields = (
        "name",
        "city",
    )


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):

    list_display = (
        "screen",
        "row",
        "number",
        "seat_type",
        "price",
        "is_active",
    )

    list_filter = (
        "seat_type",
        "is_active",
    )