from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    elo = models.IntegerField(default=1200)    
    rank = models.IntegerField(default=-1)

    @property
    def has_management_permission(self) -> bool:
        return self.is_staff or self.is_superuser

    @property
    def short_name(self):
        return self.username

    def __str__(self):
        return self.short_name