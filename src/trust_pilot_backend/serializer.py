from rest_framework import serializers
from .models import Reviews, Freelancers, Users

# create serializer of the model
class ReviewsSearializer(serializers.ModelSerializer):
  class Meta:
    model = Reviews
    fields = ['id', 'user', 'rating', 'review_text', 'date', 'freelancer']

class FreelancersSearializer(serializers.ModelSerializer):
  class Meta:
    model = Freelancers
    fields = ['id', 'freelancer_name']

class UsersSearializer(serializers.ModelSerializer):
  class Meta:
    model = Users
    fields = ['id', 'user_name']