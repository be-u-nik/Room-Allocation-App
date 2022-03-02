from room_status.models import Room_status
from rest_framework import viewsets,permissions,generics
from .serializers import Room_StatusSerializer

#Room_Status Viewset
class Room_StatusViewSet(viewsets.ModelViewSet):
    queryset = Room_status.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = Room_StatusSerializer

class UpdateRoomStatusAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = Room_status.objects.all()
    serializer_class = Room_StatusSerializer
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request,data=request.data,partial=True)
    
    def get_extra_actions(cls):
        return []