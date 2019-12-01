# fancy-todo

An application that will help you to create notes for things that you want to do

## 1. User

#### a. User Register

- **Endpoint**

  ```http
  POST /user/register
  ```

- **Body**

  username : String **(Required)**

  email : String **(Required)**

  password: String **(Required)**

- **Response**

  ```javascript
  {
    "_id": "5de3942fcc4a6f260c379709",
    "username": "hendy1",
    "email": "hendy1@hendy1.com",
    "password": "$2a$05$D6U4Rs/GYxBXQ05o1c3HPO/0M6q8.UHISijWRCgaFcSC4a.xm7Ezq",
    "__v": 0
  }   
  ```

- **Error**

  - Error Duplicate Username 
  
    ```javascript

    {
    "code": 409,
    "message": "username has been used"
    }
    ```

  - Error Duplicate Email

    ```javascript
    {
    "code": 409,
    "message": "email has been used"
    }
    ```



## 1. Todo

#### a. Find all Todo by id

- **Endpoint**

  ```http
  GET /todo/findall/:userId
  ```

- **Response**

  ```javascript
  [
    {
        "_id": "5de3e9710b87e48f98aea4cf",
        "UserId": {
            "username": "hendy1",
            "email": "hendy1@hendy1.com",
            "password": "$2a$05$D6U4Rs/GYxBXQ05o1c3HPO/0M6q8.UHISijWRCgaFcSC4a.xm7Ezq"
        },
        "name": "lalal",
        "description": "alallas\nfaasf",
        "status": false,
        "due_date": "2019-12-20T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "5de3ebcc0b87e48f98aea4d0",
        "UserId": {
            "username": "hendy1",
            "email": "hendy1@hendy1.com",
            "password": "$2a$05$D6U4Rs/GYxBXQ05o1c3HPO/0M6q8.UHISijWRCgaFcSC4a.xm7Ezq"
        },
        "name": "sdgsdgdsg",
        "description": "sdgsdgsd",
        "status": false,
        "due_date": "2020-01-04T00:00:00.000Z",
        "__v": 0
    }
  ]  
  ```

#### B. Create Todo

- **Endpoint**

  ```http
  POST /todo/createtodo/:userId
  ```

- **Body**

  name : String **(Required)**

  description : String **(Required)**

  status: Boolean || false **(Required)** 

  due_date: Date **(Required)**

- **Response**

  ```javascript
  {
    "_id": "5de3f16d0b87e48f98aea4dc",
    "UserId": "5de296d9c914b748883f48bc",
    "name": "create1",
    "description": "description1",
    "status": false,
    "due_date": "2019-12-11T17:00:00.000Z",
    "__v": 0
  }
  ```