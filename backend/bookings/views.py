from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from .models import (
    Show,
    Booking,
    BookingSeat,
)
from theatres.models import Seat
from .serializers import (
    ShowSerializer,
    BookingSerializer,
)

from .services import create_booking

from accounts.permissions import IsAdminUserRole


class ShowListView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        movie_id = request.GET.get(
            "movie_id"
        )

        theatre_id = request.GET.get(
            "theatre_id"
        )

        show_date = request.GET.get(
            "date"
        )

        shows = Show.objects.filter(
            is_active=True
        )

        if movie_id:

            shows = shows.filter(
                movie_id=movie_id
            )

        if theatre_id:

            shows = shows.filter(
                theatre_id=theatre_id
            )

        if show_date:

            shows = shows.filter(
                show_date=show_date
            )

        return Response(
            ShowSerializer(
                shows,
                many=True
            ).data
        )

class ShowSeatAvailabilityView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request, show_id):

        show = get_object_or_404(
            Show.objects.select_related(
                "screen"
            ),
            id=show_id,
            is_active=True
        )

        seats = Seat.objects.filter(
            screen=show.screen,
            is_active=True
        )

        booked_seat_ids = set(
            BookingSeat.objects.filter(
                booking__show=show,
                booking__status="CONFIRMED",
            ).values_list(
                "seat_id",
                flat=True
            )
        )

        data = []

        for seat in seats:

            data.append({
                "id": seat.id,
                "label": f"{seat.row}{seat.number}",
                "row": seat.row,
                "number": seat.number,
                "seat_type": seat.seat_type,
                "price": str(seat.price),
                "status": (
                    "booked"
                    if seat.id in booked_seat_ids
                    else "available"
                ),
            })

        return Response(data)
class ShowCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def post(self, request):

        serializer = ShowSerializer(
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


class BookingCreateView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        show_id = request.data.get(
            "show_id"
        )

        seat_ids = request.data.get(
            "seat_ids",
            []
        )

        if not show_id:

            return Response(
                {
                    "error": "show_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            booking = create_booking(
                request.user,
                show_id,
                seat_ids
            )

            return Response(
                BookingSerializer(
                    booking
                ).data,
                status=status.HTTP_201_CREATED
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


class BookingListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        bookings = (
            Booking.objects
            .filter(
                user=request.user
            )
            .select_related(
                "show__movie",
                "show__theatre",
            )
            .prefetch_related(
                "booking_seats__seat"
            )
            .order_by(
                "-created_at"
            )
        )

        return Response(
            BookingSerializer(
                bookings,
                many=True
            ).data
        )


class BookingDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, booking_id):

        booking = get_object_or_404(
            Booking.objects.prefetch_related(
                "booking_seats__seat"
            ),
            booking_id=booking_id,
            user=request.user
        )

        return Response(
            BookingSerializer(
                booking
            ).data
        )
class BookingConfirmView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        booking = get_object_or_404(
            Booking,
            booking_id=booking_id,
            user=request.user
        )

        if booking.status != "PENDING":
            return Response(
                {
                    "error": f"Only pending bookings can be confirmed. Current status: {booking.status}"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = "CONFIRMED"
        booking.save(update_fields=["status", "updated_at"])

        return Response(
            {
                "message": "Booking confirmed successfully.",
                "booking_id": booking.booking_id,
                "status": booking.status,
            },
            status=status.HTTP_200_OK
        )

class BookingCancelView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request, booking_id):

        booking = get_object_or_404(
            Booking,
            booking_id=booking_id,
            user=request.user
        )

        if booking.status != "CONFIRMED":

            return Response(
                {
                    "error": (
                        "Only confirmed bookings "
                        "can be cancelled."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = "CANCELLED"

        booking.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response({
            "message": "Booking cancelled successfully.",
            "booking_id": booking.booking_id,
        })


class AdminBookingListView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def get(self, request):

        bookings = (
            Booking.objects
            .select_related(
                "user",
                "show__movie",
                "show__theatre",
            )
            .prefetch_related(
                "booking_seats__seat"
            )
            .order_by(
                "-created_at"
            )
        )

        return Response(
            BookingSerializer(
                bookings,
                many=True
            ).data
        )