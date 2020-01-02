# fancy-todo

## Installation Package

```
$ npm install
```

# Client server available
```
http://localhost:5500
http://localhost:5501
http://localhost:8080
```

# Routes User

## Register

```
POST : http://localhost:3000/user/register
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String
 * @name String
 * @password String
 */
```
Response
```
/**
 * @success status(201) data(email, name)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Login

```
POST : http://localhost:3000/user/login
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String
 * @password String
 */
```
Response
```
/**
 * @success status(200) data(access_token, id)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Google Sign in

```
POST : http://localhost:3000/user/googlesign
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @token google-id-token
 */
```
Response
```
/**
 * @success status(200) data(access_token, id)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Search user

```
GET : http://localhost:3000/user/
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | NO                   |

Body
```
/**
 * @name String
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(user) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## get one user

```
GET : http://localhost:3000/user/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | NO                   |

Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(user) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
# Routes Todo
## User's todo

```
GET : http://localhost:3000/todo/:user_id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(todo) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add todo

```
POST : http://localhost:3000/todo/:user_id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @title String
 * @description String
 * @dueDate Date
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(201) data( obj(todo) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Delete todo

```
DELETE : http://localhost:3000/todo/:user_id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @id String
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(todo) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Update todo

```
PUT : http://localhost:3000/todo/:user_id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @id String
 * @title String
 * @description String
 * @dueDate Date
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(todo) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Check todo

```
PATCH : http://localhost:3000/todo/:user_id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @id String
 * @status Boolean
 */
```
Headers
```
/**
 * @token access_token
 */
```
Response
```
/**
 * @success status(200) data( obj(todo) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
