from asyncio.windows_events import NULL
from django.db import models

class Employee(models.Model):
    full_name=models.CharField(max_length=100,default="")
    employee_code = models.CharField(max_length=3,default="")
    mobilenum = models.CharField(max_length=15,default="")

