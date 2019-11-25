# FANCY DOODOO

A simple todo app API with capabilities to organize groups and realtime todo update. Use express js, mongoose, and socket.io.



## Base Url

If you are using this API from source code then use:

```http
http://localhost:PORT
```



## Errors

This section is used to document error responses, cause, and possible ways to resolve it.

### Status 404: Not Found

- `Invalid endpoint/not found`: This means that the url is not found. Try recheck your request endpoint.

### Status 422: Unprocessable Entity

- User validation error: This kind of error may occur during Sign Up, oftenly because invalid data value. Recheck whether or not the data you send has valid values, and also if it satisfies all constraints (uniqueness, not empty, etc.). Example error messages: `Username already taken`,  `Email required`, `Password must have at least 6 characters`
- `Username, email, or password wrong`: This error happens during Sign In. It simply indicates that the data you enter is invalid (whether it's actually wrong or some fields are missing). Please recheck the data you send.
- `Group name required`: This occurs when you try to Create Group without specifying group name. Recheck your data request.

### Status 401: Unauthorized

- `Valid acccess token required`: This happens when you try to access endpoint that require authentication. Make sure to check whether you have included your `access_token` to your request header. If so, but the error still persist, then try to get new token from Sign In endpoint.



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

###### Status 201: Created

```json
{
  "message": "User registered",
    "data": {
      "username": "dummy",
  		"email": "dummy@mail.com",
		  "password": "123456"
  }
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

###### Status 200: OK

```json
{
  "message": "Sign in success"
  "data": {
  	"access_token": "very_long_access_token"
	}
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

###### Status 200: OK

```json
{
	"message": "Token valid",
  "data": {
      "id": "5ddb85b06a8fd9fd116889e6",
      "username": "dummy",
      "email": "dummy@mail.com",
      "iat": 1574667955
  }
}
```



### Create Group

##### Endpoint

```http
POST /groups
```

##### Header

- access_token: String **Required**

##### Body

- name: String **Required**

##### Response

###### Status 201: Created

```json
{
  "message": "Group created"
  "data": {
    "_id": "5ddb89a16a8fd9fd116889eb",
    "name": "Dummy group",
    "leader": "5dd8f273ae0703235897999d",
    "members": []
  }
}
```



### Get User Groups

##### Endpoint

```http
GET /user/groups?as=[leader][members]
```

##### Header

- access_token: String **Required**

##### Query

- as: "leader" | "members" **Optional**

##### Response

###### Status 200: OK

```json
{
	"data": [
		{
			"_id": "5ddb8ddfa266870182d3182e",
      "name": "Dummy group",
      "leader": {
      "_id": "5ddb85b06a8fd9fd116889e6",
      "username": "dummy",
      "email": "dummy@mail.com"
      },
      "members": []
		}
	]
}
```



### Invite Member

##### Endpoint

```http
PUT /groups/:id/members
```

##### Header

- access_token: String **Required**

##### Params

- id: String **Required** (Group id to which you invite new member)

##### Body

- email: String **Required** (Valid email of new member where we send the invitation email)

##### Response

###### Status 200: New member invited



### Kick Member

##### Endpoint

```http
PUT /group/:id/members/:member_id
```

##### Header

- access_token: String **Required**

##### Params

- id: String **Required** (Group id in which a member will be kicked)
- member_id: String **Required** (Id of member that will be kicked)

##### Response

###### Status 200: Member kicked



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
  "_id": "5dd9007a0177c12c16b4bdfc",
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