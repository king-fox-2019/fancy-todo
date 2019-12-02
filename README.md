# fancy-todo

# ***next!***


Hi! This is a fancy to do web app. Let's get organized!

# **Error**

- **code**  : 400
- **name** : Bad Request
	- **error response :**

```
{
  "message": "Email is already used"
}

{
  "message": "This user is already a member"
}

```

- **code**  : 401
- **name** : unauthorized

	- **error response :**

```
{
  "message": "your session is expired"
}
```

- **code**  : 403
- **name** : forbidden

	- **error response :**

```
{
  "message": "You are not authorized to perform this task"
}
```

- **code**  : 404
- **name** : Not Found

	- **error response :**

```
{
  "message": "User not found"
}

{
  "message": "Todo not found"
}

{
  "message": "Project not found"
}
```


- **code**  : 500
- **name** : Internal Server Error

	- **error response :**

```
{
  "message": "Internal Server Error"
}

{
  "message": "Connection error due to server down"
}
```

# **User**

> REGISTER

- **URL**
`http://localhost:3000/user/register`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string            |user's email            |
|`password`          |string           |user's password          |



- **Success Response :**
	- **code**  : 201
	- **content example :**

```
 {
    "_id": "5dbd527e90191c715d019075",
    "email": "nath@mail.com",
    "password": "$2a$10$H0L2B1BYVXzyqwrqURr4y.QoCViLpQqlmUkvxTH1NplyINw.8wcOq"
}
```


> LOGIN

- **URL**
`http://localhost:3000/user/login`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`email`|string            |user's email            |
|`password`          |string           |user's password          |



- **Success Response :**
	- **code**  : 200
	- **content example :**

```
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ1MjdlOTAxOTFjNzE1ZDAxOTA3NSIsImVtYWlsIjoibmF0aEBtYWlsLmNvbSIsImlhdCI6MTU3MjY4ODU0NX0.7CbmkHpAyjKYKP_7wg5OO2U8L7ut8MvyUj6-NOTJH2Y"
}

```



# **Todo**



> Find All Todos per User by Id

- **URL**
`http://localhost:3000/todo
- **Method**
`GET`
- **Data Params :** none

- **Success Response :**
	- **code**  : 200
	- **content example :**

```
 {
    "todos": [
        {
            "Status": false,
            "_id": "5dbd538c3345af722fc6f8bf",
            "title": "call a prince",
            "description": "ask the price to bring you some snacks!",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-11-02T17:00:00.000Z"
        },
        {
            "Status": false,
            "_id": "5dbd54b33345af722fc6f8c1",
            "title": "fitting the dress",
            "description": "make sure the waist section is looking good",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-10-02T17:00:00.000Z"
        },
        {
            "Status": false,
            "_id": "5dbd5d07d53cb77d1c446a19",
            "title": "buy sheet mask at watson",
            "description": "colagen mask 10pcs, brightening mask 11pcs",
            "userId": "5dbd527e90191c715d019075",
            "dueDate": "2019-11-14T17:00:00.000Z"
        }
    ]
}
```


> Find One Todo

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`GET`
- **Data Params :** none

- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{
    "todo": {
        "Status": false,
        "_id": "5dbd55543345af722fc6f8c2",
        "title": "attend maxwell bday party",
        "description": "9 oct 2019, Saturday 8pm, Rosovelt Street",
        "userId": "5dbd3f33e57986668543b7d1",
        "dueDate": "2019-11-07T17:00:00.000Z"
    }
}

```

> CREATE

- **URL**
`http://localhost:3000/todo`
- **Method**
`POST`
- **Data Params**
body :

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`UserId` | integer | user's id, REQUIRED




- **Success Response :**
	- **code**  : 201
	- **content example :**

```
 {
    "Status": false,
    "_id": "5dbd627c62811e05b0453fed",
    "title": "repair the plumbing",
    "description": "follow the red sign",
    "userId": "5dbd3f33e57986668543b7d1",
    "dueDate": "2020-02-29T17:00:00.000Z"
}

```

> Delete

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`DELETE`
- **Data Params :** none

- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{
    "Status": false,
    "_id": "5dbd55543345af722fc6f8c2",
    "title": "attend maxwell bday party",
    "description": "9 oct 2019, Saturday 8pm, Rosovelt Street",
    "userId": "5dbd3f33e57986668543b7d1",
    "dueDate": "2019-11-07T17:00:00.000Z"
}

```

> UPDATE

- **URL**
`http://localhost:3000/todo/:id`
- **Method**
`PUT`
- **Data Params**
(optional) body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`Status` | boolean | todo's done/undone status, REQUIRED




- **Success Response :**
	- **code**  : 200
	- **content example :**

```
 
{
    "todo": {
        "Status": false,
        "_id": "5dbd627c62811e05b0453fed",
        "title": "repair the plumbing",
        "description": "follow the red sign and remove the rust",
        "userId": "5dbd3f33e57986668543b7d1",
        "dueDate": "2019-12-08T17:00:00.000Z"
    }
}

```



# **Project**

> CREATE PROJECT

- **URL**
`http://localhost:3000/project`
- **Method**
`POST`
- **Data Params**
 - headers : access_token
 - body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's project's title, REQUIRED            |



- **Success Response :**
	- **code**  : 201
	- **content example :**

```
{ 
    members: [ 5de3e799f9efe123451514b6 ],
    todos: [],
    _id: 5de4327608d53e50ca2e08f0,
    title: 'Replace Cover Glass',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T21:36:54.013Z,
    updatedAt: 2019-12-01T21:36:54.025Z 
}


```



> FIND ALL PROJECT

- **URL**
`http://localhost:3000/project`
- **Method**
`GET`
- **Data Params**
 - headers : access_token


- **Success Response :**
	- **code**  : 200
	- **content example :**

```

[
    { members:
     [ 5de3e799f9efe123451514b6,
       5dddfa557341c81e883bfc89,
       5dda3f068634a2187e955ae1 ],
    todos: [ 5de3ef66f9efe123451514c2, 5de3ef89f9efe123451514c3 ],
    _id: 5de3ee3cf9efe123451514be,
    title: 'Sew a tie',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:45:48.922Z,
    updatedAt: 2019-12-01T20:53:47.973Z },
  { members:
     [ 5de3e799f9efe123451514b6,
       5dddfa557341c81e883bfc89,
       5dda3f068634a2187e955ae1 ],
    todos: [ 5de3f5c5f9efe123451514c5, 5de42695f9efe123451514c6 ],
    _id: 5de3ef18f9efe123451514c1,
    title: 'riding polar express',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:49:28.650Z,
    updatedAt: 2019-12-01T20:50:42.647Z },
  { members: [ 5de3e799f9efe123451514b6 ],
    todos: [],
    _id: 5de3ef02f9efe123451514c0,
    title: 'turn drawing to meals',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:49:06.361Z,
    updatedAt: 2019-12-01T16:49:06.366Z },
  { members: [ 5de3e799f9efe123451514b6 ],
    todos: [],
    _id: 5de3eed2f9efe123451514bf,
    title: 'Ne-Yo full interview',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:48:18.027Z,
    updatedAt: 2019-12-01T16:48:18.031Z },
  { members: [ 5de3e799f9efe123451514b6 ],
    todos: [],
    _id: 5de3ed88f9efe123451514bb,
    title: 'Kay\'s Wedding',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:42:48.813Z,
    updatedAt: 2019-12-01T16:42:48.815Z }
]



```



> FIND ONE PROJECT

- **URL**
`http://localhost:3000/project/:id`
- **Method**
`GET`
- **Data Params**
- haeders : access-token



- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{
    members:
    [ { _id: 5de3e799f9efe123451514b6,
        email: 'monica@mail.com'
      },
      { _id: 5dddfa557341c81e883bfc89,
        email: 'rachel@mail.com'
      },
      { _id: 5dda3f068634a2187e955ae1,
        email: 'nath@mail.com'
      } ],
    todos:
    [ { status: true,
        _id: 5de3f5c5f9efe123451514c5,
        title: 'ask Rudolf as a company',
        dueDate: 2019-12-02T16:59:59.000Z },
        { status: false,
        _id: 5de42695f9efe123451514c6,
        title: 'set meeting point',
        dueDate: 2019-12-02T16:59:59.000Z } ],
    _id: 5de3ef18f9efe123451514c1,
    title: 'riding polar express',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T16:49:28.650Z,
    updatedAt: 2019-12-01T20:50:42.647Z 
  
  }

```


> UPDATE PROJECT

- **URL**
`http://localhost:3000/project/:id`
- **Method**
`PATCH`
- **Data Params**
- headers : acccess-token
- (optional) body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's project's title, REQUIRED            |



- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{
   members:
   [ 5de3e799f9efe123451514b6,
     5dddfa557341c81e883bfc89,
     5dda3f068634a2187e955ae1 ],
  todos: [ 5de3f5c5f9efe123451514c5, 5de42695f9efe123451514c6 ],
  _id: 5de3ef18f9efe123451514c1,
  title: 'Polar Express',
  author: 5de3e799f9efe123451514b6,
  createdAt: 2019-12-01T16:49:28.650Z,
  updatedAt: 2019-12-02T02:59:53.648Z 
}

```


> DELETE PROJECT

- **URL**
`http://localhost:3000/project/:id`
- **Method**
`DELETE`
- **Data Params**
- header : acess_tokends


- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{

message : 'Project deleted'
}


```




> INVITE MEMBER

- **URL**
`http://localhost:3000/project/:id/invite`
- **Method**
`PATCH`
- **Data Params**
- headers : access-token

- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{ 
    members:
    [{ _id: 5de3e799f9efe123451514b6,
        email: 'monica@mail.com'
      },
      { _id: 5dddfa557341c81e883bfc89,
        email: 'rachel@mail.com'
      }],
    todos: [],
    _id: 5de4327608d53e50ca2e08f0,
    title: 'Replace Cover Glass',
    author: 5de3e799f9efe123451514b6,
    createdAt: 2019-12-01T21:36:54.013Z,
    updatedAt: 2019-12-01T22:16:34.953Z 
  
} 
```



> DISMISS MEMBER / LEAVE PROJECT

- **URL**
`http://localhost:3000/project/:id/dismiss/:userId`
- **Method**
`PUT`
- **Data Params**
(optional)
- headers : access-token



- **Success Response :**
	- **code**  : 200
	- **content example :**

```
message : ' you are kicked out

```




> ADD PROJECT TODO

- **URL**
`http://localhost:3000/project/:id/todos`
- **Method**
`PATCH`
- **Data Params**
- headers : access_token
- body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`Status` | boolean | todo's done/undone status, REQUIRED




- **Success Response :**
	- **code**  : 201
	- **content example :**

```
{ 
    members:
   [ { _id: 5de3e799f9efe123451514b6,
       email: 'monica@mail.com'},
     { _id: 5dddfa557341c81e883bfc89,
       email: 'rachel@mail.com'}],
  todos:
   [ { status: false,
       _id: 5de43c506c53d35d12c0b1c1,
       title: 'buy a cleaning liquid',
       dueDate: 2019-12-02T16:59:59.000Z },
     { status: false,
       _id: 5de43c786c53d35d12c0b1c2,
       title: 'prepare a set of glass replacement kit',
       dueDate: 2019-12-02T16:59:59.000Z } ],
  _id: 5de4327608d53e50ca2e08f0,
  title: 'Replace Cover Glass',
  author: 5de3e799f9efe123451514b6,
  createdAt: 2019-12-01T21:36:54.013Z,
  updatedAt: 2019-12-01T22:19:36.763Z 
  
}

```




> UPDATE PROJECT TODO

- **URL**
`http://localhost:3000/project/:id/todos/:todoId`
- **Method**
`PATCH`
- **Data Params**
(optional) body : 

|    property            |type                          |description                         |
|----------------|-------------------------------|-----------------------------|
|`title`|string            |user's todo's title, REQUIRED            |
|`description`          |string           |user's todo's description, REQUIRED        |
|`dueDate`| date| user's todo's due date, REQUIRED |
|`Status` | boolean | todo's done/undone status, REQUIRED




- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{ members:
   [ { _id: 5de3e799f9efe123451514b6,
       email: 'monica@mail.com'
     },
     { _id: 5dddfa557341c81e883bfc89,
       email: 'rachel@mail.com'
      } ],
  todos:
   [ { status: false,
       _id: 5de43c506c53d35d12c0b1c1,
       title: 'buy a cleaning liquid',
       dueDate: 2019-12-02T16:59:59.000Z,
       description: 'any detergent can do' },
     { status: false,
       _id: 5de43c786c53d35d12c0b1c2,
       title: 'prepare a set of glass replacement kit',
       dueDate: 2019-12-02T16:59:59.000Z } ],
  _id: 5de4327608d53e50ca2e08f0,
  title: 'Replace Cover Glass',
  author: 5de3e799f9efe123451514b6,
  createdAt: 2019-12-01T21:36:54.013Z,
  updatedAt: 2019-12-01T22:19:36.763Z 
}

```




> DELETE PROJECT TODO

- **URL**
`http://localhost:3000/project/:id/todos/:todoId`
- **Method**
`DELETE`
- **Data Params**
- headers : access-token


- **Success Response :**
	- **code**  : 200
	- **content example :**

```
{
    {
        "todo": {
        "Status": false,
        "_id": "5dbd627c62811e05b0453fed",
        "title": "repair the plumbing",
        "description": "follow the red sign and remove the rust",
        "userId": "5dbd3f33e57986668543b7d1",
        "dueDate": "2019-12-08T17:00:00.000Z"
        
    }
}

```