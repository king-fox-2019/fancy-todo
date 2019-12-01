# Fancy Todo Documentation
**Fancy Todo** is a simple API that functions todo management in your life. Fancy Todo is designed by express, Mongoose, and other packages. If you use this API then run `npm install` to install everything you need.

## Base URL

Base URL of Fancy Todo is :

`http://localhost:<port>`

The port can be added to the .env file, we use port 3000 as the default.

## Register User

**Endpoint** : `/user/register`  

**Method** : `POST`  

**Request** :   

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    name    |  string   |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success 

  ```javascript
  {
      "token": <token : string>
  }
  ```

- Error

  1. ValidationError / ` 403`

     ```javascript
     {
         "errors": {
      ``       "email": {
                 "message": "Email is unavailable",
                 "name": "ValidatorError",
                 "properties": {
                     "msg": "Email is unavailable",
                     "message": "Email is unavailable",
                     "type": "user defined",
                     "path": "email",
                     "value": "user@mail.com"
                 },
                 "kind": "user defined",
                 "path": "email",
                 "value": "user@mail.com"
             }
         },
         "_message": "User validation failed",
         "message": "User validation failed: email: Email is unavailable",
         "name": "ValidationError"
     }
     ```



## Login User

**Endpoint** : `/user/login`  

**Method** : `POST`  

**Request** :   

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success 

  ```javascript
  {
      "token": <token : string>
  }
  ```

- Error

  1. User not found / `400`

     ```javascript
     {
         "message": "User not found"
     }
     ```

  2. Wrong Password / `400`

     ```javascript
     {
         "message": "Wrong password"
     }
     ```

     

## Create Todo

**Endpoint** : `/todos`  

**Method** : `POST`  

**Request** :   

- Data Parameters
	
| Parameters  | Data Type |
| :---------: | :-------: |
|    name     |  string   |
| description |  string   |
|   dueDate   |   date    |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

	- Success 
		
		```javascript
		{
		    "_id": "<todo id>",
			"name": "Flying",
			"description": "Flying like a bird",
			"status": "uncompleted",
			"dueDate": "2020-01-31T00:00:00.000Z",
			"UserId": "<user id>",
			"__v": 0
		}
		```
		
	- Error
	
	  1. JsonWebTokenError / 401
	
	     ```javascript
	     {
	         "name": "JsonWebTokenError",
	         "message": "jwt must be provided"
	     }
	     ```
	
	  2. ValidationError / 403
	
	     ```javascript
	     {
	         "errors": {
	             "name": {
	                 "message": "Name cannot be empty",
	                 "name": "ValidatorError",
	                 "properties": {
	                     "message": "Name cannot be empty",
	                     "type": "required",
	                     "path": "name"
	                 },
	                 "kind": "required",
	                 "path": "name"
	             }
	         },
	         "_message": "Todo validation failed",
	         "message": "Todo validation failed: name: Name cannot be empty",
	         "name": "ValidationError"
	     }
	     ```
	
	

## Read Todo

**Endpoint** : `/todos`  

**Method** : `GET`  

**Request** :   

- Query Parameters

|              Parameters              | Data Type |
| :----------------------------------: | :-------: |
| any key according to the table field |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success 

    ```javascript
    [
        {
            "_id": "<todo id>",
            "name": "Flying",
            "description": "Flying like a bird",
            "status": "uncompleted",
            "dueDate": "2020-01-31T00:00:00.000Z",
            "UserId": "<user id>",
            "__v": 0
        }
    ]
    ```

    *if todo does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / 401

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

  

## Update Todo

**Endpoint** : `/todos/:id`  

**Method** : `PUT`  

**Request** :   

- Url Parameters

|  Parameters  | Data Type |
| :----------: | :-------: |
| id (todo id) |  string   |

- Data Parameters

| Parameters  | Data Type |
| :---------: | :-------: |
|    name     |  string   |
| description |  string   |
|   status    |  string   |
|   dueDate   |   date    |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success 

    ```javascript
    {
        "_id": "<todo id>",
        "name": "Dive",
        "description": "Dive like a rock",
        "status": "uncompleted",
        "dueDate": "2020-01-31T00:00:00.000Z",
        "UserId": "<user id>",
        "__v": 0
    }
    ```

  - Error

    1. JsonWebTokenError / 401

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

       

## Delete Todo

**Endpoint** : `/todos/:id`  

**Method** : `DELETE`  

**Request** :   

- Url Parameters

|  Parameters  | Data Type |
| :----------: | :-------: |
| id (todo id) |  string   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success 

    ```javascript
    {
        "lastErrorObject": {
            "n": 1
        },
        "value": {
            "_id": "<todo id>",
            "name": "Dive",
            "description": "Dive like a rock",
            "status": "uncompleted",
            "dueDate": "2020-01-31T00:00:00.000Z",
            "UserId": "<user id>",
            "__v": 0
        },
        "ok": 1
    }
    ```

  - Error

    1. JsonWebTokenError / 401

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

    2. Todo not found / 404

       ```javascript
       {
           "Name": "NotFound",
           "Message": "Error not found"
       }
       ```

       