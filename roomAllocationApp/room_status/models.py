from django.db import models

# Create your models here.
class Room_status(models.Model):
    room_number = models.IntegerField(unique=True)
    roll_number = models.CharField(max_length=20,null=True,blank=True,default=0)