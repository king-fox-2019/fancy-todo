# fancy-todo

* **BASE URL**
http://localhost:3000

**Register User**
----
  Returns json data about newly register user.

* **URL**

  /user/register

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
            "name": "jane",
            "email": "jane@mail.com",
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
        url: `<baseURL>/user/register`,
        method: `post`,
        data: {
            name: jane doe,
            email: janedoe@mail.com, 
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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmJiIiwiZW1haWwiOiJiYmJAbWFpbC5jb20iLCJpZCI6IjVkZTBhZTY4OWZhYjAxMjA0NWUwOTQ4ZSIsImlhdCI6MTU3NTAwNzE3NiwiZXhwIjoxNTc1MDkzNTc2fQ.1YSl0xcpDT_HxPUPjgp5I7HPH4Liezt-xFwFPROuQ24",
        "name": "jane",
        "email": "jane@mail.com"
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
            email: 'jane@mail.com'
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
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 

* **Sample Call:**

  ```javascript
    $.ajax({
        url: `${baseURL}/user/google`,
        method: 'post',
        data: {
        token: id_token
        }
    })
    .done(({token, name}) => {
        console.log(token, name)
    })
  ```

**Create Todo**
----
  Returns json data about a single user.

* **URL**

  /todo

* **Method:**

  `POST`

* **Data Params**

  name: STRING
  description: STRING
  due_date: DATE

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
        {
            "status": false,
            "_id": "5de3208464e227300a37a3c3",
            "name": "take dogs to vet",
            "description": "take dogs to vet to get vaccinate",
            "owner": "5de2aa28cbfb431841b3e22d",
            "due_date": "2019-12-01T02:08:04.507Z",
            "__v": 0
        }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "message": [
        "Please enter todo's name."
        ]
    }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "You have to login first." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "<base_url>/todo/",
      dataType: "json",
      type : "POST",
      data: {
          name: 'take dog to the vet',
          description: 'take dog to nearby vet to get vaccinated',
          due_date: '2019-12-01'
      }
    })
    .done(result => console.log(result))
    .fail(err => console.log(err))
  ```


**Get Todos**
----
  Returns json data of todos by ownership.

* **URL**

  /todo

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
        [
            {
                "status": true,
                "_id": "5de2aa6bcbfb431841b3e22e",
                "name": "walk the cat",
                "description": "walk the cat to park nearby",
                "owner": "5de2aa28cbfb431841b3e22d",
                "due_date": "2019-11-30T17:44:11.369Z",
                "__v": 0
            },
            {
                "status": true,
                "_id": "5de309bfc53b660f6965041f",
                "name": "buy dogs food",
                "description": "buy dogs food on nearby convenient store",
                "owner": "5de2aa28cbfb431841b3e22d",
                "due_date": "2019-12-01T00:30:55.241Z",
                "__v": 0
            },
            {
                "status": true,
                "_id": "5de3208464e227300a37a3c3",
                "name": "take dogs to vet",
                "description": "take dogs to vet to get vaccinate",
                "owner": "5de2aa28cbfb431841b3e22d",
                "due_date": "2019-12-01T02:08:04.507Z",
                "__v": 0
            }
        ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Your todo list is empty" }`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'get',
        url: `<base_url>/todo`
    })
    .done(result => console.log(result))
    .fail(err => console.log(err))
  ```

**Update Todo**
----
  Returns json data about modified column.

* **URL**

  /todo/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "n": 1,
        "nModified": 1,
        "ok": 1
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todo already deleted" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
        "message": "You are not an authorized owner."
    }`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'patch',
        url: `<baseURL>/todo/<id>`,
        data:
        {
            status: status
        },
        headers: {"access_token": localStorage.getItem('token')}
    })
    .done(result => console.log(result))
    .fail(err => console.log(err))
  ```

**Delete Todo**
----
  Returns json data about modified todo.

* **URL**

  /todo/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "n": 1,
        "nModified": 1,
        "ok": 1
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Todo already deleted" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
        "message": "You are not an authorized owner."
    }`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'delete',
        url: `<baseURL>/todo/<id>`,
        data:
        {
            status: status
        },
        headers: {"access_token": localStorage.getItem('token')}
    })
    .done(result => console.log(result))
    .fail(err => console.log(err))
  ```