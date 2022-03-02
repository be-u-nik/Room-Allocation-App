from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager
# Create your models here.

class User(AbstractUser):
    username = None
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    rollNumber = models.CharField(max_length=20,unique=True)
    phoneNumber = models.CharField(max_length=20)
    isAlloted = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []