# LancerRank

A trust pilot clone site for freelancer reviews.

This full stack project was created using django for the backend with its sqlite database and angular for the front end. 

Project details can be found in the project-Notes.txt file.

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

