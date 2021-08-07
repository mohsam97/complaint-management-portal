from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)


class Test(models.Model):
    is_admin = models.BooleanField(default=False)
