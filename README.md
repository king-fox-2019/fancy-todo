# Fancy-Todo

## By : Edwin Satya Yudistira

### build with Express, Mongoose, Jquery, HTML5, CSS3

## Routes

development baseUrl: http://localhost:3000,
production basaeUrl:

### List of basic routes:

|        Routes |  HTTP  |                                          Description |                                                         STATUS |
| ------------: | :----: | ---------------------------------------------------: | -------------------------------------------------------------: |
|        /todos |  GET   |                               Get all the todos info |                    200 [ok] - 401[need-auth] / 500[server-bad] |
|    /todos/:id |  GET   |                                Get one the todo info |                    200 [ok] - 401[need-auth] / 500[server-bad] |
|        /todos |  POST  |                                      Create New Todo |                    201 [ok] - 401[need-auth] / 500[server-bad] |
|    /todos/:id | DELETE |                                          Delete todo | 200 [ok] - 400[bad-request] / 401[need-auth] / 500[bad-server] |
|    /todos/:id | PATCH  |                                   Update status todo |  200[ok] - 400[bad-request] / 401[need-auth] / 500[bad-server] |
|    /todos/:id |  PUT   |                                 Update all data todo |  200[ok] - 400[bad-request] / 401[need-auth] / 500[bad-server] |
| /users/signup |  POST  |                           Sign up with new user info |                  201 [ok] - 400[bad-request] / 500[server-bad] |
| /users/signin |  POST  | Sign in and get an access token based on credentials |                    200 [ok] - 404[not-found] / 500[server-bad] |

Bellows are routes that used in the sever app.js

- Base routes TODOS url : http://localhost:3000/todos or

  - GET : /

    - Description : get all todo info
    - Headers : JWt Token
    - Body : none
    - Params : none
    - Respone :

      - Success :
        Status Code : 200

            ```
            {
                "_id": "5dde4c4c04826b440112c706",
                "name": "maen yugi",
                "description": "maen kartu teruss",
                "due": "2019-03-11T00:00:00.000Z",
                "user": "5dde37e0f1721428b1697910",
                "createdAt": "2019-11-27T10:13:32.523Z",
                "updatedAt": "2019-11-27T10:13:32.523Z",
                "status": false
            }

            ```

      - Error :
        Status Code : 401

              ```
              {"message" : "you must login first"}
              ```

              status code : 500

              ```
              {
                  "message" : "Internal Server Error"
              }
              ```

  - GET : /:id

    - Description : get one todo info
    - Headers : JWt Token
    - Params : id (todo)
    - Body : none
    - Respone :

      - Success :
        Status Code : 200

                ```
                {
                    "response": {
                        "_id": "5dde4c4c04826b440112c706",
                        "name": "maen yugi",
                        "description": "maen kartu teruss",
                        "due": "2019-03-11T00:00:00.000Z",
                        "user": "5dde37e0f1721428b1697910",
                        "createdAt": "2019-11-27T10:13:32.523Z",
                        "updatedAt": "2019-11-27T10:13:32.523Z",
                        "status": false
                    }
                }

                ```

      - Error :
        Status Code : 401

                ```
                {"message" : "you must login first"}
                ```

                ```
                {"message" : "Unauthorized User"}
                ```

                status code : 500

                ```
                {"message" : "Internal Server Error"}
                ```

  - POST : /

    - Description : create new todo
    - Headers : JWt Token
    - Params : none
    - Body :
      ```
        {
            name: String
            Description: String
            Due: Date
        }
      ```
    - Respone :

      - Success :
        Status Code : 201

                ```
                {
                  "response": {
                      "_id": "5ddf1bc7c8b9cb5a29cc4805",
                      "name": "piket",
                      "description": "semangat",
                      "due": "2019-03-11T00:00:00.000Z",
                      "user": "5ddf186174daf257693b17a3",
                      "createdAt": "2019-11-28T00:58:47.468Z",
                      "updatedAt": "2019-11-28T00:58:47.468Z",
                      "status": false
                  },
                  "message": "success add new todo"
                }

                ```

      - Error :
        Status Code : 401

        ```
        {"message" : "you must login first"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

  - DELETE : /:id

    - Description : Delete todo
    - Headers : JWt Token
    - Params : id (todo)
    - Body : none
    - Respone :

      - Success :
        Status Code : 200

                ```
                {
                  "response": {
                      "n": 1,
                      "ok": 1,
                      "deletedCount": 1
                  },
                  "message": "success delete todo"
                }

                ```

      - Error :
        Status Code : 401

        ```
        {"message" : "you must login first"}
        ```

        ```
        {"message" : "not authorization"}
        ```

        Status Code : 404

        ```
        {"message" : "Object not found"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

  - PUT : /:id

    - Description : Update all data todo
    - Headers : JWt Token
    - Params : id (todo)
    - Body : data want update
      ```
        {
            name: String,
            description: String,
            status: Boolean,
            due: Date
        }
      ```
    - Respone :

      - Success :
        Status Code : 200

                ```
                {
                  "response": {
                      "_id": "5ddf1bbec8b9cb5a29cc4804",
                      "name": "makan",
                      "description": "makan ayam tulang lunak",
                      "due": "2019-11-28T00:00:00.000Z",
                      "user": "5dde37e0f1721428b1697910",
                      "createdAt": "2019-11-28T00:58:38.711Z",
                      "updatedAt": "2019-11-28T02:33:59.725Z",
                      "status": false
                  },
                  "message": "success update data todo"
                }

                ```

      - Error :
        Status Code : 401

        ```
        {"message" : "you must login first"}
        ```

        ```
        {"message" : "not authorization"}
        ```

        Status Code : 404

        ```
        {"message" : "todo not found"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

  - PATCH : /:id

    - Description : Update status data todo
    - Headers : JWt Token
    - Params : id (todo)
    - Body : data want update
      ```
        {
            status: Boolean
        }
      ```
    - Respone :

      - Success :
        Status Code : 200

                ```
                {
                  "response": {
                      "_id": "5ddf1bbec8b9cb5a29cc4804",
                      "name": "piket",
                      "description": "semangat",
                      "due": "2019-03-11T00:00:00.000Z",
                      "user": "5dde37e0f1721428b1697910",
                      "createdAt": "2019-11-28T00:58:38.711Z",
                      "updatedAt": "2019-11-28T02:28:19.552Z",
                      "status": true
                  },
                  "message": "success update data"
                }

                ```

      - Error :
        Status Code : 401

        ```
        {"message" : "you must login first"}
        ```

        ```
        {"message" : "not authorization"}
        ```

        Status Code : 404

        ```
        {"message" : "todo not found"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

- Base routes USERS url : http://localhost:3000/users or

  - POST : /signup

    - Description : Signup / Register user
    - Headers : none
    - Params : none
    - Body : input data user
      ```
        {
            name: String
            email: String
            password: String
        }
      ```
    - Respone :

      - Success :
        Status Code : 201

                ```
                {
                  "user": {
                      "id": 7,
                      "name": "kirito",
                      "email": "kirito22@gmail.com",
                      "password": "$2a$10$OLQoKYLmCeVGzhWxVDAM9.ZFY156U.tyXkpB26fT8Dm89OAJ/hmR6",
                      "updatedAt": "2019-11-25T13:55:19.303Z",
                      "createdAt": "2019-11-25T13:55:19.303Z"
                  },
                  "message": "success signup"
                }

                ```

      - Error :
        Status Code : 400

        ```
        {"message" : "Email Not Valid"}
        ```

        ```
        {"message" : "email already exists"}
        ```

        ```
        {"message" : "Password min 6 characters"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

  - POST : /signin

    - Description : Signin / Login user
    - Headers : none
    - Params : none
    - Body : input data user
      ```
        {
            email: String
            password: String
        }
      ```
    - Respone :

      - Success :
        Status Code : 200

                ```
                {
                   "token":        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJraXJpdG9AZ21haWwuY29tIiwiaWF0IjoxNTc0NjkwMzI1 fQ.4KdlZRXPeSeerryuQKSXWxpvlsrVyrRw4AZYy-c-XuQ",
                   "message": "success signin"
                }

                ```

      - Error :
        Status Code : 400

        ```
        {"message" : "username / password is wrong!"}
        ```

        status code : 500

        ```
        {
            "message" : "Internal Server Error"
        }
        ```

## Usage:

```
With only npm:

back-end side :

- npm install
- setting env
- npm run dev

-> In config go setting your database

front-end side :

- live-server --host=localhost
```

## Deploy in :

```


```
