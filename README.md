# (Not So) Fancy Todo
## Getting Started
1. Git clone this repo
2. Install the dependency
3. Make `.env` file
4. Run the application  
```bash
npm install
npm run dev
```  

## Setting up .env file
There is `.env-template` that you can use as your guide on how to fill
the environment for the app.  
By default `.env` file is ignored by git, so you didnt need to worry
if you pass your credential on `.env` file.  
```bash
PORT=<your port>
JWT_SECRET=<for generate jsonwebtoken>
CLIENT_ID=<your google client id>
```

## Routes
There is two routes on the app
1. `User routes`
2. `Todo routes`

#### User routes
`POST /user/register`  
| Authenticate | Authorized |
|--------------|------------|
| No           | No         |

###### Params
1. `username`: type `String` `required`
2. `email`: type `String` `required`
3. `password`: type `String` `required`

###### Response
```javascript
// errors
{
    "errors": [
        "Invalid email format",
        "Password is required",
        "Username already registered"
    ]
}
```
```javascript
// success
{
    "message": "success create new user"
}
```
---
`POST /user/login`  
| Authenticate | Authorized |
|--------------|------------|
| No           | No         |

###### Params
1. `email`: type `String` `required`
2. `password`: type `String` `required`

###### Response
```javascript
// errors
{
    "error": "Email or Password wrong"
}
```
```javascript
// success
{
    "access_token": "<access token>"
}
```
---
`POST /user/googleLogin`  
| Authenticate | Authorized |
|--------------|------------|
| No           | No         |

###### Params
1. `google_token`: type `String` `required`

###### Response
```javascript
// errors
{
    "error": "Invalid Google token"
}
```
```javascript
// success
{
    "access_token": "<access token>"
}
```
---

#### Todo routes
`GET /todo/`  
| Authenticate | Authorized |
|--------------|------------|
| Yes          | No         |

###### Params
1. `access_token`: type `String` `required`

###### Response
```javascript
// errors
{
    "message": "Invalid access_token"
}
```
```javascript
// success
[
    {
        "_id": "<todo id>",
        "title": "<todo title",
        "description": "<todo description",
        "owner": "<owner id>",
        "__v": 0
    },
    {
        "_id": "<todo id>",
        "title": "<todo title",
        "description": "<todo description",
        "owner": "<owner id>",
        "__v": 0
    },
    {
      ...
    }
]
```
---
`POST /todo/`  
| Authenticate | Authorized |
|--------------|------------|
| Yes          | No         |

###### Params
1. `access_token`: type `String` `required`

###### Body request
1. `title`: type `String` `required`
2. `description`: type `String`

###### Response
```javascript
// errors
{
    "errors": [
        "Title todo is required"
    ]
}
```
```javascript
// success
{
    "message": "success create new todo"
}
```
---
`PUT /todo/<todo id>`  
| Authenticate | Authorized |
|--------------|------------|
| Yes          | Yes        |

###### Params
1. `access_token`: type `String` `required`

###### Body request
1. `title`: type `String`
2. `description`: type `String`

###### Response
```javascript
// errors
{
    "message": "you are not authorized to doing this"
}
```
```javascript
// success
{
    "message": "success update todo"
}
```
---
`PATCH /todo/<todo id>`  
| Authenticate | Authorized |
|--------------|------------|
| Yes          | Yes        |

###### Params
1. `access_token`: type `String` `required`

###### Body request
1. `title`: type `String`
2. `description`: type `String`

###### Response
```javascript
// errors
{
    "message": "you are not authorized to doing this"
}
```
```javascript
// success
{
    "message": "success update todo"
}
```
---
`DELETE /todo/<todo id>`  
| Authenticate | Authorized |
|--------------|------------|
| Yes          | Yes        |

###### Params
1. `access_token`: type `String` `required`

###### Body request
1. `title`: type `String`
2. `description`: type `String`

###### Response
```javascript
// errors
{
    "message": "you are not authorized to doing this"
}
```
```javascript
// success
{
    "message": "success delete todo"
}
```
