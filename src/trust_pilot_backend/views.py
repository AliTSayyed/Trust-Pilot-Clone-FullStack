from datetime import datetime
from .models import Reviews, Freelancers, Users
from .serializer import ReviewsSearializer, FreelancersSearializer, UsersSearializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# create views for CRUD operations and logic for backend

@api_view(['GET', 'POST']) # retrieve all the reviews and post a review 
def review_list(request): 
  if request.method == 'GET':
    page = request.query_params.get('page', 1)
    per_page = request.query_params.get('perPage', 10)

    reviews = Reviews.objects.all()

    paginator = Paginator(reviews, per_page)

    try:
        reviews_page = paginator.page(page)
    except PageNotAnInteger:
        reviews_page = paginator.page(1)
    except EmptyPage:
        reviews_page = paginator.page(paginator.num_pages)

    # Serialize the reviews on the current page
    serializer = ReviewsSearializer(reviews_page, many=True)

    # Return the paginated response
    return Response({
        'reviews': serializer.data,
        'total': paginator.count,
        'page': reviews_page.number,
        'perPage': per_page,
        'totalPages': paginator.num_pages,
    }, status=status.HTTP_200_OK)

  elif request.method == 'POST':
    serializer = ReviewsSearializer(data=request.data) # take the request data, and pass it into the serailzer
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST) # error if incorrect data sent 
    
@api_view(['GET', 'PUT', 'DELETE']) # retrieve 1 review, update it, and delete it 
def review_details(request, id):
  try:
    review = Reviews.objects.get(pk=id) # find the correct review if it exists
  except Reviews.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = ReviewsSearializer(review) # serialize that review
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = ReviewsSearializer(review, data=request.data)
    if serializer.is_valid():
      serializer.save() # save the updated review if it is in a valid format
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    else:
       return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST) # error if incorrect data sent 
  elif request.method == 'DELETE':
    review.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST']) # get all the freelancers and create freelancers
def freelancer_list(request):
  if request.method == 'GET':
    freelancers = Freelancers.objects.all()
    serializer = FreelancersSearializer(freelancers, many=True)
    return Response(serializer.data)
  if request.method == 'POST':
    serializer = FreelancersSearializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE']) # get, update, and delete a specific freelancer
def freelancer_details(request, id):
  try:
    freelancer = Freelancers.objects.get(pk=id)
  except Freelancers.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = FreelancersSearializer(freelancer)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = FreelancersSearializer(freelancer, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status= status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    freelancer.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)
  
@api_view(['GET', 'POST']) # get and create a user
def user_list(request):
  if request.method == 'GET':
    users = Users.objects.all()
    serializer = UsersSearializer(users, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = UsersSearializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE']) # get, update and delete a specific user
def user_details(request, id):
  try:
    user = Users.objects.get(pk=id)
  except Users.DoesNotExist:
    return Response(status=status.HTTP_400_BAD_REQUEST)
  if request.method == 'GET':
    serializer = UsersSearializer(user)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = UsersSearializer(user, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET']) # get all the reviews for a specific freelancer 
def freelancer_reviews(request, id):
  try: # check if freelancer exists
    freelancer = Freelancers.objects.get(pk=id) 
  except Freelancers.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  reviews_of_freelancer = Reviews.objects.filter(freelancer=id)
  serializer = ReviewsSearializer(reviews_of_freelancer, many=True)
  return Response(serializer.data)

@api_view(['GET']) # end point for sorting and filtering reviews
def sort_and_filter_reviews(request):
  if request.method == 'GET':
    reviews = Reviews.objects.all()

    # Apply query paramters
    rating_param = request.GET.get('rating', None)
    date_param = request.GET.get('date', None)
    freelancer_id_param = request.GET.get('freelancer', None)

    # if the query paramater exists, filter by the query paramater
    if rating_param:
      reviews = Reviews.objects.filter(rating=rating_param)
    
    if date_param: # if a date is sent in the url, need to parse it so that it can be compared with the reviews table data field. 
            try:
              # Parse the date from the query param
              parsed_date = datetime.strptime(date_param, '%Y-%m-%d').date()  # Parse 'YYYY-MM-DD' format
              reviews = reviews.filter(date__date=parsed_date)  # Filter by date (ignoring time)
            except ValueError:
                return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

    if freelancer_id_param:
      reviews = Reviews.objects.filter(freelancer=freelancer_id_param)

    # send the filtered reviews 
    serializer = ReviewsSearializer(reviews, many=True)
    return Response(serializer.data)