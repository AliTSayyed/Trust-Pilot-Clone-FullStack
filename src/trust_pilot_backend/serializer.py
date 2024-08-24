from rest_framework import serializers
from .models import Reviews, Freelancers, Users

# create serializer of the models

class ReviewsSearializer(serializers.ModelSerializer):
 # These fields will accept user_name and freelancer_name in the POST request
  user_name = serializers.CharField(write_only=True)
  freelancer_name = serializers.CharField(write_only=True)
  user = serializers.PrimaryKeyRelatedField(read_only=True)
  freelancer = serializers.PrimaryKeyRelatedField(read_only=True)

  class Meta:
    model = Reviews
    fields = ['id', 'user', 'freelancer', 'rating', 'review_text', 'date', 'user_name', 'freelancer_name']
  # Must override the Post data to exclude the user and freelancer fields but obtain the id's of those users from the user's and freelancer's table
  def validate(self, attrs):
    user_name = attrs.get("user_name")
    freelancer_name = attrs.get("freelancer_name")
    if not user_name or not freelancer_name:
        raise serializers.ValidationError("user_name and freelancer_name are required fields.")
    
    user, created = Users.objects.get_or_create(user_name=user_name) # create or get a user from the User's table by finding a mathcing name or making a new user. 
    freelancer, created = Freelancers.objects.get_or_create(freelancer_name=freelancer_name)
    attrs['user'] = user
    attrs['freelancer'] = freelancer
    return super().validate(attrs) #update the post data to now include a user's field with a number and a freelancer field with a number. 
  
  # After modifying the post data, return the correct fields to the serializer. Now usernames and freelancer names have been corretly converted to their respective ids. Ensures unique users and freelancers. 
  def create(self, validated_data):
    validated_data.pop("user_name", None)
    validated_data.pop("freelancer_name", None)

    return Reviews.objects.create(**validated_data)
  
class FreelancersSearializer(serializers.ModelSerializer):
  class Meta:
    model = Freelancers
    fields = ['id', 'freelancer_name']

class UsersSearializer(serializers.ModelSerializer):
  class Meta:
    model = Users
    fields = ['id', 'user_name']
 
