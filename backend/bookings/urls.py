from django.urls import path

from .views import (
    ShowListView,
    ShowSeatAvailabilityView,
    ShowCreateView,
    BookingCreateView,
    BookingListView,
    BookingDetailView,
    BookingConfirmView,
BookingCancelView,
    AdminBookingListView,
)


urlpatterns = [

    path(
        "shows/",
        ShowListView.as_view(),
        name="show-list"
    ),
    path(
        "shows/<int:show_id>/seats/",
        ShowSeatAvailabilityView.as_view(),
        name="show-seat-availability"
    ),
    path(
        "shows/create/",
        ShowCreateView.as_view(),
        name="show-create"
    ),

    path(
        "create/",
        BookingCreateView.as_view(),
        name="booking-create"
    ),

    path(
        "admin/all/",
        AdminBookingListView.as_view(),
        name="admin-bookings"
    ),

    path(
        "",
        BookingListView.as_view(),
        name="booking-list"
    ),
    path("<str:booking_id>/confirm/",
         BookingConfirmView.as_view(),
         name="booking-confirm"),

    path(
        "<str:booking_id>/cancel/",
        BookingCancelView.as_view(),
        name="booking-cancel"
    ),

    path(
        "<str:booking_id>/",
        BookingDetailView.as_view(),
        name="booking-detail"
    ),
]