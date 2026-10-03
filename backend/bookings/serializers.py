from rest_framework import serializers

from .models import (
    Show,
    Booking,
    BookingSeat,
)


class ShowSerializer(serializers.ModelSerializer):

    movie_title = serializers.CharField(
        source="movie.title",
        read_only=True
    )

    theatre_name = serializers.CharField(
        source="theatre.name",
        read_only=True
    )

    screen_name = serializers.CharField(
        source="screen.name",
        read_only=True
    )

    class Meta:

        model = Show

        fields = [
            "id",
            "movie",
            "movie_title",
            "theatre",
            "theatre_name",
            "screen",
            "screen_name",
            "show_date",
            "start_time",
            "end_time",
            "ticket_price",
            "is_active",
        ]


class BookingSeatSerializer(serializers.ModelSerializer):

    seat_label = serializers.SerializerMethodField()

    class Meta:

        model = BookingSeat

        fields = [
            "id",
            "seat",
            "seat_label",
            "price",
        ]

    def get_seat_label(self, obj):

        return (
            f"{obj.seat.row}"
            f"{obj.seat.number}"
        )


class BookingSerializer(serializers.ModelSerializer):

    seats = BookingSeatSerializer(
        source="booking_seats",
        many=True,
        read_only=True
    )

    movie_title = serializers.CharField(
        source="show.movie.title",
        read_only=True
    )

    theatre_name = serializers.CharField(
        source="show.theatre.name",
        read_only=True
    )

    show_date = serializers.DateField(
        source="show.show_date",
        read_only=True
    )

    start_time = serializers.TimeField(
        source="show.start_time",
        read_only=True
    )

    class Meta:

        model = Booking

        fields = [
            "id",
            "booking_id",
            "movie_title",
            "theatre_name",
            "show_date",
            "start_time",
            "total_seats",
            "subtotal",
            "convenience_fee",
            "gst",
            "total_amount",
            "status",
            "seats",
            "created_at",
        ]