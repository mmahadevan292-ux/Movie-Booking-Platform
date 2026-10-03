from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Theatre,
    Screen,
    Seat,
)

from .serializers import (
    TheatreSerializer,
    ScreenSerializer,
    SeatSerializer,
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from accounts.permissions import IsAdminUserRole


class TheatreListView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request):

        city = request.GET.get(
            "city"
        )

        theatres = Theatre.objects.filter(
            is_active=True
        )

        if city:

            theatres = theatres.filter(
                city__iexact=city
            )

        serializer = TheatreSerializer(
            theatres,
            many=True
        )

        return Response(
            serializer.data
        )


class TheatreDetailView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request, theatre_id):

        theatre = get_object_or_404(
            Theatre,
            id=theatre_id
        )

        return Response(
            TheatreSerializer(theatre).data
        )


class ScreenListView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request, theatre_id):

        screens = Screen.objects.filter(
            theatre_id=theatre_id
        )

        return Response(
            ScreenSerializer(
                screens,
                many=True
            ).data
        )


class SeatListView(APIView):

    permission_classes = [
        AllowAny
    ]

    def get(self, request, screen_id):

        seats = Seat.objects.filter(
            screen_id=screen_id,
            is_active=True
        )

        return Response(
            SeatSerializer(
                seats,
                many=True
            ).data
        )


class TheatreCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def post(self, request):

        serializer = TheatreSerializer(
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


class TheatreDeleteView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserRole,
    ]

    def delete(self, request, theatre_id):

        theatre = get_object_or_404(
            Theatre,
            id=theatre_id
        )

        theatre.delete()

        return Response({
            "message": "Theatre deleted successfully."
        })