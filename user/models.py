from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    The the default User model in django
    """
    is_admin = models.BooleanField(default=False)

