# JOY-LIST
​
base url : [https://localhost:PORT]
### documentation

#### App Requirements
------
Dependencies : Express.js as framework, mongoose (database), and another driver with npm need to be installed : 

- axios
- bcrypt
- cors
- express
- google-auth-library
- jsonwebtoken
- mongoose
- morgan
- nodemailer
​
```bash
npm install express mongoose bcrypt jsonwebtoken cors morgan google-auth-library nodemailer
```
​
### ROUTE LIST
------
#### 1.Register User
​
Register a new user to database and generate its hash password using *bcrypt*, requires email and password input value.
​
* **Method:**
    `POST` 

* **URL**
    <_/user/register_>

* **Data Params** <br />
    **Required:**

    `name=[string]` <br />
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
        {
            "_id": "5dbf463e66d4901e33f7891",
            "email": "user@mail.com",
            "password": "$2a$10$8cEP6gHdxjU7aZimMA8xvhbjkXq40htC6ikfpUHOdPsPWVg8IFHpzG",
            "name": "user",
            "createdAt": "2019-11-02T21:40:26.087Z",
            "dueDate": "2019-11-02T21:40:26.087Z",
            "__v": 0
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
      **Content:**
      ``` json
        {
            "message": [
                "Please enter your email address.",
                "Please enter a valid email address.",
                "Please enter your password.",
                "Email already registered."
            ]
        }
  * **Code:** 500 Internal Server Error<br />
        **Content:**
    ```json
        {
            "message": "Internal Server Error"
        }
    ```

​
#### 2. Sign in User
​
Log in an user, and generate token using *jsonwebtoken* requires email and password input value. On authentication verification, if email and password are correct then token will be generated, else an error 403 will occured:
​
​
* **Method:**
    `POST` 

* **URL**
    <_/user/login_>

* **Data Params** <br />
    **Required:**

    `email=[string]` <br />
    `password=[string]` <br />
* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZGkiLCJpZCI6MiwiaWF0IjoxNTY5ODQ2MTA1fQ.hfM1k0OktYgyEea2mKWWcvGKPlGngcUsO9oHObeUw8k",
          "name": "user"
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
      **Content:**
      ``` json
        {
            "message": "Invalid email or password."
        }
  * **Code:** 500 Internal Server Error<br />
        **Content:**
    ```json
        {
            "message": "Internal Server Error"
        }
    ```
#### Google Sign In

* **Method:**
    `POST` 

* **URL**
    <_/user/login_>

* **Data Params** <br />
    **Required:**

    `email=[string]` <br />
    `password=[string]` <br />
* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZGkiLCJpZCI6MiwiaWF0IjoxNTY5ODQ2MTA1fQ.hfM1k0OktYgyEea2mKWWcvGKPlGngcUsO9oHObeUw8k",
          "name": "user"
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
      **Content:**
      ``` json
        {
            "message": "Invalid email or password."
        }
  * **Code:** 500 Internal Server Error<br />
        **Content:**
    ```json
        {
            "message": "Internal Server Error"
        }
    ```

#### 3. *GET* All User Todos 
​
Return all todo which created by Logged-User data from database in array of object format :
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| title       | title of todo                            |
| description | description of todo                      |
| dueDate     | due date todo                            |
| createdAt   | time when data was created               |
| updatedAt   | time when data was updated (last update) |
| UserId      | foreign key of User._id                  |
| ProjectId   | foreign key of Project._id               |


* **Method:**
    `GET` 

* **URL**
    <_/todo_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```javascript
        [
            {
                "_id":"5dbf34e09da365145d36755c",
                "title":"todo 1",
                "description":"description 1",
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "dueDate":"2019-10-28T05:29:10.826Z",
                "status":false,
                "__v":0
            },
            {
                "_id": "5dbf34e09da365112376755c",
                "title": "todo 2",
                "description": "description 2",
                "status": true,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:29:10.826Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "dueDate": "2019-10-28T05:29:10.826Z"
            }
        ]
        or
        {
            "message": "You don't have any task."
        }
        ```
        
* **Error Response:**
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
​
#### 4. *GET* User Task
​
```javascript
app.get('/todo/:id')
```
Return task from database by its id => params ( :id) in object format :
​
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| title       | title of todo                            |
| description | description of todo                      |
| createdAt   | time when data was created               |
| updatedAt   | time when data was updated (last update) |
| UserId      | foreign key of user id                   |
​
and if params.id did not match any data in database, this call will return an error status 404 and error message.

* **Method:**
    `GET` 

* **URL**
    <_/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "_id":"5dbf34e09da365145d36755c",
            "title":"todo",
            "description":"description todo",
            "UserId":"5dbf17b458a59d8400e66b2b",
            "ProjectId":"5dbf17b46987789hh9890bge",
            "createdAt":"2019-11-03T20:13:20.750Z",
            "updatedAt": "2019-11-02T21:40:26.087Z",
            "dueDate":"2019-11-02T21:40:26.087Z",
            "status":false,
            "__v":0
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 5. *CREATE* a Task
​
```javascript
app.post('/todo')
```
​
requires input value, for example from request body (raw/html). 
​
input format : 
​
| key         | datatype | value declaration                           |
| ----------- | -------- | ------------------------------------------- |
| title       | STRING   | req.body.title                              |
| description | STRING   | req.body.description                        |
| due Date    | DATE     | req.body.dueDate                            |
| UserId      | INTEGER  | req.loggedUser.id //generated by token data |
| ProjectId   | INTEGER  | req.params.id //generated by params data    |
​
this call will return object that containing value form request body
​
* **Method:**
    `POST` 

* **URL**
    <_/todo_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `title=[string]` <br />
    `dueDate=[date]` <br />
    `description=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "_id": "5dbf34e09da365145d36755c",
            "title": "First title",
            "description": "First description",
            "status": false,
            "UserId":"5dbf17b458a59d8400e66b2b",
            "ProjectId":"5dbf17b46987789hh9890bge",
            "createdAt":"2019-11-03T20:13:20.750Z",
            "updatedAt": "2019-11-02T21:40:26.087Z",
            "dueDate":"2019-11-02T21:40:26.087Z",
        }
        ```
* **Error Response:**
  * **Code:** 404 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": "Input cannot be empty."
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 6. *DELETE* User Task
​
```javascript
app.delete('/todo/:id')
```
Delete task from database by its id => params ( :id) and return a message if it belongs to user logged in (checked through authorization process, else this call will return an error)
​​
and if params.id did not match any data in database, this call will return an error status 404 and error message

* **Method:**
    `DELETE` 

* **URL**
    <_/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "message": "Success Delete"
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 7. *UPDATE* single Task (one or all Fields)
​
this call will update specify field/fields from database by its id => params ( :id) and return an array containing amount of updated row [1] if it belongs to user logged in (checked through authorization process, else this call will return an error). require only title or description (can be both) to be updated and will ignore others, and if params.id did not match any data in database, this call will return an error status 404 with an error message.
​
* **Method:**
    `PATCH` 

* **URL**
    <_/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `title=[string]` <br />
    `dueDate=[date]` <br />
    `description=[string]` <br />
    `status=[boolean]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
              "todo": {
                    "_id": "5dbf34e09da365145d36755c",
                    "title": "First title",
                    "description": "First description",
                    "status": true,
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "ProjectId":"5dbf17b46987789hh9890bge",
                    "createdAt":"2019-11-03T20:13:20.750Z",
                    "updatedAt": "2019-11-02T21:40:26.087Z",
                    "dueDate":"2019-11-02T21:40:26.087Z",
              },
              "message": "Success Update"
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": {
          "title cannot be empty"
          "description cannot be empty"
          "invalid date input"
        }
    }
    ```
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```

#### 8. *GET* All Projects projects 
​
Return all project based on Logged-User in array of object format :
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| name        | name of project                          |
| description | description of project                   |
| creator     | foreign key of User._id                  |
| members     | foreign key of User(s)._id(s)            |
| updatedAt   | time when data was updated (last update) |

* **Method:**
    `GET` 

* **URL**
    <_/project_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```javascript
        [
            {
                "_id":"5dbf34e09da365145d36755c",
                "name":"project 1",
                "description":"description 1",
                "creator":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "members":[],
                "__v":0
            },
            {
                "_id": "5dbf34e09da365112376755c",
                "title": "project 2",
                "description": "description 2",
                "description":"description 1",
                "creator":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "members":[],
                "__v":0
            }
        ]
        or
        {
            "message": "You don't have any project."
        }
        ```
        
* **Error Response:**
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
​
#### 9. *GET* one Project
​
```javascript
app.get('/project/:projectId')
```
Return project from database by its id => params ( :projectId) in object format :
​
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| name        | name of project                          |
| description | description of project                   |
| creator     | foreign key of User._id                  |
| members     | foreign key of User(s)._id(s)            |
| updatedAt   | time when data was updated (last update) |

​
and if params.id did not match any data in database, this call will return an error status 404 and error message.

* **Method:**
    `GET` 

* **URL**
    <_/project/:projectId_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
                "_id": "5dbf34e09da365112376755c",
                "title": "project 2",
                "description": "description 2",
                "description":"description 1",
                "creator":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "members":[],
                "__v":0
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 10. *CREATE* a project
​
```javascript
app.post('/project')
```
​
requires input value, for example from request body (raw/html). 
​
input format : 
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| name        | name of project                          |
| description | description of project                   |
| creator     | foreign key of User._id                  |
| members     | foreign key of User(s)._id(s)            |
| updatedAt   | time when data was updated (last update) |
​
this call will return object that containing value form request body
​
* **Method:**
    `POST` 

* **URL**
    <_/project_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `name=[string]` <br />
    `members=[array]` <br />
    `description=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
                "_id": "5dbf34e09da365112376755c",
                "title": "project 2",
                "description": "description 2",
                "creator":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "members":[
                    "5dbf17b458a59d8400e66b2b",
                    "5dbf17b458a59d8400e66b2b"
                    ],
                "__v":0
        }
        ```
* **Error Response:**
  * **Code:** 404 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": "Input cannot be empty."
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 11. *DELETE* User project
​
```javascript
app.delete('/project/:projectId')
```
Delete project from database by its id => params ( :projectId) and return a message if it belongs to creator project (user logged in) in (checked through authorization process, else this call will return an error)
​​
and if params.id did not match any data in database, this call will return an error status 404 and error message

* **Method:**
    `DELETE` 

* **URL**
    <_/project/:projectId_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "message": "Success Delete"
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 12. *UPDATE* add member to project
​
this call will update specify field/fields from database by its id => params ( :projectId) and return an array containing amount of updated row [1] if it belongs to creator project (user logged in)(checked through authorization process, else this call will return an error). if params.id did not match any data in database, this call will return an error status 404 with an error message.
​
* **Method:**
    `PATCH` 

* **URL**
    <_/project/invite/:projectId_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `email=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
              "project": {
                    "_id": "5dbf34e09da365112376755c",
                    "title": "project 2",
                    "description": "description 2",
                    "creator":"5dbf17b458a59d8400e66b2b",
                    "createdAt":"2019-11-03T20:13:20.750Z",
                    "updatedAt": "2019-11-02T21:40:26.087Z",
                    "members":[
                        "5dbf17b458a59d8400e66b2b",
                        "5dbf17b458a59d8400e66b2b"
                        "5dbf17b458a59d8400e66b2b"
                        ],
                    "__v":0
              },
              "message": "success invite user to join project"
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": {
          "user already a member" or "user has been invited"
        }
    }
    ```
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```

    #### 13. *GET* All Project Todos 
​
Return all todo which created by Logged-User data from database in array of object format :
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| title       | title of todo                            |
| description | description of todo                      |
| dueDate     | due date todo                            |
| createdAt   | time when data was created               |
| updatedAt   | time when data was updated (last update) |
| UserId      | foreign key of User._id                  |
| ProjectId   | foreign key of Project._id               |


* **Method:**
    `GET` 

* **URL**
    <_/project/todo_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```javascript
        [
            {
                "_id":"5dbf34e09da365145d36755c",
                "title":"todo 1",
                "description":"description 1",
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt":"2019-11-03T20:13:20.750Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "dueDate":"2019-10-28T05:29:10.826Z",
                "status":false,
                "__v":0
            },
            {
                "_id": "5dbf34e09da365112376755c",
                "title": "todo 2",
                "description": "description 2",
                "status": true,
                "UserId":"5dbf17b458a59d8400e66b2b",
                "createdAt": "2019-10-28T05:29:10.826Z",
                "updatedAt": "2019-11-02T21:40:26.087Z",
                "dueDate": "2019-10-28T05:29:10.826Z"
            }
        ]
        or
        {
            "message": "You don't have any task."
        }
        ```
        
* **Error Response:**
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
​
#### 14. *GET* Project Task
​
```javascript
app.get('/project/todo/:id')
```
Return task from database by its id => params ( :id) in object format :
​
| key         | value                                    |
| ----------- | ---------------------------------------- |
| id          | auto increment data primary key          |
| title       | title of todo                            |
| description | description of todo                      |
| createdAt   | time when data was created               |
| updatedAt   | time when data was updated (last update) |
| UserId      | foreign key of user id                   |
| ProjectId   | foreign key of Project id                |
​
and if params.id did not match any data in database, this call will return an error status 404 and error message.

* **Method:**
    `GET` 

* **URL**
    <_/project/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "_id":"5dbf34e09da365145d36755c",
            "title":"todo",
            "description":"description todo",
            "UserId":"5dbf17b458a59d8400e66b2b",
            "ProjectId":"5dbf17b46987789hh9890bge",
            "createdAt":"2019-11-03T20:13:20.750Z",
            "updatedAt": "2019-11-02T21:40:26.087Z",
            "dueDate":"2019-11-02T21:40:26.087Z",
            "status":false,
            "__v":0
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 15. *CREATE* a Task Project
​
```javascript
app.post('/project/todo')
```
​
requires input value, for example from request body (raw/html). 
​
input format : 
​
| key         | datatype | value declaration                           |
| ----------- | -------- | ------------------------------------------- |
| title       | STRING   | req.body.title                              |
| description | STRING   | req.body.description                        |
| due Date    | DATE     | req.body.dueDate                            |
| UserId      | INTEGER  | req.loggedUser.id //generated by token data |
| ProjectId   | INTEGER  | req.params.id //generated by params data    |
​
this call will return object that containing value form request body
​
* **Method:**
    `POST` 

* **URL**
    <_/project/todo_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `title=[string]` <br />
    `dueDate=[date]` <br />
    `description=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "_id": "5dbf34e09da365145d36755c",
            "title": "First title",
            "description": "First description",
            "status": false,
            "UserId":"5dbf17b458a59d8400e66b2b",
            "ProjectId":"5dbf17b46987789hh9890bge",
            "createdAt":"2019-11-03T20:13:20.750Z",
            "updatedAt": "2019-11-02T21:40:26.087Z",
            "dueDate":"2019-11-02T21:40:26.087Z",
        }
        ```
* **Error Response:**
  * **Code:** 404 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": "Input cannot be empty."
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 16. *DELETE* Task project
​
```javascript
app.delete('/project/todo/:id')
```
Delete task from database by its id => params ( :id) and return a message if it belongs to user logged in (checked through authorization process, else this call will return an error)
​​
and if params.id did not match any data in database, this call will return an error status 404 and error message

* **Method:**
    `DELETE` 

* **URL**
    <_/project/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    none

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
            "message": "Success Delete"
        }
        ```
* **Error Response:**
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```
​
#### 17. *UPDATE* single Task (one or all Fields)
​
this call will update specify field/fields from database by its id => params ( :id) and return an array containing amount of updated row [1] if it belongs to user logged in (checked through authorization process, else this call will return an error). require only title or description (can be both) to be updated and will ignore others, and if params.id did not match any data in database, this call will return an error status 404 with an error message.
​
* **Method:**
    `PATCH` 

* **URL**
    <_/project/todo/:id_>

* **Headers** <br />
    `token=[string]`

* **Data Params** <br />
    `title=[string]` <br />
    `dueDate=[date]` <br />
    `description=[string]` <br />
    `status=[boolean]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
        {
              "todo": {
                    "_id": "5dbf34e09da365145d36755c",
                    "title": "First title",
                    "description": "First description",
                    "status": true,
                    "UserId":"5dbf17b458a59d8400e66b2b",
                    "ProjectId":"5dbf17b46987789hh9890bge",
                    "createdAt":"2019-11-03T20:13:20.750Z",
                    "updatedAt": "2019-11-02T21:40:26.087Z",
                    "dueDate":"2019-11-02T21:40:26.087Z",
              },
              "message": "Success Update"
        }
        ```
* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** <br />
    ```json
    {
        "message": {
          "title cannot be empty"
          "description cannot be empty"
          "invalid date input"
        }
    }
    ```
  * **Code:** 404 Not Found <br />
    **Content:** <br />
    ```json
    {
        "message": "not found"
    }
    ```
  * **Code:** 401 Authentication Failed <br />
    **Content:** <br />
    ```json
    {
        "message": [
          "you have to login first",
          "invalid token"
          ]
    }
    ```
    * **Code:** 403 Forbidden <br />
    **Content:** <br />
    ```json
    {
        "message": "Not Authorized"
    }
    ```