from rest_framework import serializers

from .models import Movie


class MovieSerializer(serializers.ModelSerializer):

    class Meta:

        model = Movie

        fields = [
            "id",
            "tmdb_id",
            "title",
            "overview",
            "poster_path",
            "backdrop_path",
            "release_date",
            "rating",
            "duration",
            "language",
            "genres",
            "status",
            "created_at",
        ]