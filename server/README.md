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

- username: String **Required** (Must only have alphanumeric characters, underscores, and dots.)
- email: String **Required** (Must have valid email format and can be verified.)
- password: String **Required** (Must have at least 6 characters.)

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

- username | email | emailUsername: String **Required** (Only require at least one of three fields. `emailUsername` field may contain either email or username.)
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

##### Endpoint

```http
POST /todos
```

##### Header

- access_token: String **Required**

##### Body

- name: String **Required**
- description: String **Optional**
- dueDate: String | Date **Optional** (String format: YYYY-MM-DD. If ommited, the due date will be set to today.)

##### Response

###### Status 201: Todo created

###### Data:

```json
{
	"name": "What a todo",
  "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error necessitatibus quibusdam est assumenda facilis repellat repudiandae eveniet laborum hic impedit? Delectus saepe fuga dolorum accusantium expedita veniam sapiente esse provident.",
  "dueDate": "2020-01-01T00:00:00.000Z",
  "createdAt": "2019-11-23T09:39:31.874Z",
  "status": "pending"
}
```



### Get All User Todos

##### Endpoint

```http
GET /user/todos
```

##### Header

- access_token: String **Required**

##### Response

###### Status 200

###### Data:

```json
[
	{
		"_id": "5dd9007a0177c12c16b4bdfc",
    "name": "What a todo",
    "creator": {
    	"username": "dummy",
	    "email": "dummy@mail.com"
   	},
    "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error necessitatibus quibusdam est assumenda facilis repellat repudiandae eveniet laborum hic impedit? Delectus saepe fuga dolorum accusantium expedita veniam sapiente esse provident.",
    "dueDate": "2020-01-01T00:00:00.000Z",
    "updatedAt": "2019-11-23T09:48:42.390Z",
    "status": "pending"
	}
]
```



### Get One Todo

##### Endpoint

```http
GET /todos/:id
```

##### Header

- access_token: String **Required**

##### Param

- id: String **Required** (Todo id to identify which todo to get.)

##### Response

###### Status 200

###### Data:

```json
{
	"_id": "5dd9007a0177c12c16b4bdfc",
  "name": "What a todo",
  "creator": {
    "username": "dummy",
    "email": "dummy@mail.com"
  },
  "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error necessitatibus quibusdam est assumenda facilis repellat repudiandae eveniet laborum hic impedit? Delectus saepe fuga dolorum accusantium expedita veniam sapiente esse provident.",
  "dueDate": "2020-01-01T00:00:00.000Z",
  "updatedAt": "2019-11-23T09:48:42.390Z",
  "status": "pending"
}
```



### Edit Todo

##### Endpoint

```http
PUT /todos/:id
```

##### Header

- access_token: String **Required**

##### Param

- id: String **Required** (Todo id to identify which todo to edit.)

##### Body

- name: String **Optional**
- description: String **Optional**
- dueDate: String | Date **Optional**

You can edit one, two, or all of those fields, or even none of them. Anytime you access this endpoint, whether you edit any field or not, the `updatedAt` field will always be updated.

##### Response

###### Status 200: Todo updated

###### Data:

```json
{
	"_id": "5dd9007a0177c12c16b4bdfc",
  "name": "Updated todo",
  "creator": {
    "username": "dummy",
    "email": "dummy@mail.com"
  },
  "description": "Shorter lorem",
  "dueDate": "2019-12-31T00:00:00.000Z",
  "updatedAt": "2019-11-23T10:44:08.186Z",
  "status": "pending"
}
```



### Mark Done/Undone

This endpoint is specifically used to mark a todo as `done`  or, for todo that's already marked `done`, unmark it and return it's status to `pending`.

##### Endpoint

```http
PATCH /todos/:id
```

##### Header

- access_token: String **Required**

##### Param

- id: String **Required** (Todo id to identify which todo to mark.)

##### Response

###### Status 200: Todo status changed to `done` | `pending`

###### Data:

```json
{
	"_id": "5dd9007a0177c12c16b4bdfc",
  "name": "Updated todo",
  "creator": "5dd8f273ae0703235897999d",
  "description": "Shorter lorem",
  "dueDate": "2019-12-31T00:00:00.000Z",
  "updatedAt": "2019-11-23T10:57:59.460Z",
  "status": "done"
}
```



### Delete Todo

##### Endpoint

```http
DELETE /todos/:id
```

##### Header

- access_token: String **Required**

##### Param

- id: String **Required** (Todo id to identify which todo to delete.)

##### Response

###### Status 200: Todo deleted



### Create Group

### Invite Member

### Kick Member

