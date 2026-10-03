from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from django.shortcuts import get_object_or_404

from .models import Movie
from .serializers import MovieSerializer
from .tmdb_service import (
    get_tmdb_movies,
    format_tmdb_movie,
)

from accounts.permissions import IsAdminUserRole


class MovieListView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        status_filter = request.GET.get(
            "status"
        )

        search = request.GET.get(
            "search"
        )

        movies = Movie.objects.all()

        if status_filter:

            movies = movies.filter(
                status=status_filter.upper()
            )

        if search:

            movies = movies.filter(
                title__icontains=search
            )

        serializer = MovieSerializer(
            movies,
            many=True
        )

        return Response(
            serializer.data
        )


class MovieDetailView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request, movie_id):

        movie = get_object_or_404(
            Movie,
            id=movie_id
        )

        return Response(
            MovieSerializer(movie).data
        )


class TMDBNowPlayingView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        try:

            tamil_data = get_tmdb_movies(
                "discover/movie",
                {
                    "with_original_language": "ta",
                    "sort_by": "popularity.desc",
                    "with_release_type": "2|3",
                }
            )

            tamil_movies = [
                format_tmdb_movie(movie)
                for movie in tamil_data.get(
                    "results",
                    []
                )
            ]

            return Response({
                "results": tamil_movies
            })

        except Exception as error:

            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class TMDBUpcomingView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        try:

            data = get_tmdb_movies(
                "movie/upcoming"
            )

            movies = [
                format_tmdb_movie(movie)
                for movie in data.get(
                    "results",
                    []
                )
            ]

            return Response({
                "results": movies
            })

        except Exception as error:

            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MovieCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def post(self, request):

        serializer = MovieSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class MovieUpdateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def put(self, request, movie_id):

        movie = get_object_or_404(
            Movie,
            id=movie_id
        )

        serializer = MovieSerializer(
            movie,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class MovieDeleteView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def delete(self, request, movie_id):

        movie = get_object_or_404(
            Movie,
            id=movie_id
        )

        movie.delete()

        return Response(
            {
                "message": "Movie deleted successfully."
            }
        )