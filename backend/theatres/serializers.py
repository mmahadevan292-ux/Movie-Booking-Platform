from rest_framework import serializers

from .models import (
    Theatre,
    Screen,
    Seat,
)


class SeatSerializer(serializers.ModelSerializer):

    label = serializers.SerializerMethodField()

    class Meta:

        model = Seat

        fields = [
            "id",
            "row",
            "number",
            "label",
            "seat_type",
            "price",
            "is_active",
        ]

    def get_label(self, obj):

        return f"{obj.row}{obj.number}"


class ScreenSerializer(serializers.ModelSerializer):

    seats = SeatSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Screen

        fields = [
            "id",
            "name",
            "total_seats",
            "seats",
        ]


class TheatreSerializer(serializers.ModelSerializer):

    screens = ScreenSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Theatre

        fields = [
            "id",
            "name",
            "city",
            "address",
            "phone",
            "is_active",
            "screens",
        ]