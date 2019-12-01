# FANCY TODO - Server

* **BASE URL :**

  `httmp://localhost:3000`

**Register User**
----
  Returns json data about newly register user.

* **URL**

  /user

* **Method:**

  `POST`

* **Data Params**

  &nbsp; name: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

* **Success Response:**

  * **Code:** 201 <br />
    ```javascript
        {
            "isGoogle": false,
            "_id": "5de0ae689fab012045e0948e",
            "name": "name",
            "email": "email@mail.com",
            "password": "$2b$10$6wmSQU41NW7iC1AvWmNhtO4atYb1QX5oTUDy0QdvWNFBStTVWQIIq",
            "__v": 0
        }
    ```
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    ```javascript
    {
        "message": [
            "Please enter your name.",
            "Please enter your email address.",
            "Email already registered"
            "Please enter your password."
        ]
    }
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user`,
        method: `post`,
        data: {
            name: First and last name,
            email: email@mail.com, 
            password: `12345`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

**Login User**
----
  Returns json data about a single user.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

  email: STRING
  password: STRING

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmJiIiwiZW1haWwiOiJiYmJAbWFpbC5jb20iLCJpZCI6IjVkZTBhZTY4OWZhYjAxMjA0NWUwOTQ4ZSIsImlhdCI6MTU3NTAwNzE3NiwiZXhwIjoxNTc1MDkzNTc2fQ.1YSl0xcpDT_HxPUPjgp5I7HPH4Liezt-xFwFPROuQ24"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:** 
    ```javascript
    {
        "message": "Invalid email or password."
    }
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/login`,
        method: `post`,
        data: {
            email: 'email@mail.com',
            password: '12345'
        }
    })
  ```


**Sign In Google User**
----
  Returns json data about a single user.

* **URL**

  /user/google

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 

* **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/google`,
        method: 'post',
        data: {
        token: id_token
        }
    })
    .done(({token, name}) => {
        console.log(token, name)
    })
  ```

 **Get Todo**
----
  Returns json data of all todo from a single user.

* **URL**

  /todo

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
        [{
            "status": "completed",
            "_id": "5de24aa524ee3dc718354557",
            "name": "cobain authorize lagi",
            "description": "agak susah",
            "due_date": "2019-12-02T00:00:00.000Z",
            "user": {
                "_id": "5de236b8ce5a36bbc85d6ca9",
                "name": "Amil Hasbala",
                "email": "amilhasbala@gmail.com"
            },
            "__v": 0
        },
        {
            "status": "pending",
            "_id": "5de24ab224ee3dc718354558",
            "name": "cobain authorize",
            "description": "susah",
            "due_date": "2019-12-02T00:00:00.000Z",
            "user": {
                "_id": "5de236b8ce5a36bbc85d6ca9",
                "name": "Amil Hasbala",
                "email": "amilhasbala@gmail.com"
            },
            "__v": 0
        }]
    ```
 
* **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/todo`,
        method: `get`,
        headers: {
            token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTIzNmI4Y2U1YTM2YmJjODVkNmNhOSIsImlhdCI6MTU3NTIxNTYzN30.wuhHumUN9IAp9sCoOLjT_GrZqhcyvTgyENusr0NOekI"
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

