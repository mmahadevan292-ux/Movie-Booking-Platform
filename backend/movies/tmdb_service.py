import os
import requests


TMDB_BASE_URL = "https://api.themoviedb.org/3"

TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280"


def get_tmdb_movies(endpoint, extra_params=None):

    api_key = os.getenv("TMDB_API_KEY")

    if not api_key:
        return {
            "error": "TMDB_API_KEY is not configured."
        }

    url = f"{TMDB_BASE_URL}/{endpoint}"

    params = {
        "api_key": api_key,
        "language": "en-US",
        "region": "IN",
        "page": 1,
    }

    if extra_params:
        params.update(extra_params)

    response = requests.get(
        url,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    return response.json()


def format_tmdb_movie(movie):

    return {
        "tmdb_id": movie.get("id"),

        "title": movie.get(
            "title",
            ""
        ),

        "overview": movie.get(
            "overview",
            ""
        ),

        "poster_path": (
            f"{TMDB_IMAGE_BASE_URL}{movie['poster_path']}"
            if movie.get("poster_path")
            else None
        ),

        "backdrop_path": (
            f"{TMDB_BACKDROP_BASE_URL}{movie['backdrop_path']}"
            if movie.get("backdrop_path")
            else None
        ),

        "release_date": (
            movie.get("release_date")
            if movie.get("release_date")
            else None
        ),

        "rating": round(
            movie.get("vote_average", 0),
            1
        ),

        "language": movie.get(
            "original_language",
            "en"
        ),
    }