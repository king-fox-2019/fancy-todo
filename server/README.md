## USER REGISTER

- **URL's**

  ```json
  /users/register
  ```

- **URL Params**

  - Require     :  `none`
  - Optional   :  `none`

- **Data Params**

  - Require     :  `username: [string]`  ,  `email: [string]`  ,  `password: [string]`
  - Optional   :  `address: [string]`

- **Headers**

  - Require     :  `none`  

- **HTTP Method**

  `POST` 

- **Success Response**

  - Code		:  200 OK

  - Content   : 

    ```json
    {
        "id": "5de18382e4ebf5ea96a7e034",
        "email": "brahmantyasukma@gmail.com",
        "username": "brahmantyasukma",
    }
    ```

- **Error Response**

  - Validation Username

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "User validation failed: username: Username cannot be empty!"
      }
      ```

  - Validation Password

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "User validation failed: password: Password cannot be empty!"
      }
      ```

  - Validation Email

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "User validation failed: email: Email cannot be empty!"
      }
      ```

  - Validation Unique Email

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "User validation failed: email: Email is available!"
      }
      ```

- **Sample Call**

  ```javascript
  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val()
      }
    })
  ```





## USER LOGIN

- **URL's**

  ```json
  /users/login
  ```

- **URL Params**

  - Require     :  `none`
  - Optional   :  `none`

- **Data Params**

  - Require     :  `email: [string]`  ,  `password: [string]`
  - Optional   :  `none`

- **Headers**

  - Require     :  `none`  

- **HTTP Method**

  `POST` 

- **Success Response**

  - Code		: 200 OK

  - Content   : 

    ```json
    {
        "username": "brahmantyasukma",
        "email": "brahmantyasukma@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTE4MzgyZTRlYmY1ZWE5NmE3ZTAzNCIsImlhdCI6MTU3NTA2MTkxN30.Ngz3GBmoDoidl8dfg04Dx2azB-HfVw2s98gNFLQuPb0"
    }
    ```

- **Error Response**

  - Validation Passwords and Users do not Match

    - Code		: 400 Bad Request

    - Content   : 

      ```json
      {
          "message": "Password / Username is wrong"
      }
      ```

  - Validation User has not Registered

    - Code		: 400 Bad Request

    - Content   : 

      ```json
      {
          "message": "Password / Username is wrong"
      }
      ```

- **Sample Call**

  ```javascript
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
        email: $('#login-email').val(),
        password: $('#login-password').val()
      }
    })
  ```

  



## TODO CREATE

- **URL's**

  ```json
  /todos/
  ```

- **URL Params**

  - Require     :  `none`
  - Optional   :  `none`

- **Data Params**

  - Require     :  `title: [string]`  ,  `description: [string]` ,   `dueDate: [date]`
  - Optional   :  `none`

- **Headers**

  - Require     :  `access_token: [string]`  

- **HTTP Method**

  `POST` 

- **Success Response**

  - Code		: 201 Created

  - Content   : 

    ```json
    {
        "id": "5de15ede6ec1d9cec817966d",
        "description": "Lari Pagi Biar Sehat",
        "title": "Lari Pagi",
        "dueDate": "2019-02-12T00:00:00.000Z",
      	"status": false,
      	"userId": "5ddfccfe819230405cc44e4d"
    }
    ```

- **Error Response**

  - Validation Title

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "Todo validation failed: title: Title cannot be empty!"
      }
      ```

  - Validation Description

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "Todo validation failed: description: Description cannot be empty!"
      }
      ```

  - Validation Due Date

    - Code		: 422 Unprocessable Entity

    - Content   : 

      ```json
      {
          "message": "Todo validation failed: dueDate: Due Date cannot be empty!"
      }
      ```

  - Authentication User

    - Code		: 401 Unauthorized

    - Content   : 

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/todos',
      headers: { token: localStorage.getItem('token') },
      data: {
        title: $('#create-title').val(),
        description: $('#create-description').val(),
        dueDate: $('#create-dueDate').val()
      }
    })
  ```





## TODO READ

- **URL's**

  ```json
  /todos/
  ```

- **URL Params**

  - Require     :  `none`
  - Optional   :  `title: [string]` ,  `status: [boolean]`

- **Data Params**

  - Require     :  `none`
  - Optional   :  `none`

- **Headers**

  - Require     :  `access_token: [string]`  

- **HTTP Method**

  `GET` 

- **Success Response**

  - Code		: 200 OK

  - Content   : 

    ```json
    [
        {
            "_id": "5de15e72793771ce709442da",
            "title": "Makan Malam",
            "description": "Makan Malam 2x Sehari",
            "dueDate": "2019-02-12T00:00:00.000Z",
          	"status": false,
          	"userId": "5ddfccfe819230405cc44e4d"
            "__v": 0
        },
        {
            "_id": "5de1628b2af1e9d227357d3b",
            "title": "Lari Pagi",
            "description": "Lari Pagi Biar Sehat",
            "dueDate": "2019-02-12T00:00:00.000Z",
          	"status": false,
          	"userId": "5ddfccfe819230405cc44e4f"
            "__v": 0
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code		: 401 Unauthorized

    - Content   : 

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/todos',
      headers: {token: localStorage.getItem('token')}
    })
  ```

  



## TODO UPDATE

- **URL's**

  ```json
  /todos/:id
  ```

- **URL Params**

  - Require     :  `id: [integer]` 
  - Optional   :  `none`

- **Data Params**

  - Require     :   `none`
  - Optional   :  `title: [string]`  ,  `description: [string]` ,   `dueDate: [date]` ,   `status: [boolean]`

- **Headers**

  - Require     :  `access_token: [string]`  

- **HTTP Method**

  `PUT` 

- **Success Response**

  - Code		: 200 OK

  - Content   : 

    ```json
    {
        "_id": "5de15e72793771ce709442da",
        "title": "makan bebek",
        "description": "makan makan",
        "dueDate": "2019-02-04T00:00:00.000Z",
        "__v": 0,
        "status": false
    }
    ```

- **Error Response**

  - Authentication User

    - Code		: 401 Unauthorized

    - Content   : 

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/todos/${id}`,
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        title: $("#edit-title").val(),
        description: $("#edit-description").val(),
        dueDate: $("#edit-dueDate").val()
      }
    })
  ```





## TODO DELETE

- **URL's**

  ```json
  /todos/:id
  ```

- **URL Params**

  - Require     :  `id: [integer]`  
  - Optional   :  `none`

- **Data Params**

  - Require     :  `none`
  - Optional   :  `none`

- **Headers**

  - Require     :  `access_token: [string]`  

- **HTTP Method**

  `DELETE` 

- **Success Response**

  - Code		: 200 OK

  - Content   : 

    ```json
    {
        "_id": "5de15e72793771ce709442da",
        "title": "makan bebek",
        "description": "makan makan",
        "dueDate": "2019-02-04T00:00:00.000Z",
        "__v": 0,
        "status": false
    }
    ```

- **Error Response**

  - Authentication User

    - Code		: 401 Unauthorized

    - Content   : 

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/todos/${id}`,
      headers: { access_token: localStorage.getItem('access_token') },
    })
  ```

  