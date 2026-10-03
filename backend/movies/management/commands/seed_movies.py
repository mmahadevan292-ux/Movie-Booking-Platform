from django.core.management.base import BaseCommand
from movies.models import Movie


class Command(BaseCommand):
    help = "Seed current Tamil movies"

    def handle(self, *args, **kwargs):
        movies = [
            {
                "title": "Baththa",
                "language": "Tamil",
                "release_date": "2026-10-01",
                "rating": 0,
                "duration": 159,
                "genres": "Drama, Action",
                "status": "NOW_SHOWING",
                "overview": "Tamil drama and action movie currently listed for theatrical release.",
                "poster_path": "",
                "backdrop_path": "",
            },
            {
                "title": "Yezhu Kadal Yezhu Malai",
                "language": "Tamil",
                "release_date": "2026-10-01",
                "rating": 0,
                "duration": 135,
                "genres": "Drama, Fantasy",
                "status": "NOW_SHOWING",
                "overview": "Tamil drama and fantasy movie currently listed for theatrical release.",
                "poster_path": "",
                "backdrop_path": "",
            },
            {
                "title": "Kitti",
                "language": "Tamil",
                "release_date": "2026-10-02",
                "rating": 0,
                "duration": 119,
                "genres": "Psychological, Thriller",
                "status": "NOW_SHOWING",
                "overview": "Tamil psychological thriller currently listed for theatrical release.",
                "poster_path": "",
                "backdrop_path": "",
            },
            {
                "title": "Anbil Avan",
                "language": "Tamil",
                "release_date": "2026-10-02",
                "rating": 0,
                "duration": 157,
                "genres": "Drama, Romance, Action",
                "status": "NOW_SHOWING",
                "overview": "Tamil drama, romance and action movie currently listed for theatrical release.",
                "poster_path": "",
                "backdrop_path": "",
            },
            {
                "title": "Jailer 2",
                "language": "Tamil",
                "release_date": "2026-10-15",
                "rating": 0,
                "duration": 120,
                "genres": "Action",
                "status": "COMING_SOON",
                "overview": "Tamil action movie scheduled for an upcoming theatrical release.",
                "poster_path": "",
                "backdrop_path": "",
            },
        ]

        for movie_data in movies:
            Movie.objects.update_or_create(
                title=movie_data["title"],
                defaults=movie_data,
            )

        self.stdout.write(
            self.style.SUCCESS("Tamil movies seeded successfully.")
        )