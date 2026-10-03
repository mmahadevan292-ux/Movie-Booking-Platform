from django.urls import path

from .views import (
    TheatreListView,
    TheatreDetailView,
    ScreenListView,
    SeatListView,
    TheatreCreateView,
    TheatreDeleteView,
)


urlpatterns = [

    path(
        "",
        TheatreListView.as_view(),
        name="theatre-list"
    ),

    path(
        "<int:theatre_id>/",
        TheatreDetailView.as_view(),
        name="theatre-detail"
    ),

    path(
        "<int:theatre_id>/screens/",
        ScreenListView.as_view(),
        name="screen-list"
    ),

    path(
        "screens/<int:screen_id>/seats/",
        SeatListView.as_view(),
        name="seat-list"
    ),

    path(
        "admin/create/",
        TheatreCreateView.as_view(),
        name="theatre-create"
    ),

    path(
        "admin/<int:theatre_id>/delete/",
        TheatreDeleteView.as_view(),
        name="theatre-delete"
    ),
]