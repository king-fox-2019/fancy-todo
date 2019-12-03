# mongoose-crud

DEPLOY GCS
> [http://fancytodos.anggabanny.online/](http://fancytodos.anggabanny.online/)

# INTRODUCTION !
Sebelum memulai semuanya alangkah lebih baik jika menguji server terlebih dahulu silahkan akses `/`
untuk menguji bahwa server benar benar berjalan dengan baik, server akan mengirim 
```
"message":  "Connected To Server"
```
jika tidak maka kamu akan melihat error dengan status code `500` ``` CANNOT GET / ``` artinya ada yang tidak beres dengan server mu. mari lihat bagaimana cara mengatasinya [`disini`](#status-code)

#  ROUTES
## 1. User Router
|Method|USER|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|<i>Verify Google</i>|
|-|-|-|-|-|-|-|
|`GET`|`/user`|Get all Users| [ℹ️details](#user-route) | <p align="center">❌</p>|<p align="center">❌</p>|<p align="center">❌</p>
|`GET`|`/user/invitation`|View Invitation Project on User| [ℹ️details](#user-route) | <p align="center">✔️</p>|<p align="center">❌</p>|<p align="center">❌</p>
|`POST`|`/user/:idproject/invitation`|Accept Invitation Project on User| [ℹ️details](#user-route) |<p align="center">✔️</p>|<p align="center">❌</p>|<p align="center">❌</p>
|`POST`|`/user/signup`|Create User| [ℹ️details](#user-route) |<p align="center">❌</p>|<p align="center">❌</p>|<p align="center">❌</p>
|`POST`|`/user/signin`|Login User| [ℹ️details](#user-route) |<p align="center">❌</p>|<p align="center">❌</p>|<p align="center">❌</p>
|`POST`|`/user/signinGoogle`|Login With Google Signin| [ℹ️details](#user-route) |<p align="center">❌</p>|<p align="center">❌</p>|<p align="center">✔️</p>
|`DELETE`|`/user/:id`|Delete User| [ℹ️details](#user-route) |<p align="center">❌</p>|<p align="center">❌</p>|<p align="center">❌</p>


## 2. Todos Router
|Method|route|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-| 
|`GET`|`/todo`|Get all Todos| [ℹ️details](#todo-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`POST`|`/todo`|Create a Todo| [ℹ️details](#todo-route) |<p align="center">✔️</p>|<p align="center">❌</p>
|`POST`|`/todo/:id`|Create Todos on your Project| [ℹ️details](#todo-route) |<p align="center">✔️</p>|<p align="center">❌</p>
|`PUT`|`/todo/:id`|Update Todo with all parameters| [ℹ️details](#todo-route) |<p align="center">✔️</p>|<p align="center">✔️</p>
|`PATCH`|`/todo/:id`|Update Todo with status parameter| [ℹ️details](#todo-route) |<p align="center">✔️</p>|<p align="center">✔️</p>
|`DELETE`|`/todo/:id`|Delete Todo| [ℹ️details](#todo-route) |<p align="center">✔️</p>|<p align="center">✔️</p>



## 3. Project Router
|Method|route|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-| 
|`GET`|`/project`|Get All Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`GET`|`/project/members`|Find your status Member on Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`GET`|`/project/cancel/:id`|Cancel Invite Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`GET`|`/project/:id`|Get all Project With User Id| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`POST`|`/project`|Create Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`POST`|`/project/:id`|Invite User on Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">❌</p>
|`PUT`|`/project/:id`|Update Project With All Params| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">✔️</p>
|`PATCH`|`/project/:id`|Update Project With Name Params| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">✔️</p>
|`DELETE`|`/project/:id`|Delete Project| [ℹ️details](#project-route) | <p align="center">✔️</p>|<p align="center">✔️</p>

# INSTALLATION
### PACKAGE with NPM SERVER SIDE
> **npm install**
> [bcrypt]()

> [cors]()

> [express]()

> [google-auth-library]()

> [jsonwebtoken]()

> [mongoose]()

> npm install -D
> [dontenv]()

# DETAIL ROUTE
## USER ROUTE
### 1. [GET] /user/
	▶️ SUCCESS [Status 200 OK!]
		[
			{
				"bookmark":  [],
				"invitesProject":  [],
				"_id":"5dde3493878e853d02ce19f2",
				"email": EMAIL,
				"password": HASHING_PASSWORD
			},
		]

	▶️ FAILED [STATUS 404 NOT FOUND]
		⏩ ERROR :
			{
				"message":  "Invalid Input",
				"errors":  [
					"Not Found"
				]
			}
		⏩ SOLVE : please check your route is valid

	▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
		
### 2. [GET] /user/invitation
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"bookmark":  [],
				"invitesProject":  [],
				"_id":  "5de384cf5cfca851c476bef0",
				"name":  STRING,
				"email":  EMAIL,
				"password":  HASHING_PASSWORD
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 3. [GET] /user/:idproject/invitation
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"members":  [
					"5de384cf5cfca851c476bef0",
					"5de41fca533971570455fe16"
					],
				"_id":  "5de41fea533971570455fe17",
				"name": STRING,
				"owner":  "5de41fca533971570455fe16",
				"createdAt":  DATE,
				"updatedAt":  DATE
			}
		
		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 4. [POST] /user/signup
		▶️ BODY { name, email, password }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "create user successfuly",
				"name":  STRING
			}
		
		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
				{
					"message":  "Validation Error",
					"errors":  [
						"name is required",
						"Password Minimum Contain 4 Character",
						"email is Already Exist"
					]
				}
			⏩ SOLVE : fill all column input
		
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
		
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 5. [PUT] /user/signin
		▶️ BODY { email, password }
		▶️ SUCCESS [STATUS 200 OK!]
    		{
				"token": jwt_token,
				"name":  STRING
			}

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Email or Password Wrong!",
					"errors":  [
						"Email or Password Wrong!"
					]
				}	
			⏩ SOLVE : please check your email or password is valid		

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 6. [PATCH] /user/signinGoogle
		
		▶️ Documentation 
			```
			```
		▶️ SUCCESS [STATUS 200 OK!]
    		{
				"token": jwt_token,
				"name":  STRING
			}
		
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 6. [DELETE] /user/:id
		
		▶️ PARAMS { id }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"user":  {
					"bookmark":  [],
					"invitesProject":  [
						"5de40f2579c91f48d04da388"
					],
					"_id":  "5dde349a878e853d02ce19f3",
					"email":  EMAIL,
					"password":  HASHING_PASSWORD
				},
				"message":  "Delete Success"
			}

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection





## TODO ROUTE
### 1. [GET] /todo/
	▶️ SUCCESS [Status 200 OK!]
		{
		"todos":  [
			{
				"_id":  "5dde5532bbf1184e781f192d",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  {
					"bookmark":  [],
					"invitesProject":  [],
					"_id":  "5dde4facc29d364b68914f3b",
					"email":  EMAIL,
					"password":  HASH_PASSWORD
				},
				"createdAt":  "2019-11-27T10:51:30.418Z",
				"updatedAt":  "2019-12-01T19:18:25.179Z",
				"status":  BOOLEAN,
				"projectId":  "5de40f3479c91f48d04da389"
				}
			],
			"message":  "find successfuly!"
		}

	▶️ FAILED [STATUS 404 NOT FOUND]
		⏩ ERROR :
			{
				"message":  "Invalid Input",
				"errors":  [
					"Not Found"
				]
			}
		⏩ SOLVE : please check your route is valid

	▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
		
### 2. [POST] /todo/
		▶️ BODY {
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
			}
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"todo":  {
				"_id":  "5de6138c3639fd3b64388e01",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  "5dde4facc29d364b68914f3b",
				"createdAt":  "2019-12-03T07:49:32.858Z",
				"updatedAt":  "2019-12-03T07:49:32.858Z",
				"status":  BOOLEAN
			},
			"message":  "create successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required!",
					"description is required!",
					"due date is required!"
				]
			}
			⏩ SOLVE : fill all input because all input is required

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 3. [POST] /todo/:id
		▶️ PARAMS { id }
		▶️ BODY {
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
			}
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"todo":  {
				"_id":  "5de6138c3639fd3b64388e01",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  "5dde4facc29d364b68914f3b",
				"createdAt":  "2019-12-03T07:49:32.858Z",
				"updatedAt":  "2019-12-03T07:49:32.858Z",
				"status":  BOOLEAN
			},
			"message":  "create successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required!",
					"description is required!",
					"due date is required!"
				]
			}
			⏩ SOLVE : fill all input because all input is required

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 4. [PUT] /todo/:id
		▶️ PARAMS { id }
		▶️ BODY {
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
			}
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"todo":  {
				"_id":  "5de6138c3639fd3b64388e01",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  "5dde4facc29d364b68914f3b",
				"createdAt":  "2019-12-03T07:49:32.858Z",
				"updatedAt":  "2019-12-03T07:49:32.858Z",
				"status":  BOOLEAN
			},
			"message":  "update successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required!",
					"description is required!",
					"due date is required!"
				]
			}
			⏩ SOLVE : fill all input because all input is required
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 5. [PATCH] /todo/:id
		▶️ PARAMS { id }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"todo":  {
				"_id":  "5de6138c3639fd3b64388e01",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  "5dde4facc29d364b68914f3b",
				"createdAt":  "2019-12-03T07:49:32.858Z",
				"updatedAt":  "2019-12-03T07:49:32.858Z",
				"status":  BOOLEAN
			},
			"message":  "update successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 6. [DELETE] /todo/:id
		▶️ HEADERS { "token" : jwt_token }
		▶️ PARAMS { id }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"user":  {
					"bookmark":  [],
					"invitesProject":  [
						"5de40f2579c91f48d04da388"
					],
					"_id":  "5dde349a878e853d02ce19f3",
					"email":  EMAIL,
					"password":  HASHING_PASSWORD
				},
				"message":  "Delete Success"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection


## PROJECT ROUTE
### 1. [GET] /project/
	▶️ SUCCESS [Status 200 OK!]
		[
			{
			"members":  [],
			"_id":  "5de612c33639fd3b64388e00",
			"name":  STRING,
			"owner":  "5de41fca533971570455fe16",
			"createdAt":  "2019-12-03T07:46:11.514Z",
			"updatedAt":  "2019-12-03T07:46:11.514Z"
			},
			{
			"members":  [
				"5de384cf5cfca851c476bef0",
				"5de41fca533971570455fe16"
			],
			"_id":  "5de41fea533971570455fe17",
			"name":  STRING,
			"owner":  "5de41fca533971570455fe16",
			"createdAt":  "2019-12-01T20:17:46.190Z",
			"updatedAt":  "2019-12-02T01:15:00.634Z"
			}
		]

	▶️ FAILED [STATUS 404 NOT FOUND]
		⏩ ERROR :
			{
				"message":  "Invalid Input",
				"errors":  [
					"Not Found"
				]
			}
		⏩ SOLVE : please check your route is valid

	▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
		
### 2. [POST] /project/

		▶️ BODY {
				"name":  STRING,
			}
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"project":  {
				"members":  [],
				"_id":  "5de6235ca8ab8c43c17e6797",
				"name":  STRING,
				"owner":  "5de41fca533971570455fe16",
				"createdAt":  "2019-12-03T08:57:00.432Z",
				"updatedAt":  "2019-12-03T08:57:00.432Z"
			},
				"message":  "create project successfuly!"
			}

		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
			{
				"message":  "Validation Error",
				"errors":  [
					"name is Already Exist"
				]
			}
			⏩ SOLVE : fill all input because all input is required

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection


### 3. [GET] /project/members

		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
				"members":  [
					"5de384cf5cfca851c476bef0",
					"5de41fca533971570455fe16"
				],
					"_id":  "5de41fea533971570455fe17",
					"name":  STRING,
					"owner":  "5de41fca533971570455fe16",
					"createdAt":  "2019-12-01T20:17:46.190Z",
					"updatedAt":  "2019-12-02T01:15:00.634Z"
				}
			]

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 4. [GET] /project/cancel/:id
		▶️ PARAMS { id }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "success delete invitation"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection
			
### 5. [GET] /project/:id
		▶️ PARAMS { id }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"project":  {
				"members":  [
						"5de384cf5cfca851c476bef0",
						"5de41fca533971570455fe16"
					],
					"_id":  "5de41fea533971570455fe17",
					"name":  STRING,
					"owner":  "5de41fca533971570455fe16",
					"createdAt":  "2019-12-01T20:17:46.190Z",
					"updatedAt":  "2019-12-02T01:15:00.634Z"
				},
				"todos":  [
					{
						"_id":  "5de4512c2cf0e07c238940c8",
						"title":  STRING,
						"description":  STRING,
						"due_date":  DATE,
						"UserId":  {
						"bookmark":  [],
						"invitesProject":  [],
						"_id":  "5de384cf5cfca851c476bef0",
						"name":  STRING,
						"email":  EMAIL,
						"password": HASH_PASSWORD
					},
					"projectId":  {
						"members":  [
							"5de384cf5cfca851c476bef0",
							"5de41fca533971570455fe16"
						],
						"_id":  "5de41fea533971570455fe17",
						"name":  STRING,
						"owner":  "5de41fca533971570455fe16",
						"createdAt":  "2019-12-01T20:17:46.190Z",
						"updatedAt":  "2019-12-02T01:15:00.634Z"
					},
					"createdAt":  "2019-12-01T23:47:56.495Z",
					"updatedAt":  "2019-12-01T23:47:56.495Z",
					"status":  BOOLEAN
					},
				]
			}
			
		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 6. [POST] /project/:id
		▶️ PARAMS { id }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"result":  {
				"bookmark":  [],
				"invitesProject":  [
					"5de41fea533971570455fe17"
				],
				"_id":  "5de43a4bacba196fd8c553d3",
				"name":  STRING,
				"email":  EMAIL,
				"password":  HASH_PASSWORD
				},
				"message":  "invite member successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 7. [PUT] /project/:id
		▶️ PARAMS { id }
		▶️ BODY {
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
			}
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"todo":  {
				"_id":  "5de6138c3639fd3b64388e01",
				"title":  STRING,
				"description":  STRING,
				"due_date":  DATE,
				"UserId":  "5dde4facc29d364b68914f3b",
				"createdAt":  "2019-12-03T07:49:32.858Z",
				"updatedAt":  "2019-12-03T07:49:32.858Z",
				"status":  BOOLEAN
			},
			"message":  "update successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers

		▶️ FAILED [STATUS 400 BAD REQUEST]
			⏩ ERROR :
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required!",
					"description is required!",
					"due date is required!"
				]
			}
			⏩ SOLVE : fill all input because all input is required
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 8. [PATCH] /project/:id
		▶️ PARAMS { id }
		▶️ BODY { name }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"project":  {
				"n":  1,
				"nModified":  1,
				"ok":  1
			},
				"message":  "update successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection

### 9. [DELETE] /project/:id
		▶️ PARAMS { id }
		▶️ HEADERS { "token" : jwt_token }
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"project":  {
				"members":  [],
				"_id":  "5de622f3d0bf3e42cf9d2be9",
				"name":  STRING,
				"owner":  "5de41fca533971570455fe16",
				"createdAt":  "2019-12-03T08:55:15.162Z",
				"updatedAt":  "2019-12-03T08:55:15.162Z"
			},
				"message":  "delete project successfuly!"
			}

		▶️ FAILED [STATUS 401 Unauthorized]
			⏩ ERROR :
				{
					"message":  {
					"name":  "JsonWebTokenError",
					"message":  "jwt must be provided"
					},
				"errors":  [
						{
							"name":  "JsonWebTokenError",
							"message":  "jwt must be provided"
						}
					]
				}
			⏩ SOLVE : sign your jwt_token on your headers
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Id Not Found"
				}
			⏩ SOLVE : please check your params is valid

		▶️ FAILED [STATUS 404 NOT FOUND]
			⏩ ERROR :
				{
					"message":  "Invalid Input",
					"errors":  [
						"Not Found"
					]
				}
			⏩ SOLVE : please check your route is valid
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			⏩ ERROR :
				{
					"message":  "Internal Server Error",
				}
			⏩ SOLVE : please check your connection


# information
## STATUS CODE

| CODE |STATUS | DESCRIPTION | SOLVE HERE
|-|-|-|-|
|<p align="center"><i>**``200``**|SUCCESS|Ok|smile:)</i></p>
|<p align="center"><i>**``201``**|SUCCESS|Created| smile:)</i></p>
|<p align="center"><i>**``204``**|SUCCESS|No Content| smile:)</i></p>
|<p align="center"><i>**``400``**|CLIENT ERROR|Bad Request| [Here!](https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning) </i></p>
|<p align="center"><i>**``401``**|CLIENT ERROR|UnAuthorized| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>
|<p align="center"><i>**``403``**|CLIENT ERROR|Forbidden| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>
|<p align="center"><i>**``404``**|CLIENT ERROR|Not Found|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>
|<p align="center"><i>**``405``**|CLIENT ERROR|Not Allowed|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>
|<p align="center"><i>**``409``**|CLIENT ERROR|Conflict| [Here!](https://stackoverflow.com/questions/45063805/distinguishing-http-status-code-403-and-409-in-practice-or-400) </i></p>
|<p align="center"><i>**``500``**|SERVER ERROR|Internal Server Error| [Here!](https://stackoverflow.com/questions/1210380/500-internal-server-error) </i></p>

> silahkan kunjungi situs ini bila anda bingung apa itu [status code]([https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html](https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html))

<hr>

Created by [@anggabannny](https://github.com/anggabanny)
