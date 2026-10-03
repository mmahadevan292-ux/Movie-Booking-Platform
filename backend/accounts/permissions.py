from rest_framework.permissions import BasePermission


class IsAdminUserRole(BasePermission):

    message = "Admin access required."

    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_staff:
            return True

        try:
            return request.user.profile.role == "ADMIN"
        except Exception:
            return False