from django.urls import path, include
from rest_framework import routers
from .api import Room_StatusViewSet,UpdateRoomStatusAPI

router = routers.DefaultRouter()
router.register('rooms',Room_StatusViewSet,'rooms')
urlpatterns =[
    path('api/',include(router.urls)),
    path('api/allocate/<str:id>/',UpdateRoomStatusAPI.as_view(),name='allocate')
] 