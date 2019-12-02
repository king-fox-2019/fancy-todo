# fancy-todo

Getting things done more easily like never before

## Base URL

```http
http://localhost:PORT
```

## User Routes

------------------------------------

### Signin

Signin yourself in order to obtain the `access token`

### Endpoint

```http
POST /api/user/signin
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 201: Created

#### Error

##### Status 401: Email is not registered

##### Status 401: Invalid password

##### Status 500: Internal Server Error

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```


------------------------------------

### Google Login

Login more easily through your Google account

### Endpoint

```http
POST /signin/google
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 200: Created

#### Error

##### Status 401: Invalid email

##### Status 500: Internal Server Error

#### Response example (success)
```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```

------------------------------------

### Sign Up

Get yourself registered and privilege to access endpoints

### Endpoint

```http
POST /api/user/signup
```
#### Body
- username: String
- email: String
- password: String

#### Response

#### Success

##### Status 201: Successfully created

#### Error

##### Status 500: Internal Server Error

#### Response example
```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
------------------------------------

### Show All Todos

See all your recorded todos here

### Endpoint

```http
GET /api/todo
```
#### Header

access_token: String ***Required***

#### Response

##### Status 200: OK

#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

#### Response example (success)
```json
[
  {
    "_id": "eyJhbGcixiJIU...",
    "name": "refactor code",
    "description": "do it now",
    "status": "Queued",
    "due_date": "2019-12-12",
    "user_id": "dediUser"
  },
  {
    "_id": "aXdmnbanYIU...",
    "name": "cook soup",
    "description": "for lunch with fams",
    "status": "Done",
    "due_date": "2019-11-12",
    "user_id": "user6123"
  },
  ..

]
```

------------------------------------

### Show One

See more details of your todo

### Endpoint

```http
GET /api/todo/:todoId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200: OK

#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

#### Response example (success)
```json
{
    "_id": "eyJhbGcixiJIU...",
    "name": "refactor code",
    "description": "do it now",
    "status": "queued",
    "due_date": "2019-12-12",
    "user_id": "dediUser",
}
```

------------------------------------

### Edit Todo

Edit your todo

### Endpoint

```http
PATCH /api/todo/:todoId
```
#### Header

access_token: String ***Required***

#### Body

- name: String (optional)
- description: String (optional)
- due_date: String (optional)

#### Response

#### Success

##### Status 200: Updated

#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

#### Response example (success)
```json
{
    "message": "Updated"
}
```

------------------------------------

### Delete Todo

Delete your todo

### Endpoint

```http
DELETE /api/todo/:todoId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200: Deleted

#### Error

##### Error 401: Invalid access token

##### Status 500: Internal Server Error

#### Response example (success)
```json
{
    "message": "Deleted"
}
```



