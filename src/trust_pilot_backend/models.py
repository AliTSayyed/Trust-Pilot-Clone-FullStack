from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# create models
class Freelancers(models.Model):
  freelancer_name = models.CharField(max_length=120, unique=True, default='')

class Users(models.Model):
   user_name = models.CharField(max_length=70, unique=True, default='')
 

class Reviews(models.Model):
  user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='reviews')
  rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
  review_text = models.TextField(blank=False, null=False)
  date = models.DateTimeField(auto_now_add=True)
  freelancer = models.ForeignKey(Freelancers, on_delete=models.CASCADE, related_name='reviews')


