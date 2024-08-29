# LancerRank
A trust pilot clone site for freelancer reviews.

This full stack project was created using Django for the backend with its sqlite database and Angular for the frontend. 

## Features
- Displays all reviews on homepage (includes a filter and a paginator)
- Has a page for submitting reveiws. 
- Each user and freelancer is unique no two people can have the same name. 
- Clicking on a frelancer name will display their profile with their average score, how many of each rating they got, and all their reviews. 
- Clicking on a user's name will display all the reveiws a user has posted on the site.


Project details can be found in the Project-Notes.txt file (includes more installation details as well).

## Installation
First clone the git repository and make sure you have python installed. 

(run python --version to know what version you have installed, this project was made using  python 3.12)

To start the project you need to create a virtual environment in the main folder. 

```bash
  virtualenv .
  .\Scripts\activate (windows) 

  python3 -m venv .
  source ./bin/activate (mac)
```

Next next install django and related dependencies for this project. 

```bash
 pip install django
 pip install djangorestframework
 pip install django-cors-headers

 (if using python3 run)
 pip3 install django
 pip3 install djangorestframework
 pip3 install django-cors-headers
```

Move into the src folder in the (your-main-folder)\src and then run the server. 

You can only run python manage.py commands in the src since it contains the manage.py file. 

```bash
 cd src
 python manage.py runserver   
```

Next, start up the front end site and have the latest version of node installed. 

(run node -v and npm -v to see if you installed it correctly from the web)

To install angular run 

```bash
 npm install -g @angular/cli  
```

Go to the site-frontend directory and then start the server. Run ng serve to start the server.

```bash
 cd Frontend/site-frontend

 ng serve 
```

Now both servers should be running and communicating with eachother and the project can be viewed using your computer to host the site and backend. 


Below are the APIs used in this project. 


## API Reference

#### Get all reviews

```http
  GET api/reviews/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `review object` | Returns all the reviews from the db with pagination paramaters |

```http
  POST api/reviews/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `review object` | Posts a reveiw object but takes usernames and freelancer names instead of their id |


#### Get one review 

```http
  GET api/reviews/<int:id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `review object` | returns a specific review from the db |

#### Get all freelancers 

```http
  GET api/freelancers/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `freelancer object` | Returns all the freelancers from the db |


```http
  GET api/freelancers/<int:id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `freelancer object` | returns a specific freelancer from the db |


```http
  GET api/users/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `user object` | Returns all the user from the db |


```http
  GET api/users/<int:id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `user object` | returns a specific user from the db |


```http
  GET api/reviews/freelancers/<int:id>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `review object` | Returns all the reviews of a specfic freelancer from the db |



```http
  GET api/reviews/users/<int:id>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `review object` | Returns all the reviews of a specfic user from the db |


```http
  GET api/sort_and_filter_reviews/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | `review object` | Returns all the filtered reviews from the db with pagination paramaters |

