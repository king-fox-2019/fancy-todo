# Fancy Todo

The application that build to solve your problem about organize your todo list and your daily task, or you can create your team task list with this litle fancy todo.

NOTE :

Before use the application make sure that you register to the website and login to get Access Token

- BASE URL

```http
http://localhost:PORT
```



## RESTFUL API DOCUMENTATION



## 1. User

#### a. User Register

- **Endpoint**

```http
POST /user/register
```



- Body**

  username : String (**Required**),

  email: String (**Required**),

  password: String (**Required**)

  

- **Success Response**

```javascript
{
    "_id": "5dd81064cc9788edfcaa1902",
    "username": "example",
    "email": "example@gmail.com",
    "password": "$2a$10$F8koruV26FhnKGgad9pVK.IgdxMDUgKSC8zvzYcYQ8POcVYKZqiYm",
    "createdAt": "2019-11-22T16:44:20.020Z",
    "updatedAt": "2019-11-22T16:44:20.020Z"
}
```



- **Error** **Response**

  **Username Error**

  - Required Field Error

  ```javascript
  {
      "code": 400,
      "message": [
          "Username cannot be empty"
      ]
  }
  ```

  

  **Email Error**

  - Validation Error

  ```javascript
  {
      "code": 400,
      "message": "Your email is already registered"
  }
  ```

  - Required Field Error

  ```javascript
  {
      "code": 400,
      "message": [
          "Email cannot be empty"
      ]
  }
  ```

  

  **Password Error**

  - Required Field Error

  ```javascript
  {
      "code": 400,
      "message": [
          "Password cannot be empty"
      ]
  }
  ```



#### b. User Login

- **Endpoint**

```http
POST /user/login
```



- **Body**

  email : String **(Required)**,

  password : String **(Required)**

  

- **Success Response**

  Server will give reponse an object that have two keys :

  - user
  - token

```javascript
{
    "user": {
        "_id": "5dd81658ea2f0cef6360a1ab",
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2a$10$Q9gbX6AKebDYt7wawCtbNu3zMQfU0.VnLNflrZdXUoNJCwreZ3D8S",
        "createdAt": "2019-11-22T17:09:44.155Z",
        "updatedAt": "2019-11-22T17:09:44.155Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDgxNjU4ZWEyZjBjZWY2MzYwYTFhYiIsImlhdCI6MTU3NDQ0MjY3Nn0.4LLcgS76LJ34QZgPEhn6tr2PSllrExs5ZWcMAbpU8_o"
}
```

- **Error Response**

  - Cannot find user data in database

  ```javascript
  {
      "code": 400,
      "message": "Your email is not registered"
  }
  ```

  - User password wrong

  ```javascript
  {
      "code": 400,
      "message": "Your password is wrong"
  }
  ```



#### c. Get All User

- **Endpoint**

```http
GET /user
```



- **Success Response**

  Will return information of all user but before we send it to client, we filtering first.

```javascript
[
    {
        "_id": "5dd81658ea2f0cef6360a1ab",
        "username": "admin",
        "email": "admin@admin.com"
    },
    {
        "_id": "5dd819c52d19ecf0b86312d2",
        "username": "example",
        "email": "example@gmail.com"
    },
    {
        "_id": "5dd83a6b413966faa007f4a7",
        "username": "faisal",
        "email": "faisal@gmail.com"
    }
]
```



#### d. Get One User

- **Endpoint**

```http
GET /user
```



- **Params**

  id : String **(Required)**

  

- **Success Response**

```javascript
{
    "username": "admin",
    "email": "admin@admin.com"
}
```



- **Error Response**

```javascript
{
    "code": 500,
    "message": "Cast to ObjectId failed for value \"5dd81658ea2f0cef6360a1a\" at path \"_id\" for model \"User\""
}
```

#### 

## 2. Todo



#### a. Create Todo

- **Endpoint**

```http
POST /todo
```



- **Body**

  title : String **(Required)**,

  desc : String **(Required)**,

  status : String **(Default : Pending)**

  dueDate : Date **(Required)**,

  creator : Schema.Types.ObjectId

  

- **Headers**

  ```javascript
  {
  		access_token : "token"
  }
  ```

  

- **Success Response**

  ```javascript
  {
      "status": "Pending",
      "_id": "5dd8332e91dc6df8408420da",
      "title": "Test1",
      "desc": "ini emang test aja",
      "dueDate": "2019-11-22T19:12:46.396Z",
      "creator": "5dd819c52d19ecf0b86312d2",
      "createdAt": "2019-11-22T19:12:46.397Z",
      "updatedAt": "2019-11-22T19:12:46.397Z"
  }
  ```

- **Error** **Response**

  - Title Required Error

    ```javascript
    {
        "code": 400,
        "message": [
            "Title cannot be empty"
        ]
    }
    ```

  - Description Required Error

    ```javascript
    {
        "code": 400,
        "message": [
            "Description cannot be empty"
        ]
    }
    ```

  - Error when choose day before current time

    ```javascript
    {
        "code": 500,
        "message": "Please select another day"
    }
    ```

  

  #### b. Get All Todo

  - **Endpoint**

    ```http
    GET /todo
    ```

  - **Headers**

    access_token : String **(Required)**

    

  - **Success Response**

    ```javascript
    [
        {
            "status": "Pending",
            "_id": "5dd8332e91dc6df8408420da",
            "title": "Test1",
            "desc": "ini emang test aja",
            "dueDate": "2019-11-22T19:12:46.396Z",
            "creator": "5dd819c52d19ecf0b86312d2",
            "createdAt": "2019-11-22T19:12:46.397Z",
            "updatedAt": "2019-11-22T19:12:46.397Z"
        },
        {
            "status": "Pending",
            "_id": "5dd8368d0de16af936e6bb7c",
            "title": "buat lagi",
            "desc": "ini buat lagi kok",
            "dueDate": "2019-11-22T19:27:09.215Z",
            "creator": "5dd819c52d19ecf0b86312d2",
            "createdAt": "2019-11-22T19:27:09.215Z",
            "updatedAt": "2019-11-22T19:27:09.215Z"
        }
    ]
    ```

  - **Error Response**

    - Authenticate Error

      ```javascript
      {
          "code": 401,
          "message": "jwt must be provided"
      }
      ```

  

  

  #### c. Get All User Todo

  ​	User can find all todo that have been created by himself

  - **Endpoint**

    ```http
    GET /todo/mytodo
    ```

  - **Headers**

    ```javascript
    {
    		access_token : "token"
    }
    ```

  - **Success** **Response**

    ```javascript
    [
        {
            "status": "Pending",
            "_id": "5dd83abd413966faa007f4aa",
            "title": "Punya faisal ya",
            "desc": "apasih>>??",
            "dueDate": "2019-11-22T19:45:01.883Z",
            "creator": "5dd83a6b413966faa007f4a7",
            "createdAt": "2019-11-22T19:45:01.883Z",
            "updatedAt": "2019-11-22T19:45:01.883Z"
        }
    ]
    ```

  - **Error**

    - Authenticate Failed

      ```javascript
      {
          "code": 401,
          "message": "jwt must be provided"
      }
      ```

  

  

  

  #### d. Edit Todo Status

  - **Endpoint**

    ```http
    PUT /todo/:id
    ```

    

  - **Headers**

    access_token : String **(Required)**

    

  - **Params**

    id : String **(Required)**

    

  - **Success Response**

    ```javascript
    {
        "message": "Update Success"
    }
    ```

  - **Error**

    - Authenticate Failed

      ```javascript
      {
          "code": 401,
          "message": "jwt must be provided"
      }
      ```

    - Authorization Failed

      ```javascript
      {
          "code": 500,
          "message": "Cannot read property 'creator' of null"
      }
      ```

    - Failed to done todo again

      ```javascript
      {
          "code": 400,
          "message": "You have done this task"
      }
      ```

      

  

  #### e. Edit Content Todo

  - **Endpoint**

    ```http
    PUT /todo/edit/:id
    ```

  - **Params**

    id : String **(Required)**

    

  - **Headers**

    access_token : String **(Required)**

    

  - **Body**

    title : String **(Required)**,

    desc : String **(Required)**.

    dueDate: Date **(Required)**

    

  - **Succcess Response**

    ```javascript
    {
        "message": "Update Success"
    }
    ```

  - **Error**

    - Authenticate Failed

      ```javascript
      {
          "code": 401,
          "message": "jwt must be provided"
      }
      ```

      





#### f. Delete Todo

- **Endpoint**

  ```http
  DELETE /todo/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  ```javascript
  {
  		access_token: "token"
  }
  ```

- **Success Response**

  ```javascript
  {
      "message": "Delete Success"
  }
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    





#### g. Get One Todo

- **Endpoint**

  ```http
  GET /todo/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "status": "Done",
      "_id": "5dd83abd413966faa007f4aa",
      "title": "Punya faisal ya",
      "desc": "apasih>>??",
      "dueDate": "2019-11-22T19:45:01.883Z",
      "creator": "5dd83a6b413966faa007f4a7",
      "createdAt": "2019-11-22T19:45:01.883Z",
      "updatedAt": "2019-11-22T20:08:04.688Z"
  }
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    

  

## 3. Project



#### a. Get All Project

- **Endpoint**

  ```http
  GET /project
  ```

-  **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  [
      {
          "task": [
              "5de2bc0a45973e5201de0435",
              "5de2bc1d45973e5201de0436",
              "5de2bc2d45973e5201de0437"
          ],
          "members": [
              "5ddf69b99694dee016014d79",
              "5dd819c52d19ecf0b86312d2"
          ],
          "_id": "5de2bbbc45973e5201de0434",
          "title": "Saturday",
          "creator": "5dde3089d2b547c267d8e95c",
          "__v": 0
      }
  ]
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

  



#### b. Create Project

- **Endpoint**

  ```http
  POST /project
  ```

  

- **Headers**

  access_token: String **(Required)**

  

- **Body**

  title: String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Create project Sunday success!"
  }
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    





#### c. Get User Project

- **Endpoint**

  ```
  GET /project/user
  ```

  

- **Headers**

  access_token: String **(Required)**

  

- **Response**

  ```javascript
  [
      {
          "task": [
              "5de2bc0a45973e5201de0435",
              "5de2bc1d45973e5201de0436",
              "5de2bc2d45973e5201de0437"
          ],
          "members": [
              "5ddf69b99694dee016014d79",
              "5dd819c52d19ecf0b86312d2"
          ],
          "_id": "5de2bbbc45973e5201de0434",
          "title": "Saturday",
          "creator": {
              "_id": "5dde3089d2b547c267d8e95c",
              "username": "danang",
              "email": "danang@gmail.com",
              "password": "$2a$10$8v2qeLH1L1UcusMgL11J3Od9uzKHPsS6Kt0q4Pn8Y0DPP5bq0HFMW",
              "createdAt": "2019-11-27T08:15:05.798Z",
              "updatedAt": "2019-11-27T08:15:05.798Z"
          },
          "__v": 0
      },
      {
          "task": [],
          "members": [],
          "_id": "5de30fd645973e5201de0438",
          "title": "Sunday",
          "creator": {
              "_id": "5dd819c52d19ecf0b86312d2",
              "username": "example",
              "email": "example@gmail.com",
              "password": "$2a$10$I8aUD3Hft88uXEbEKNRPg.ts/AsYKDLy3XAT2CuExYz6uLSaKQP4u",
              "createdAt": "2019-11-22T17:24:21.112Z",
              "updatedAt": "2019-11-22T17:24:21.112Z"
          },
          "__v": 0
      }
  ]
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    



#### d. Get One Project

- **Endpoint**

  ```http
  GET /project/:id
  ```

- **Params**

  id : String **(Required)**

- **Headers**

  access_token: String **(Required)**

- **Response**

  ```javascript
  {
      "task": [],
      "members": [],
      "_id": "5de30fd645973e5201de0438",
      "title": "Sunday",
      "creator": {
          "_id": "5dd819c52d19ecf0b86312d2",
          "username": "example",
          "email": "example@gmail.com",
          "password": "$2a$10$I8aUD3Hft88uXEbEKNRPg.ts/AsYKDLy3XAT2CuExYz6uLSaKQP4u",
          "createdAt": "2019-11-22T17:24:21.112Z",
          "updatedAt": "2019-11-22T17:24:21.112Z"
      },
      "__v": 0
  }
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    

  

#### e. Edit Project

- **Endpoint**

  ```http
  PUT /project/:id
  ```

- **Params**

  id : String **(Required)**

- **Headers**

  access_token : String **(Required)**

- **Response**

  ```javascript
  {
      "message": "Update project success!"
  }
  ```

- **Error**

  - Invalid Project Id

    ```javascript
    {
        "code": 500,
        "message": "Cannot read property 'creator' of null"
    }
    ```

  - No Headers Error

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```



#### f. Delete Project

- **Endpoint**

  ```http
  DELETE /project/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Delete project success!"
  }
  ```

  

- **Error**

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have authorize to do action"
    }
    ```

  - Invalid Project Id

    ```javascript
    {
        "code": 500,
        "message": "Cannot read property 'creator' of null"
    }
    ```



## 4. Member of Project

#### a. Invite/Add Member

- **Endpoint**

  ```http
  POST /project/member/:id
  ```

  

- **Params**

  id : String **(Required)**

  

- **Body**

  email : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Success Add Member!"
  }
  ```

  

- **Error**

  - Authorization failed

    ```javascript
    {
        "code": 403,
        "message": "Only Creator can do that action"
    }
    ```

  - Add creator to member

    ```javascript
    {
        "code": 400,
        "message": "You cannot add creator Project as member!"
    }
    ```

  - Add member that already registered in project member

    ```javascript
    {
        "code": 400,
        "message": "User already registered as member in this project!"
    }
    ```

  - Add user that not registered to website

    ```javascript
    {
        "code": 400,
        "message": "There is no user with that email"
    }
    ```



#### b. Kick Member

- **Endpoint**

  ```http
  DELETE /project/member/:id
  ```

  

- **Params**

  id : String **(Required)**

  

- **Query**

  email: String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Kick member success!"
  }
  ```

- **Error**

  - Unregistered member

    ```javascript
    {
        "code": 400,
        "message": "There is no user with that email"
    }
    ```

    

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "Only Creator can do that action"
    }
    ```



## 5. Project Task

#### a. Create Task

- **Endpoint**

  ```http
  POST /project/task/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Adding task success!"
  }
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have authorize to do action"
    }
    ```



#### b. Get All Project Task

- **Endpoint**

  ```http
  GET /project/task/:id
  ```

- **Params**

  id : String **(Required)**

- **Headers**

  access_token : String **(Required)**

- **Response**

  ```javascript
  [
      {
          "status": "Pending",
          "_id": "5de323bfb7836c577c6be594",
          "title": "Uji coba task project",
          "desc": "Ini beneran uji coba ya",
          "dueDate": "2019-12-05T19:26:50.099Z",
          "creator": "5dd819c52d19ecf0b86312d2",
          "projectId": "5de31ae445973e5201de0439",
          "createdAt": "2019-12-01T02:21:51.593Z",
          "updatedAt": "2019-12-01T02:21:51.593Z"
      },
      {
          "status": "Pending",
          "_id": "5de3246fb7836c577c6be595",
          "title": "Uji coba task project",
          "desc": "Ini beneran uji coba ya",
          "dueDate": "2019-12-05T19:26:50.099Z",
          "creator": "5dde3485d2b547c267d8e961",
          "projectId": "5de31ae445973e5201de0439",
          "createdAt": "2019-12-01T02:24:47.912Z",
          "updatedAt": "2019-12-01T02:24:47.912Z"
      },
      {
          "status": "Pending",
          "_id": "5de3268854fd1e59118f6739",
          "title": "Uji coba task project 2",
          "desc": "Ini beneran uji coba ya 2",
          "dueDate": "2019-12-05T19:26:50.099Z",
          "creator": "5dd819c52d19ecf0b86312d2",
          "projectId": "5de31ae445973e5201de0439",
          "createdAt": "2019-12-01T02:33:44.213Z",
          "updatedAt": "2019-12-01T02:33:44.213Z"
      }
  ]
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have authorize to do action"
    }
    ```

  

#### c. Get One Task

- **Endpoint**

  ```http
  GET /project/task/:id/detail
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "status": "Pending",
      "_id": "5de323bfb7836c577c6be594",
      "title": "Uji coba task project",
      "desc": "Ini beneran uji coba ya",
      "dueDate": "2019-12-05T19:26:50.099Z",
      "creator": "5dd819c52d19ecf0b86312d2",
      "projectId": "5de31ae445973e5201de0439",
      "createdAt": "2019-12-01T02:21:51.593Z",
      "updatedAt": "2019-12-01T02:21:51.593Z"
  }
  ```

- **Error**

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have permission to do action!"
    }
    ```

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```



#### d. Update Status Task

- **Endpoint**

  ```http
  PUT /project/task/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Success update status task!",
      "projectId": "5de31ae445973e5201de0439"
  }
  ```

  

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have permission to do action!"
    }
    ```

  - Task Has Been Done Before

    ```javascript
    {
        "code": 400,
        "message": "Task has been done!"
    }
    ```

    

#### e. Edit Task

- **Endpoint**

  ```http
  PATCH /project/task/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```
  {
      "message": "Update Task Success",
      "projectId": "5de31ae445973e5201de0439"
  }
  ```

  

- **Error**

  - Authencticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have permission to do action!"
    }
    ```



#### f. Delete Task

- **Endpoint**

  ```http
  DELETE /project/task/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "message": "Success delete task",
      "projectId": "5de31ae445973e5201de0439"
  }
  ```

- **Error**

  - Authorization Failed

    ```javascript
    {
        "code": 403,
        "message": "You dont have permission to do action!"
    }
    ```

  - Authenticate Failed

    ```javascript
    {
        "code": 401,
        "message": "jwt must be provided"
    }
    ```

    