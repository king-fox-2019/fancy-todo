# Fancy Todo

The application that build to solve your problem about organize your todo list and your daily task, or you can create your team task list with this litle fancy todo.



## RESTFUL API DOCUMENTATION



## 1. User

#### a. User Register

- Endpoint

```http
POST /user/register
```

- Body

  username : String (**Required**),

  email: String (**Required**),

  password: String (**Required**)

- Success Response

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

- Error Response

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

- Endpoint

```http
POST /user/login
```

- Body

  email : String **(Required)**,

  password : String **(Required)**

- Success Response

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

- Error Response

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

- Endpoint

```http
GET /user
```

- Success Response

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

- Endpoint

```http
GET /user
```

- Params

  id : String **(Required)**

- Success Response

```javascript
{
    "username": "admin",
    "email": "admin@admin.com"
}
```

- Error Response

```javascript
{
    "code": 500,
    "message": "Cast to ObjectId failed for value \"5dd81658ea2f0cef6360a1a\" at path \"_id\" for model \"User\""
}
```

#### 

## 2. Todo



#### a. Create Todo

- Endpoint

```http
POST /todo
```

- Body

  title : String **(Required)**,

  desc : String **(Required)**,

  status : String **(Default : Pending)**

  dueDate : Date **(Required)**,

  creator : Schema.Types.ObjectId

- Headers

  ```javascript
  {
  		access_token : "token"
  }
  ```

- Success Response

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

- Error Response

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

  - Endpoint

    ```http
    GET /todo
    ```

  - Headers

    ```javascript
    {
    		access_token : "token"
    }
    ```

  - Success Response

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

  - Error Response

    - Authenticate Error

      ```javascript
      {
          "code": 401,
          "message": "jwt must be provided"
      }
      ```

  #### c. Get All User Todo

  ​	User can find all todo that have been created by himself

  - Endpoint

    ```http
    GET /todo/mytodo
    ```

  - Headers

    ```javascript
    {
    		access_token : "token"
    }
    ```

  - Success Response

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

  

  #### d. Edit Todo Status

  - Endpoint

    ```http
    PUT /todo/:id
    ```

  - Headers

    ```javascript
    {
    		access_token: "token"
    }
    ```

  - Params

    id : String **(Required)**

  - Success Response

    ```javascript
    {
        "message": "Update Success"
    }
    ```

  

  #### e. Edit Content Todo

  - Endpoint

    ```http
    PUT /todo/edit/:id
    ```

  - Params

    id : String **(Required)**

  - Headers

    ```javascript
    {
    		access_token: "token"
    }
    ```

  - Body

    title : String **(Required)**,

    desc : String **(Required)**.

    dueDate: Date **(Required)**

  - Succcess Response

    ```http
    {
        "message": "Update Success"
    }
    ```

    

#### f. Delete Todo

- Endpoint

  ```http
  DELETE /todo/:id
  ```

- Params

  id : String **(Required)**

- Headers

  ```javascript
  {
  		access_token: "token"
  }
  ```

- Success Response

  ```javascript
  {
      "message": "Delete Success"
  }
  ```

  