# Lavish-Todo


## API-DOCUMENTATION (apiary)
https://lavishtodo.docs.apiary.io


---------------------------------------------------------

# Lavish Todo Api Documentation

FORMAT: 1A
HOST: http://lavishtodo.hoandreasm.xyz/

# Lavish Todo

A todo app that could help you manage all of your todo list in fun and simple way, you can also create a project and invite members in it, and of course posting todo list in that project.
Every time you invite a member with valid email address, they will be automatically notified through their email.

## User Register [/users/register]

### register [POST]
+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": "123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
        }
        

+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": "123"
        }
+ Response 400

        {
            "msg": "Email is already registered"
        }

+ Request (application/json)

        {
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "email is required",
                "password is required"
            ]
        }
        
+ Request (application/json)

        {
            "email": "a@mail",
            "password": "123"
        }
+ Response 400

        {
            "message": "Validation Error",
            "errors": [
                "Invalid email format"
            ]
        }

## User Login [/users/login]

### login [POST]
+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": "123"
        }
+ Response 200 (application/json)

        {
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"
        }
        

+ Request (application/json)

        {
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": "wrong password"
        }
    
+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": ""
        }
+ Response 500

        {
            "message": "Illegal arguments: undefined, string"
        }
        
+ Request (application/json)

        {
            "email": "",
            "password": "123"
        }
+ Response 400

        {
            "message": "wrong password"
        }

## Todos [/todos/]

### Get all todos [GET]
+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": "123"
        }

+ Request
    + Headers

            token: "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        [
            {
                "status": true,
                "_id": "5ddcc6ddacff2b0a0f984b4a",
                "title": "todo 1",
                "description": "desc 1",
                "dueDate": "2020-01-28T17:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-26T06:31:57.559Z",
                "updatedAt": "2019-11-26T08:45:12.911Z"
            },
            {
                "status": false,
                "_id": "5ddcc8f00d72630a2f61cd56",
                "title": "belajar jQuery2",
                "description": "belajar jQuery part 2",
                "dueDate": "2019-12-12T00:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-26T06:40:48.843Z",
                "updatedAt": "2019-11-26T06:40:48.843Z"
            },
            {
                "status": false,
                "_id": "5de29089b4366e034d57068a",
                "title": "todo 3",
                "description": "description",
                "dueDate": "2019-11-30T17:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T15:53:45.918Z",
                "updatedAt": "2019-11-30T15:53:45.918Z"
            },
            {
                "status": true,
                "_id": "5de2e0a624bc1c0e9f4e437b",
                "title": "test",
                "description": "desc test",
                "dueDate": null,
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T21:35:34.516Z",
                "updatedAt": "2019-11-30T22:49:16.222Z"
            },
            {
                "status": false,
                "_id": "5de2e0a724bc1c0e9f4e437c",
                "title": "list todo",
                "description": "lord help",
                "dueDate": null,
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T21:35:35.403Z",
                "updatedAt": "2019-11-30T22:49:20.026Z"
            },
            {
                "status": false,
                "_id": "5de2e0a824bc1c0e9f4e437d",
                "title": "todo 3 of project 1",
                "description": "description of todo 3 from project 1",
                "dueDate": "2019-12-10T00:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T21:35:36.101Z",
                "updatedAt": "2019-11-30T21:35:36.101Z"
            },
            {
                "status": false,
                "_id": "5de2e8bd24bc1c0e9f4e4383",
                "title": "makan
                "description": "makan darin",
                "dueDate": "2019-12-04T17:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T22:10:05.029Z",
                "updatedAt": "2019-11-30T22:10:05.029Z"
            },
            {
                "status": true,
                "_id": "5de2e91e24bc1c0e9f4e4386",
                "title": "lulus fase 2",
                "description": "hahaha",
                "dueDate": "2019-12-08T17:00:00.000Z",
                "user_id": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-11-30T22:11:42.593Z",
                "updatedAt": "2019-11-30T22:11:42.593Z"
            }
        ]

+ Request (application/json)

        {
            "email": "a@mail.com",
            "password": "123"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
### Create todo [POST]
+ Request (application/json)

        {
           "title": "belajar jQuery",
            "description": "belajar jQuery",
            "dueDate": "2019-12-12"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
            "status": false,
            "_id": "5de37d70b28e65090bdf0786",
            "title": "belajar jQuery",
            "description": "belajar jQuery",
            "dueDate": "2019-12-12T00:00:00.000Z",
            "user_id": "5ddcc5cc96877209fb215e30",
            "createdAt": "2019-12-01T08:44:32.409Z",
            "updatedAt": "2019-12-01T08:44:32.409Z"
        }
        
+ Request (application/json)

        {
            "title": "belajar jQuery",
            "description": "belajar jQuery",
            "dueDate": "2019-10-12"
        }
    
+ Response 400 (application/json)

        {
            "message": "Validation Error",
            "errors": [
                "The date you entered is invalid or outdated"
            ]
        }
        
+ Request (application/json)

        {
            "title": "",
            "description": "",
            "dueDate": ""
        }
    
+ Response 400 (application/json)

        {
            "message": "Validation Error",
            "errors": [
                "Title is required",
                "Description is required",
                "Due date is required"
            ]
        }
        
## Todos/:id [/todos/{id}]

### Find One todo [GET]

+ Parameters
    + id - ID of the Todo 


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
            "status": false,
            "_id": "5de37d70b28e65090bdf0786",
            "title": "belajar jQuery",
            "description": "belajar jQuery",
            "dueDate": "2019-12-12T00:00:00.000Z",
            "user_id": "5ddcc5cc96877209fb215e30",
            "createdAt": "2019-12-01T08:44:32.409Z",
            "updatedAt": "2019-12-01T08:44:32.409Z"
        }

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
    
### Update todo [PUT]
+ Parameters
    + id - ID of the Todo

+ Request (application/json)

        {
            "title": "edit todo",
            "description": "berhasil",
            "dueDate": "2020-01-28"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
            "status": true,
            "_id": "5ddcc6ddacff2b0a0f984b4a",
            "title": "edit todo",
            "description": "berhasil",
            "dueDate": "2020-01-28T17:00:00.000Z",
            "user_id": "5ddcc5cc96877209fb215e30",
            "createdAt": "2019-11-26T06:31:57.559Z",
            "updatedAt": "2019-12-01T08:51:30.899Z"
        }
        
+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
### Update todo status [PATCH]

+ Parameters
    + id - ID of the Todo

+ Request (application/json)

        {
            "status": true
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
          "message": "status updated"
        }
+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
### Delete todo status [DELETE]

+ Parameters
    + id (number) - ID of the Todo


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
          "message": "delete success"
        }
+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
## Project [/projects/]

### Create project [POST]
+ Request (application/json)

        {
            "name": "Project 7"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
            "project": {
                "members": [],
                "todo_id": [],
                "_id": "5de381f0b28e65090bdf0789",
                "name": "Project 7",
                "owner": "5ddcc5cc96877209fb215e30",
                "createdAt": "2019-12-01T09:03:44.531Z",
                "updatedAt": "2019-12-01T09:03:44.531Z"
            }
        }

+ Request (application/json)

        {
            "name": ""
        }
    
+ Response 400 (application/json)

        {
            "message": "Validation Error",
            "errors": [
                "Project Name is required"
            ]
        }

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

### Get all projects [GET]

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        [
            {
                "members": [
                    "5ddcf44a4c2db70c999713d2",
                    "5ddcf44e4c2db70c999713d3",
                    "5ddcf4564c2db70c999713d5"
                ],
                "todo_id": [
                    "5ddd047d1280cf0d9fcf5884",
                    "5ddd07e54bffa80dd779add6",
                    "5ddd07ee4bffa80dd779add7",
                    "5dde0f570dd0e70a2be70bc3",
                    "5de2e00524bc1c0e9f4e4379",
                    "5de2e00624bc1c0e9f4e437a",
                    "5de2e0a624bc1c0e9f4e437b",
                    "5de2e0a724bc1c0e9f4e437c",
                    "5de2e0a824bc1c0e9f4e437d",
                    "5de2e0a824bc1c0e9f4e437e",
                    "5de2e0a924bc1c0e9f4e437f",
                    "5de2e0a924bc1c0e9f4e4380",
                    "5de2e0aa24bc1c0e9f4e4381",
                    "5de2e0ab24bc1c0e9f4e4382",
                    "5de2e8bd24bc1c0e9f4e4383"
                ],
                "_id": "5ddcfe0203837e0d1e74a58e",
                "name": "project 1",
                "owner": {
                    "_id": "5ddcc5cc96877209fb215e30",
                    "email": "a@mail.com",
                    "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                    "createdAt": "2019-11-26T06:27:24.188Z",
                    "updatedAt": "2019-11-26T06:27:24.188Z"
                },
                "createdAt": "2019-11-26T10:27:14.728Z",
                "updatedAt": "2019-11-30T22:49:20.050Z"
            },
            {
                "members": [
                    "5ddcc5cc96877209fb215e30",
                    "5ddcf4524c2db70c999713d4"
                ],
                "todo_id": [
                    "5de367a9073bdb04afddb1ac",
                    "5de36823073bdb04afddb1ad",
                    "5de3716ed6d9ec0603307b0d"
                ],
                "_id": "5ddcfe0903837e0d1e74a58f",
                "name": "project 2",
                "owner": {
                    "_id": "5ddcc5cc96877209fb215e30",
                    "email": "a@mail.com",
                    "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                    "createdAt": "2019-11-26T06:27:24.188Z",
                    "updatedAt": "2019-11-26T06:27:24.188Z"
                },
                "createdAt": "2019-11-26T10:27:21.203Z",
                "updatedAt": "2019-12-01T07:53:18.424Z"
            },
            {
                "members": [],
                "todo_id": [
                    "5de2e91224bc1c0e9f4e4385",
                    "5de2e91e24bc1c0e9f4e4386"
                ],
                "_id": "5ddcfe0c03837e0d1e74a590",
                "name": "project 3",
                "owner": {
                    "_id": "5ddcc5cc96877209fb215e30",
                    "email": "a@mail.com",
                    "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                    "createdAt": "2019-11-26T06:27:24.188Z",
                    "updatedAt": "2019-11-26T06:27:24.188Z"
                },
                "createdAt": "2019-11-26T10:27:24.669Z",
                "updatedAt": "2019-11-30T22:11:45.717Z"
            },
            {
                "members": [],
                        "todo_id": [],
                "_id": "5de2941eb4366e034d57068c",
                "name": "project asdasd",
                "owner": {
                    "_id": "5ddcc5cc96877209fb215e30",
                    "email": "a@mail.com",
                    "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                    "createdAt": "2019-11-26T06:27:24.188Z",
                    "updatedAt": "2019-11-26T06:27:24.188Z"
                },
                "createdAt": "2019-11-30T16:09:02.426Z",
                "updatedAt": "2019-11-30T16:09:02.426Z"
            },
            {
                "members": [],
                "todo_id": [],
                "_id": "5de29440b4366e034d57068d",
                "name": "project 123",
                "owner": {
                    "_id": "5ddcc5cc96877209fb215e30",
                    "email": "a@mail.com",
                    "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                    "createdAt": "2019-11-26T06:27:24.188Z",
                    "updatedAt": "2019-11-26T06:27:24.188Z"
                },
                "createdAt": "2019-11-30T16:09:36.730Z",
                "updatedAt": "2019-11-30T16:09:36.730Z"
            }
        ]

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
## Project/:id [/projects/{id}]

### Find One projects [GET]

+ Parameters

    + id - ID of the Project


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
            "members": [
                {
                    "_id": "5ddcf44a4c2db70c999713d2",
                    "email": "b@mail.com",
                    "password": "$2a$11$atHyIz3F49R/yF0zOgaBR.QJSYHENB/TeD/9CEl8HC2rnltp8JMjy",
                    "createdAt": "2019-11-26T09:45:46.993Z",
                    "updatedAt": "2019-11-26T09:45:46.993Z"
                },
                {
                    "_id": "5ddcf44e4c2db70c999713d3",
                    "email": "c@mail.com",
                    "password": "$2a$11$atHyIz3F49R/yF0zOgaBR.QJSYHENB/TeD/9CEl8HC2rnltp8JMjy",
                    "createdAt": "2019-11-26T09:45:50.810Z",
                    "updatedAt": "2019-11-26T09:45:50.810Z"
                },
                {
                    "_id": "5ddcf4564c2db70c999713d5",
                    "email": "e@mail.com",
                    "password": "$2a$11$atHyIz3F49R/yF0zOgaBR.QJSYHENB/TeD/9CEl8HC2rnltp8JMjy",
                    "createdAt": "2019-11-26T09:45:58.308Z",
                    "updatedAt": "2019-11-26T09:45:58.308Z"
                }
            ],
            "todo_id": [
                {
                    "status": true,
                    "_id": "5de2e0a624bc1c0e9f4e437b",
                    "title": "testtest",
                    "description": "aaaaaaaaa",
                    "dueDate": null,
                    "user_id": "5ddcc5cc96877209fb215e30",
                    "createdAt": "2019-11-30T21:35:34.516Z",
                    "updatedAt": "2019-11-30T22:49:16.222Z"
                },
                
                {
                    "status": false,
                    "_id": "5de2e0a824bc1c0e9f4e437d",
                    "title": "todo 3 of project 1",
                    "description": "description of todo 33333333 from project 1",
                    "dueDate": "2019-12-10T00:00:00.000Z",
                    "user_id": "5ddcc5cc96877209fb215e30",
                    "createdAt": "2019-11-30T21:35:36.101Z",
                    "updatedAt": "2019-11-30T21:35:36.101Z"
                },
                {
                    "status": false,
                    "_id": "5de2e0a824bc1c0e9f4e437e",
                    "title": "todo 3 of project 1",
                    "description": "description of todo 33333333 from project 1",
                    "dueDate": "2019-12-10T00:00:00.000Z",
                    "user_id": "5ddcc5cc96877209fb215e30",
                    "createdAt": "2019-11-30T21:35:36.762Z",
                    "updatedAt": "2019-11-30T21:35:36.762Z"
                },
                {
                    "status": false,
                    "_id": "5de2e0a924bc1c0e9f4e437f",
                    "title": "todo 3 of project 1",
                    "description": "description of todo 33333333 from project 1",
                    "dueDate": "2019-12-10T00:00:00.000Z",
                    "user_id": "5ddcc5cc96877209fb215e30",
                    "createdAt": "2019-11-30T21:35:37.359Z",
                    "updatedAt": "2019-11-30T21:35:37.359Z"
                }
            ],
            "_id": "5ddcfe0203837e0d1e74a58e",
            "name": "project 1",
            "owner": {
                "_id": "5ddcc5cc96877209fb215e30",
                "email": "a@mail.com",
                "password": "$2a$11$EZUL5tE6Csjl6QPu2Xvsm.NqegFk7x1Cn0cFR72pNGgJQBQVzTfQ.",
                "createdAt": "2019-11-26T06:27:24.188Z",
                "updatedAt": "2019-11-26T06:27:24.188Z"
            },
            "createdAt": "2019-11-26T10:27:14.728Z",
            "updatedAt": "2019-11-30T22:49:20.050Z"
        }

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

### Add member [PATCH]

+ Parameters

    + id - ID of the Project


+ Request

    + Headers
    
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"
            
+ Request (application/json)

        {
            "email": "b@mail.com"
        }            

+ Response 200 (application/json)

        {
            "members": [
                "5ddcf44a4c2db70c999713d2",
                "5ddcf44e4c2db70c999713d3",
                "5ddcf4564c2db70c999713d5",
                "5de3799cb28e65090bdf0783"
            ],
            "todo_id": [
                "5ddd047d1280cf0d9fcf5884",
                "5ddd07e54bffa80dd779add6",
                "5ddd07ee4bffa80dd779add7",
                "5dde0f570dd0e70a2be70bc3",
                "5de2e00524bc1c0e9f4e4379",
                "5de2e00624bc1c0e9f4e437a",
            ],
            "_id": "5ddcfe0203837e0d1e74a58e",
            "name": "project 1",
            "owner": "5ddcc5cc96877209fb215e30",
            "createdAt": "2019-11-26T10:27:14.728Z",
            "updatedAt": "2019-12-01T09:00:52.110Z"
        }

+ Request

    + Headers
    
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"
            
+ Request (application/json)

        {
            "email": "v@mail.com"
        }            

+ Response 404 (application/json)

        {
            "message": "Email not found"
        }

### Delete project [DELETE]

+ Parameters
    + id - ID of the Todo 


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
          "message": "Project deleted"
        }

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

## Project/:id/todos [/projects/{id}/todos]

### add todos to project [PATCH]

+ Parameters

    + id - ID of the Project in the form of an integer


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Request (application/json)

        {
            "title": "todo 1 of project 7",
            "description": "description of todo 1 of project 7",
            "dueDate": 2019-12-04
        }


+ Response 200 (application/json)

        {
            "members": [],
            "todo_id": [
                "5de385efb28e65090bdf078e"
            ],
            "_id": "5de381f0b28e65090bdf0789",
            "name": "project 7",
            "owner": "5ddcc5cc96877209fb215e30",
            "createdAt": "2019-12-01T09:03:44.531Z",
            "updatedAt": "2019-12-01T09:20:47.449Z"
        }

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE5MjEzNH0.pwx90GffeVPUGUdGGJb4U28vfNx1IiEbA0MKzz8OHqg"

+ Request (application/json)

        {
            "title": "todo 1 of project 7",
            "description": "description of todo 1 of project 7",
            "dueDate": 2019-12-04
        }


+ Response 401 (application/json)

        {
            "message": "Project Member authorization failed"
        }
+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Request (application/json)

        {
            "title": "",
            "description": "",
            "dueDate":
        }


+ Response 400 (application/json)

        {
            "message": "Validation Error",
            "errors": [
                "Title is required",
                "Description is required",
                "Due date is required"
            ]
        }

## Project/:id/todos/:todoId [/projects/{id}/todos/{todoId}]

### Delete todos in project [DELETE]

+ Parameters

    + id - ID of the Project

+ Parameters

    + todoId - ID of the Todo


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Response 200 (application/json)

        {
          "message": "Todo deleted"
        }

+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM4YjU5YjI4ZTY1MDkwYmRmMDc5MSIsImVtYWlsIjoia0BtYWlsLmNvbSIsImlhdCI6MTU3NTE5MzQzNH0.4aSv54otSJp4pfRvBZIaj_lbj4bdYm8MNc46srxnT7s"

+ Response 401 (application/json)

        {
            "message": "Project Member authorization failed"
        }

### update todos in project [PATCH]

+ Parameters

    + id - ID of the Project

+ Parameters

    + todoId - ID of the Todo


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Request (application/json)

        {
            "title": "Update todo project",
            "description": "coba update"
            "dueDate": 2019-11-05
        }


+ Response 200 (application/json)

        {
            "message": "Todo update success"
        }
        
+ Request
    + Headers

            token: ""

+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM4YjU5YjI4ZTY1MDkwYmRmMDc5MSIsImVtYWlsIjoia0BtYWlsLmNvbSIsImlhdCI6MTU3NTE5MzQzNH0.4aSv54otSJp4pfRvBZIaj_lbj4bdYm8MNc46srxnT7s"

+ Response 401 (application/json)

        {
            "message": "Project Member authorization failed"
        }

## Project/:id/todos/:todoId/status [/projects/{id}/todos/{todoId}/status]

### Update todo's status in project [PATCH]

+ Parameters

    + id - ID of the Project

+ Parameters

    + todoId - ID of the Todo


+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

+ Request (application/json)

        {
            "stauts": true
        }

+ Response 200 (application/json)

        {
          "message": "Todo status updated"
        }

+ Request
    + Headers

            token: ""

+ Request (application/json)

        {
            "stauts": true
        }
        
+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM4YjU5YjI4ZTY1MDkwYmRmMDc5MSIsImVtYWlsIjoia0BtYWlsLmNvbSIsImlhdCI6MTU3NTE5MzQzNH0.4aSv54otSJp4pfRvBZIaj_lbj4bdYm8MNc46srxnT7s"

+ Request (application/json)

        {
            "stauts": true
        }
        
+ Response 401 (application/json)

        {
            "message": "Project Member authorization failed"
        }
## Quote [/quote]

### Get random qoute [GET]

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"


+ Response 200 (application/json)

        {
            "_id": "5d91b45d9980192a317c8da7",
            "quoteText": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
            "quoteAuthor": "Albert Schweitzer"
        }
        
+ Request
    + Headers

            token: ""
        
+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }
        
## Shibe [/shibe]

### Get random picture of Shibe [GET]

+ Request

    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"


+ Response 200 (application/json)

        [
            "https://cdn.shibe.online/shibes/d6dede20764fb89240aed531663e1bab6e88560c.jpg"
        ]
        
+ Request
    + Headers

            token: ""
        
+ Response 401 (application/json)

        {
            "message": "jwt must be provided"
        }