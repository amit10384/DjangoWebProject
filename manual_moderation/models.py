from __future__ import unicode_literals

from django.db import models



class ImageGroup(models.Model) :
    name = models.CharField(max_length=100)

# Create your models here.
class ImageDetail(models.Model) :
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    group = models.ForeignKey(to=ImageGroup)

