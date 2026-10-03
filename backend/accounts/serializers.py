from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):

    role = serializers.SerializerMethodField()

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
        ]

    def get_role(self, obj):

        if hasattr(obj, "profile"):
            return obj.profile.role

        return "CUSTOMER"


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    password_confirm = serializers.CharField(
        write_only=True
    )

    phone = serializers.CharField(
        required=False,
        allow_blank=True
    )

    class Meta:

        model = User

        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "password",
            "password_confirm",
        ]

    def validate(self, data):

        if data["password"] != data["password_confirm"]:

            raise serializers.ValidationError(
                "Passwords do not match."
            )

        return data

    def create(self, validated_data):

        phone = validated_data.pop(
            "phone",
            ""
        )

        validated_data.pop(
            "password_confirm"
        )

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        UserProfile.objects.create(
            user=user,
            phone=phone,
            role="CUSTOMER"
        )

        return user