# API DOCUMENTATION - TODO's

<hr>

Simple to do web app to manage your todo-list. You can add project include meers that have an account on this app and manage your project todo-list together.

> Base url : <http://localhost:3000>



<h2>User Routes </h2>
<hr>

## Register [post]

> <http://localhost:3000/users/register>

- Request (application/json)

```
{
	"email" : "user@mail.com",
	"password" : "123456"
}
```

- Response 200 (application/json)

```
{
      "accessToken": 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
}
```

- Response 400 (application/json)

```
{
      "message": "Email is already registered"
 }
```



## Login [post]

> <http://localhost:3000/users/login>

- Request (application/json)

```
{
	"email" : "user@mail.com",
	"password" : "123456"
}
```

- Response 200 (application/json)

```
{
      "accessToken": 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
}
```

- Response 401 (application/json)

```
{
      "message": "Wrong email/password"
 }
```



<h2>Todos Routes </h2>
<hr>

## Create Todo [post]

> <http://localhost:3000/todos/>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
{
    "status": false,
    "projectId": null,
    "starred": false,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```





## Get All Personal Todo [get]

> <http://localhost:3000/todos/personal>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
[
    {
        "status": false,
        "projectId": null,
        "starred": false,
        "_id": "5de5e65c5f5bb98c96f6fc5b",
        "title": "Project Baru",
        "date": "2019-12-22T00:00:00.000Z",
        "userId": "5ddeb58c252bcb500cc01b6a",    
        "assignee": "5ddeb58c252bcb500cc01b6a",
            
    {
        "status": false,
        "projectId": null,
        "starred": false,
        "_id": "5de5e6f25f5bb98c96f6fc5e",
        "title": "Project Baru",
        "date": "2019-12-22T00:00:00.000Z",
        "userId": "5ddeb58c252bcb500cc01b6a"
        "assignee": "5ddeb58c252bcb500cc01b6a"
        "__v": 0
    }
]
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```



## Get Personal Todo by ID [get]

> <http://localhost:3000/todos/:id>

- Request (application/json)

  Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- 

```
{
	"title" : "Your New Project Edit",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
{
    "status": false,
    "projectId": null,
    "starred": false,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project Edit",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Delete Personal Todo [delete]

> <http://localhost:3000/todos/:id>

- Request (application/json)

  Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "delete todo success"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Personal Todo [put]

> <http://localhost:3000/todos/:id>

- Request (application/json)

  Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- 

```
{
	"title" : "Your New Project Edit",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
{
    "status": false,
    "projectId": null,
    "starred": false,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project Edit",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Status Personal Todo [patch]

> <http://localhost:3000/todos/:id/status>

- Request (application/json)

  > ​	If todo status === false, todo starred = true
  >
  > ​	else If todo status === sure, todo starred = false

  

- Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```
{
    "status": true,
    "projectId": null,
    "starred": false,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project Edit",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Status Personal Todo [patch]

> <http://localhost:3000/todos/:id/starred>

- Request (application/json)

  > ​	If todo starred === false, todo starred = true
  >
  > ​	else If todo starred === sure, todo starred = false

  

  Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json) 

```
{
    "status": true,
    "projectId": null,
    "starred": true,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project Edit",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```





<h2>Project Routes </h2>
<hr>

## Create Project [post]

> <http://localhost:3000/projects/>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project",
	"description" : "Some description of your project",
	"member" : "userA@mail.com",
	"member" : "userB@mail.com",
}
```

- Response 200 (application/json)

```

	{
       "members": [
                "_id": "5dde3cf7dec138208aa53506",
                "_id": "5ddeb58c252bcb500cc01b6a",
        ],
        "pendingInvitation": [],
        "todos": [],
        "_id": "5de529c42ffdad5f3f5e2e13",
        "title": "Your New Project",
        "description": "Some description of your project",
        "owner":"5ddeb58c252bcb500cc01b6a",
        },
        "__v": 0
    },
```

- Response 400 (application/json)

```
{
    "message": "Project validation failed: title: Title is required, 	description: Description is required"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```



## Show All Projects [get]

> <http://localhost:3000/projects/>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```
[ 
	{
       "members": [
                "_id": "5dde3cf7dec138208aa53506",
                "_id": "5ddeb58c252bcb500cc01b6a",
        ],
        "pendingInvitation": [],
        "todos": [],
        "_id": "5de529c42ffdad5f3f5e2e13",
        "title": "Your New Project",
        "description": "Some description of your project",
        "owner":"5ddeb58c252bcb500cc01b6a",
        },
        "__v": 0
    },
    {
       "members": [
                "_id": "5dde3cf7dec138208aa53506",
        ],
        "pendingInvitation": [],
        "todos": [],
        "_id": "5de529c42ffdad5f3f5e2e13",
        "title": "Another Project",
        "description": "Some description of your another project",
        "owner":"5ddeb58c252bcb500cc01b6a",
        },
        "__v": 0
    },
]
```

- Response 400 (application/json)

```
{
    "message": "Project validation failed: title: Title is required, 	description: Description is required"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```



## Show Projects by ID [get]

> <http://localhost:3000/projects/>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```

	{
       "members": [
                "_id": "5dde3cf7dec138208aa53506",
                "_id": "5ddeb58c252bcb500cc01b6a",
        ],
        "pendingInvitation": [],
        "todos": [],
        "_id": "5de529c42ffdad5f3f5e2e13",
        "title": "Your New Project",
        "description": "Some description of your project",
        "owner":"5ddeb58c252bcb500cc01b6a",
        },
        "__v": 0
   },
   
```

- Response 400 (application/json)

```
{
    "message": "Project validation failed: title: Title is required, 	description: Description is required"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```



## Delete Project [delete]

> <http://localhost:3000/projects/:id>

- Request (application/json)

  Params:  id ( project id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": project successfully updated"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```

- Response 403 (application/json)

```
{
    "message": "only owner can perform this action"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```

## 

## Update Project [put]

> <http://localhost:3000/projects/:id>

- Request (application/json)

  Params:  id ( project id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project Edited",
	"description" : "Some description of your project",
	"member" : "userA@mail.com",
	"member" : "userB@mail.com",
}
```

- Response 200 (application/json)

```
	{
       "members": [
                "_id": "5dde3cf7dec138208aa53506",
                "_id": "5ddeb58c252bcb500cc01b6a",
        ],
        "pendingInvitation": [],
        "todos": [],
        "_id": "5de529c42ffdad5f3f5e2e13",
        "title": "Your New Project",
        "description": "Some description of your project",
        "owner":"5ddeb58c252bcb500cc01b6a",
        },
        "__v": 0
    },
```

- Response 400 (application/json)

```
{
    "message": "Project validation failed: title: Title is required, 	description: Description is required"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```

## 

## Member Leave Project [put]

> <http://localhost:3000/projects/:id/leave>

- Request (application/json)

  Params:  id ( project id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```
{
    "members":"you left the group, you can ask the owner to re-invited you later"
},
```

- Response 403 (application/json)

```
{
    "message": "The owner is not allowed to leave the group"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```

## 



<h2>Todos in Project Routes </h2>
<hr>

## Create Todo Project [post]

> <http://localhost:3000/project/:id/todos/>

- Request (application/json)

  Params :   id  ( projectID )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project",
	"date" : "2019-12-22",
	"assignee" : "userB@mail.com",
}
```

- Response 201 (application/json)

```
{
		message : "project successfully updated"
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```

## 



## Get All Todo in Project [get]

> <http://localhost:3000/projects/:id/todos>

- Request (application/json)

  Params :   id  ( projectID )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

```
{
	"title" : "Your New Project",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
[
    {
        "status": false,
        "projectId": "5de5ewrqwe65c5f5bb98c96f6fc5b",
        "starred": false,
        "_id": "5de5e65c5f5bb98c96f6fc5b",
        "title": "Project Baru",
        "date": "2019-12-22T00:00:00.000Z",
        "userId": "5ddeb58c252bcb500cc01b6a",    
        "assignee": "5ddeb58c252bcb500cc01b6a",
            
    {
        "status": false,
        "projectId": "5de5ewrqwe65c5f5bb98c96f6fc5b",
        "starred": false,
        "_id": "5de5e6f25f5bb98c96f6fc5e",
        "title": "Project Baru",
        "date": "2019-12-22T00:00:00.000Z",
        "userId": "5ddeb58c252bcb500cc01b6a"
        "assignee": "5ddeb58c252bcb500cc01b6a"
        "__v": 0
    }
]
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```



## Get Personal Todo by ID [get]

> <http://localhost:3000/projects/:id/todos/:todosid>

- Request (application/json)

  Params :   id  ( projectID ), todosid (todoID)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- Response 200 (application/json)

```
{
        "status": false,
        "projectId": "5de5ewrqwe65c5f5bb98c96f6fc5b",
        "starred": false,
        "_id": "5de5e6f25f5bb98c96f6fc5e",
        "title": "Todo Baru",
        "date": "2019-12-22T00:00:00.000Z",
        "userId": "5ddeb58c252bcb500cc01b6a"
        "assignee": "5ddeb58c252bcb500cc01b6a"
        "__v": 0
  }
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Delete Personal Todo [delete]

> <http://localhost:3000/projects/:id/todos/:todosid>

- Request (application/json)

  Params :   id  ( projectID ), todosid (todoID)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "delete todo success, project successfully updated"
}
```

- Response 401 (application/json)

```
{
    "message": "jwt must be provided"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Personal Todo [put]

> <http://localhost:3000/projects/:id/todos/:todosid>

- Request (application/json)

  Params :   id  ( projectID ), todosid (todoID)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- 

```
{
	"title" : "Your New Project Edit",
	"date" : "2019-12-22",
}
```

- Response 200 (application/json)

```
{
    "status": false,
    "projectId": null,
    "starred": false,
    "_id": "5de5e65c5f5bb98c96f6fc5b",
    "title": "Your New Project Edit",
    "date": "2019-12-22T00:00:00.000Z",
    "userId": "5ddeb58c252bcb500cc01b6a",
    "assignee": "5ddeb58c252bcb500cc01b6a",
    "__v": 0
}
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Status Personal Todo [patch]

> <http://localhost:3000/todos/:id/status>

- Request (application/json)

  

  > If todo status === false, todo starred = true
  >
  > else If todo status === sure, todo starred = false

  

- Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  ```
  {
  	"title" : "Your New Todo In Project Edited",
  	"date" : "2019-12-22",
  }
  ```

  

- Response 201 (application/json)

```
{ "message" : "Todo in project successfully updated" }
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Starred Personal Todo [patch]

> <http://localhost:3000/todos/:id/starred>

- Request (application/json)

  > If todo status === false, todo starred = true
  >
  > else If todo status === sure, todo starred = false

- Params:  id ( todo id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  ```
  {
  	"title" : "Your New Todo In Project Edited",
  	"date" : "2019-12-22",
  }
  ```

  

- Response 201 (application/json)

```
{ "message" : "Todo in project successfully updated" }
```

- Response 400 (application/json)

```
{
    "message": "Todo validation failed: title: Title is required, 	date: Date is required"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



