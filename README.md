## Fancy Todo

#### Register User

* **URL**
  <_/users/signup_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > name=[string]
    >
    > email=[string]
    >
    > password=[string]

    

* **Success Response**

  * 201 Created

    ```javascript
    {
        "_id": "5ddb7ff239c78c0f9e05d0fe",
        "name": "Angela Vanessa",
        "email": "angela@mail.com",
        "password": "$2a$10$ULpXmo/RivRPQmxm64d3gekppX5BA2izlvb5vPVIv2Azm6F8bpv3i",
        "createdAt": "2019-11-25T07:17:06.049Z",
        "updatedAt": "2019-11-25T07:17:06.049Z",
        "__v": 0
    }
    ```

* **Error Response**

  * 422 Unprocessable Entity

    ```javascript
    {
        "message": [
            "Name can not be empty",
            "Email can not be empty",
            "Password can not be empty"
        ]
    }
    ```

  * 400 Bad Request

    ```javascript
    {
        "message": "Email user is already registered!"
    }
    ```

#### Login User

* **URL**
  <_/users/signin_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > email=[string]
    >
    > password=[string]

* **Success Response**

  * 200 OK

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGI3ZmYyMzljNzhjMGY5ZTA1ZDBmZSIsImVtYWlsIjoiYW5nZWxhQG1haWwuY29tIiwiaWF0IjoxNTc0NjY4MDgxfQ.aKFh1WzcLFt8sWc11_lIi1FsQNXvv80Cpxrqy5L5xNM",
        "name": "Angela Vanessa",
        "email": "angela@mail.com"
    }
    ```

* **Error Response**

  * 400 Bad Request

    ```javascript
    {
        "message": "Bad Request"
    }
    ```

#### Create Project

* **URL**
  <_/projects_>

* **Method:**
  `POST` 

* **URL Params:**

  `Authorization`: `string`

* **Data Params:**

  * Required

    > name=[string]

* **Success Response**

   * 201 Created

     ```javascript
     {
         "members": [],
         "_id": "5ddb8cac9100b512028b382f",
         "name": "First Project",
         "owner": "5ddb7ff239c78c0f9e05d0fe",
         "createdAt": "2019-11-25T08:11:24.826Z",
         "updatedAt": "2019-11-25T08:11:24.826Z",
         "__v": 0
     }
     ```

* **Error Response**

  * 401 Unauthorized

    ```javascript
    {
        "name": "JsonWebTokenError",
        "message": "jwt must be provided"
    }
    ```

#### Show One Project

* **URL**
  <_/projects/id_>

* **Method:**
  `GET` 

* **Headers:**

  `Authorization`: `string`

* **Success Response**

  * 200 OK

    ```javascript
    {
        "members": [],
        "_id": "5ddb8cac9100b512028b382f",
        "name": "First Project",
        "owner": {
            "_id": "5ddb7ff239c78c0f9e05d0fe",
            "name": "Angela Vanessa",
            "email": "angela@mail.com",
            "password": "$2a$10$ULpXmo/RivRPQmxm64d3gekppX5BA2izlvb5vPVIv2Azm6F8bpv3i",
            "createdAt": "2019-11-25T07:17:06.049Z",
            "updatedAt": "2019-11-25T07:17:06.049Z",
            "__v": 0
        },
        "createdAt": "2019-11-25T08:11:24.826Z",
        "updatedAt": "2019-11-25T08:11:24.826Z",
        "__v": 0
    }
    ```

* **Error Response**

  * 401 Unauthorized

    ```javascript
    {
        "name": "JsonWebTokenError",
        "message": "jwt must be provided"
    }
    
    ```

  * 404 Not Found

    ```javascript
    {
        "message": "Not found"
    }
    
    ```

#### Show All Projects

* **URL**
  <_/projects_>

* **Method:**
  `GET` 

* **Headers:**

  `Authorization`: `string`

* **Success Response**

  * 200 OK

    ```javascript
    [
        {
            "members": [],
            "_id": "5ddb8cac9100b512028b382f",
            "name": "First Project",
            "owner": "5ddb7ff239c78c0f9e05d0fe",
            "createdAt": "2019-11-25T08:11:24.826Z",
            "updatedAt": "2019-11-25T08:11:24.826Z",
            "__v": 0
        }
    ]
    
    ```