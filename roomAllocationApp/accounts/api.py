from rest_framework import generics,permissions
from rest_framework.response import Response
from knox.models import AuthToken

from .models import User
from .serializers import UpdateUserSerializer, UserSerializer,RegisterSerializer,LoginSerializer
# from rest_framework.mixins import UpdateModelMixin

#RegisterAPI
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user =  serializer.save()
        return Response({
            "user" : UserSerializer(user,context = self.get_serializer_context()).data,
            "token" : AuthToken.objects.create(user)[1]
        })



#LoginAPI
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user =  serializer.validated_data
        return Response({
            "user" : UserSerializer(user,context = self.get_serializer_context()).data,
            "token" : AuthToken.objects.create(user)[1]
        })


#GetUserAPI
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UpdateUserAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    lookup_field = 'rollNumber'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request,data=request.data,partial=True)