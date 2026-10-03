from django.contrib import admin

from .models import (
    Show,
    Booking,
    BookingSeat,
)


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):

    list_display = (
        "movie",
        "theatre",
        "screen",
        "show_date",
        "start_time",
        "ticket_price",
        "is_active",
    )

    list_filter = (
        "show_date",
        "is_active",
        "theatre",
    )

    search_fields = (
        "movie__title",
        "theatre__name",
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        "booking_id",
        "user",
        "show",
        "total_seats",
        "total_amount",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "booking_id",
        "user__username",
        "user__email",
    )


@admin.register(BookingSeat)
class BookingSeatAdmin(admin.ModelAdmin):

    list_display = (
        "booking",
        "seat",
        "price",
    )