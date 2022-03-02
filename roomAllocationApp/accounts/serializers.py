from dataclasses import field
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

#User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','email','rollNumber','phoneNumber','isAlloted')

#Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name','last_name','email','rollNumber','phoneNumber','isAlloted','password')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(validated_data['first_name'],validated_data['last_name'],validated_data['email'],validated_data['rollNumber'],validated_data['phoneNumber'],validated_data['password'])
        return user

#Login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('rollNumber','isAlloted')