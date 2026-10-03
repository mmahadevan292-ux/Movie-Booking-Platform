from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):

    booking_id = serializers.CharField(
        source="booking.booking_id",
        read_only=True
    )

    class Meta:

        model = Payment

        fields = [
            "id",
            "transaction_id",
            "booking_id",
            "method",
            "amount",
            "status",
            "created_at",
        ]