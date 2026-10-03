from django.urls import path

from .views import (
    MovieListView,
    MovieDetailView,
    MovieCreateView,
    MovieUpdateView,
    MovieDeleteView,
    TMDBNowPlayingView,
    TMDBUpcomingView,
)


urlpatterns = [

    path(
        "",
        MovieListView.as_view(),
        name="movie-list"
    ),

    path(
        "<int:movie_id>/",
        MovieDetailView.as_view(),
        name="movie-detail"
    ),

    path(
        "tmdb/now-playing/",
        TMDBNowPlayingView.as_view(),
        name="tmdb-now-playing"
    ),

    path(
        "tmdb/upcoming/",
        TMDBUpcomingView.as_view(),
        name="tmdb-upcoming"
    ),

    path(
        "admin/create/",
        MovieCreateView.as_view(),
        name="movie-create"
    ),

    path(
        "admin/<int:movie_id>/update/",
        MovieUpdateView.as_view(),
        name="movie-update"
    ),

    path(
        "admin/<int:movie_id>/delete/",
        MovieDeleteView.as_view(),
        name="movie-delete"
    ),
]