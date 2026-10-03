from django.urls import path

from .views import (
    DemoPaymentView,
    PaymentDetailView,
    AdminPaymentListView,
)


urlpatterns = [

    path(
        "demo/",
        DemoPaymentView.as_view(),
        name="demo-payment"
    ),

    path(
        "admin/all/",
        AdminPaymentListView.as_view(),
        name="admin-payments"
    ),

    path(
        "<str:transaction_id>/",
        PaymentDetailView.as_view(),
        name="payment-detail"
    ),
]