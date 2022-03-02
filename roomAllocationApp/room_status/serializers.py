from dataclasses import field
from rest_framework import serializers
from .models import Room_status

class Room_StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_status
        fields = '__all__'


class UpdateRoomStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_status
        fields = ('id','roll_number')