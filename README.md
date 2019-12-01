# TODOISM

### Utilizing the single page application architecture, Todoism helps you manage your tasks in a seamless manner.
#### Features:
- Create, delete, show todo items; 
- Mark an item as completed;
- Set items' importance to help you manage your daily priorities; and
- Create projects where users can collaborate with each other.

- - -

## A. Getting Started

You can start using this API by connecting to: http://localhost:3000

As for the available routes and methods, please check down below.

- - -

## B. User routes

- - -

| Routes         | HTTP | Headers | Body                                          | Description                                                        |
|----------------|------|---------|-----------------------------------------------|--------------------------------------------------------------------|
| /users/register | POST | none    | name: string, email: string, password: string | Set up a new account |
| /users/login    | POST | none    | email: string, password: string               | Sign in with an existing account                    |
| /users/google-sign-in    | POST | none    | email: string, password: string               | Sign in with Google account                    |
| /users | GET | access_token: string    | none               | Fetch currently logged in user's data                    |
| /users/notifs | GET | access_token: string    | none               | Fetch data of currently logged in user's notifications                    |
| /users/accept-project-invitation/:projectId | GET | access_token: string    | none               | Accept a project's invitation                    |
| /users/decline-project-invitation/:projectId | GET | access_token: string    | none               | Decline a project's invitation                    |

## 1. Register

### POST /users/register

> ### Body
 - name: string
 - email: string
 - password: string

```js

Successfully registered (201):

{
    "user": {
        "_id": "5ddbac518fc83f09c2f58713",
        "name": "mitski",
        "email": "mitski@mail.com",
        "password": "$2a$10$/2KPzJvM0NTzwl.hGd6Co.Hyghs6OAQ36OZbs10TJ92HUqkHmoAQ6",
        "createdAt": "2019-11-25T10:26:25.287Z",
        "updatedAt": "2019-11-25T10:26:25.287Z",
        "__v": 0
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoibWl0c2tpQG1haWwuY29tIiwiaWF0IjoxNTc0Njc3NTg1fQ.Y95cZlzfr3JLkSYAgzKyMK_ssqH1YN-8-ZP2MCC48Q4"
}

Bad request (400):

{
    "messages": [
        "mitski is not a valid email address!"
    ]
}

OR

{
    "messages": [
        "Email address has already been used"
    ]
}

```

## 2. Log in

### POST /users/login

> ### Body

- email: string
- password: string

```js

Successful log in (200):

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoib2xzb25AbWFpbC5jb20iLCJpYXQiOjE1NzI3OTg4NjN9.ACaLmTV9z_Z4MKsMTs8IFsuZzls7oQpcjAius8gXNqI"
}

Bad request (400):

{
    "messages": [
        "Wrong email/password!"
    ]
}

```

## 3. Google Sign In

### POST /users/google-sign-in

> ### Body

- email: string
- password: string

```js

Successful sign in (200):

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoib2xzb25AbWFpbC5jb20iLCJpYXQiOjE1NzI3OTg4NjN9.ACaLmTV9z_Z4MKsMTs8IFsuZzls7oQpcjAius8gXNqI"
}

```

## 4. Fetch currently logged in user's data

### GET /users

> ### Body

- None

> ### Headers

- access_token: string

```js

Success (200):

{
    "notifications": [],
    "_id": "5ddddacd162b6c2e8de6b08d",
    "name": "mason",
    "email": "mason@mail.com",
    "password": "$2a$10$MHyg6C4mNfai379U6C003uV/slOh4kevKsifTg/BgoansBFXOnLmu",
    "createdAt": "2019-11-27T02:09:17.027Z",
    "updatedAt": "2019-12-01T13:32:50.998Z",
    "__v": 0
}

Unauthorized (401):

{
    "messages": [
        "Unauthorized access! Please sign in first."
    ]
}

```

## 5. Fetch notifications of currently logged in user

### GET /users/notifs

> ### Body

- None

> ### Headers

- access_token: string

```js

Success (200):

[
    {
        "name": "ProjectInvitation",
        "message": "You have been invited to a project by mitski@mail.com.",
        "projectId": "5ddde728890a0541da3bcf03",
        "accepted": true,
        "declined": false,
        "inviter": "mitski@mail.com",
        "addressed": true
    }
]

Unauthorized (401):

{
    "messages": [
        "Unauthorized access! Please sign in first."
    ]
}

```

## 6. Accept a project's invitation

### GET /users/accept-project-invitation/:projectId

> ### Body

- None

> ### Headers

- access_token: string

```js

Success (200):

{
    "message": "Accepted project invitation!",
    "acceptingUser": {
        "notifications": [{...}],
        "_id": "5ddbb40eb7d537110d870267",
        "name": "risan",
        "email": "risan@mail.com",
        "password": "$2a$10$o8Xo5pvQ0Gx1BmaMovSYZegfaJsRtAjpwqohVsyn/v3Hm/O8oCt2W",
        "createdAt": "2019-11-25T10:59:26.070Z",
        "updatedAt": "2019-12-01T19:40:22.765Z",
        "__v": 0
    },
    "project": {...}
}

Forbidden (403):

{
    "messages": [
        "Notification has already been addressed!"
    ]
}

```

## 7. Decline a project's invitation

### GET /users/decline-project-invitation/:projectId

> ### Body

- None

> ### Headers

- access_token: string

```js

Success (200):

{
    "message": "Declined project invitation!",
    "user": {
        "notifications": [],
        "_id": "5ddbb40eb7d537110d870267",
        "name": "risan",
        "email": "risan@mail.com",
        "password": "$2a$10$o8Xo5pvQ0Gx1BmaMovSYZegfaJsRtAjpwqohVsyn/v3Hm/O8oCt2W",
        "createdAt": "2019-11-25T10:59:26.070Z",
        "updatedAt": "2019-12-01T19:44:29.072Z",
        "__v": 0
    }
}

Forbidden (403):

{
    "messages": [
        "Notification has already been addressed!"
    ]
}

```

- - -
## C. Todo Routes
- - -

| Routes         | HTTP | Headers | Body                                          | Description                                                        |
|----------------|------|---------|-----------------------------------------------|--------------------------------------------------------------------|
| /todos | GET | access_token    | none | Get all the user's todo items |
| /todos/:projectId? | POST | access_token    | title: string, description: string, dueDate: date, completed: boolean, important: boolean | Add a new todo item |
| /todos/:id | GET | access_token    | none | Get a todo item by id |
| /todos/:id | DELETE | access_token    | none | Delete a todo item by id |
| /todos/:id | PUT | access_token    | [title: string, [description: string, [dueDate: date, [completed: boolean, [important: boolean] | Update a todo item's properties |
| /todos/:id | PATCH | access_token    | completed: boolean | Change a todo item's completed status |
| /todos/:id/important | PATCH | access_token    | important: boolean | Change a todo item's important status |      

- - -
## 1. Show all todo items

### GET /todos

> ### Headers

- access_token: string

> ### Body

None

```js

Success (200):

[
  {
      "_id": "5dbf044d3a90a37243ac8389",
      "title": "Finish assignment",
      "description": "Fancy Todo",
      "dueDate": "2019-12-04T00:00:00.000Z",
      "completed": false,
      "userId": "5dbeff1ef1cb6367533adad7",
      "important": false,
      "createdAt": "2019-12-03T16:46:05.321Z",
      "updatedAt": "2019-12-03T16:46:05.321Z",
      "__v": 0
  },
  {...},
  {...}
]

Unauthorized (401):

{
    "messages": [
        "Unauthorized access!"
    ]
}

```

## 2. Add a todo item

### POST /todos

> ### Headers

- access_token: string

> ### Body

- title: string
- description: string
- dueDate: string

```js
Successfully added a todo item (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 3. Find a todo item by id

### GET /todos/:id

> ### Headers

- access_token: string

```js

Success (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 4. Delete a todo item by id

### DELETE /todos/:id

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before deleted

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 5. Update a todo item by id

### PUT /todos/:id

> ### Headers

- access_token: string

> ### Body

- [title: string]
- [description: string]
- [dueDate: date]
- [completed: boolean]
- [important: boolean]

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 6. Update a todo item's completed status by id

### PATCH /todos/:id

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 7. Update a todo item's important status by id

### PATCH /todos/:id/important

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

  {
    "_id": "5dbf05db3a90a37243ac838b",
    "title": "Finish assignment",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:52:43.842Z",
    "updatedAt": "2019-12-03T17:07:12.784Z",
    "__v": 0,
    "description": "Todoism"
  }

Bad Request (400):

{
    "messages": [
        "Cannot read property 'important' of null"
    ]
}

```

- - -
## D. Project Routes
- - -

| Routes         | HTTP | Headers | Body                                          | Description                                                        |
|----------------|------|---------|-----------------------------------------------|--------------------------------------------------------------------|
| /projects | POST | none    | name: string | Create a new project |
| /projects/user | GET | none    | none | Fetch projects by user id |
| /projects/:id | GET | none    | none | Fetch a project by id |
| /projects/:id | DELETE | none    | access_token: string | Delete a project |
| /projects/:id | PUT | none    | access_token: string | Update project's name  |
| /projects/:id/invite-member | POST | none    | access_token: string | Invite a collaborator to the project  |
| /projects/:id/remove/:memberId | POST | none    | access_token: string | Remove a project member  |

- - -
## 1. Create a new project

### POST /projects

> ### Headers

- access_token: string

> ### Body

None

```js

Success (200):

[
  {
      "_id": "5dbf044d3a90a37243ac8389",
      "title": "Finish assignment",
      "description": "Fancy Todo",
      "dueDate": "2019-12-04T00:00:00.000Z",
      "completed": false,
      "userId": "5dbeff1ef1cb6367533adad7",
      "important": false,
      "createdAt": "2019-12-03T16:46:05.321Z",
      "updatedAt": "2019-12-03T16:46:05.321Z",
      "__v": 0
  },
  {...},
  {...}
]

Unauthorized (401):

{
    "messages": [
        "Unauthorized access!"
    ]
}

```

## 2. Fetch projects by user id

### GET /projects/user

> ### Headers

- access_token: string

> ### Body

- title: string
- description: string
- dueDate: string

```js
Successfully added a todo item (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 3. Fetch a project by id

### GET /projects/:id

> ### Headers

- access_token: string

```js

Success (200):

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 4. Delete a project by id

### DELETE /projects/:id

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before deleted

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 5. Update project's name

### PUT /projects/:id

> ### Headers

- access_token: string

> ### Body

- [title: string]
- [description: string]
- [dueDate: date]
- [completed: boolean]
- [important: boolean]

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 6. Invite a collaborator to the project

### POST /projects/:id/invite-member

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

{
    "_id": "5dbf055c3a90a37243ac838a",
    "title": "Finish assignment",
    "description": "Fancy Todo",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:50:36.602Z",
    "updatedAt": "2019-12-03T16:50:36.602Z",
    "__v": 0
}
```

## 7. Remove a project member

### POST /projects/:id/remove/:memberId

> ### Headers

- access_token: string

```js

Success (200): //Note: the response is the item being found before updated

  {
    "_id": "5dbf05db3a90a37243ac838b",
    "title": "Finish assignment",
    "dueDate": "2019-12-04T00:00:00.000Z",
    "completed": false,
    "userId": "5dbeff1ef1cb6367533adad7",
    "important": false,
    "createdAt": "2019-12-03T16:52:43.842Z",
    "updatedAt": "2019-12-03T17:07:12.784Z",
    "__v": 0,
    "description": "Todoism"
  }

Bad Request (400):

{
    "messages": [
        "Cannot read property 'important' of null"
    ]
}

```