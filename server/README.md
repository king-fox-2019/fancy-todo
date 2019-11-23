# FANCY DOODOO

A simple todo app API with capabilities to organize teams and realtime todo update. Use express js, mongoose, socket.io



## Base Url

If you are using this API from local then use:

```http
http://localhost:3000/
```



## Routes

### Sign Up

Register yourself to database, so you have access to all other endpoints.

##### Endpoint

```http
POST /user/signup
```

##### Body

- username: String **Required** (Must only have alphanumeric characters, underscores, and dots)
- email: String **Required** (Must have valid email format and can be verified)
- password: String **Required** (Must have at least 6 characters)

##### Response

###### Status 201: User registered

###### Data:

```json
{
  "username": "dummy",
  "email": "dummy@mail.com",
  "password": "123456"
}
```



### Sign In

Get your `access_token` to be used in other endpoints.

##### Endpoint

```http
POST /signin
```

##### Body

- username | email | emailUsername: String **Required** (Only require at least one of three fields. `emailUsername` field may contain either email or username)
- password: String **Required**

##### Response

###### Status 200: Sign in success

###### Data:

```json
{
	"access_token": "very_long_access_token"
}
```



### Check Session

This endpoint serves as client `access_token` validation, and exposes token owner.

##### Endpoint

```http
GET /checksession
```

##### Header

- access_token: String **Required**

##### Response

###### Status 200: Token valid

###### Data:

```json
{
	"id": "5dd8f273ae0703235897999d",
  "username": "dummy",
  "email": "dummy@mail.com",
  "iat": 1574499522
}
```



### Create Todo



### Get All Todos

### Get One Todo

### Edit Todo

### Delete Todo

### Create Group

### Invite Member

### Kick Member

