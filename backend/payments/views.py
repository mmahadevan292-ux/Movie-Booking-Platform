from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import (
    IsAuthenticated,
)

from bookings.models import Booking

from .models import Payment
from .serializers import PaymentSerializer
from .services import process_demo_payment

from accounts.permissions import IsAdminUserRole


class DemoPaymentView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        booking_id = request.data.get(
            "booking_id"
        )

        method = request.data.get(
            "method"
        )

        if not booking_id:

            return Response(
                {
                    "error": "booking_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not method:

            return Response(
                {
                    "error": "Payment method is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            payment = process_demo_payment(
                request.user,
                booking_id,
                method
            )

            return Response(
                PaymentSerializer(
                    payment
                ).data
            )

        except Exception as error:

            detail = getattr(
                error,
                "detail",
                str(error)
            )

            return Response(
                {
                    "error": detail
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class PaymentDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, transaction_id):

        payment = get_object_or_404(
            Payment,
            transaction_id=transaction_id,
            booking__user=request.user
        )

        return Response(
            PaymentSerializer(
                payment
            ).data
        )


class AdminPaymentListView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def get(self, request):

        payments = (
            Payment.objects
            .select_related(
                "booking",
                "booking__user",
            )
            .order_by(
                "-created_at"
            )
        )

        return Response(
            PaymentSerializer(
                payments,
                many=True
            ).data
        )