# Vrello

Simple web app to manage private todo list and project todo list.

Fitur:

1. CRUD private's todo
2. Create project
3. Read project (member only)
4. Update and delete project (admin only)
5. Add project's todo (member only)
6. Invite member
7. Accept or decline project's invitation
8. Left projet
9. Edit profile
10. Terminate Account

 Here's the documentation:

## User

- **/users/signup**

| Method | Header | Params | Data                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br>password: `string` <br> |

| Success Response                          | Error Response                                               |
| ----------------------------------------- | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{ newUser `} | Status: `400` <br> Content: `{"error": ["name is required","name already registered" "email is required", " invalid email format", "email already registered", "password required", "min 6 char"]}` |


- **/users/signin**

| Method | Header | Params | Data            |
| ------ | ------ | ------ | --------------- |
| `POST` | `none` | `none` | token: `string` |

| Success Response                       | Error Response                                               |
| -------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ token}` | Status: `400` <br> Content: `{"error": ["identity required","password required", "invalid email/password"]}` |


- **/users/google/signin**

  | Method | Header                            | Params | Data            |
  | ------ | --------------------------------- | ------ | --------------- |
  | `POST` | Google `id_token`,`name`, `email` | `none` | token: `string` |

  | Success Response                      | Error Response                                               |
  | ------------------------------------- | ------------------------------------------------------------ |
  | Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

  ## Todos

- **/todos**

| Method | Header  | Params | Data                                                     |
| ------ | ------- | ------ | -------------------------------------------------------- |
| `POST` | `token` | `none` | title:`string`<br>description:`string`<br>dueDate:`Date` |

| Success Response                         | Error Response                                               |
| ---------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{newTodos}` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/todos**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                       | Error Response                                               |
| -------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{todo}]` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/todos/:todoId**

| Method | Header  | Params | Data                                   |
| ------ | ------- | ------ | -------------------------------------- |
| `PUT`  | `token` | `none` | title:`string`<br>description:`string` |

| Success Response                                | Error Response                                               |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedUserData}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/todos/status/:todoId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                                | Error Response                                               |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedUserData}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/todos/:todoId**

| Method   | Header  | Params | Data   |
| -------- | ------- | ------ | ------ |
| `DELETE` | `token` | `none` | `none` |

| Success Response                        | Error Response                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

## Project

- **/projects**

| Method | Header  | Params | Data                                       |
| ------ | ------- | ------ | ------------------------------------------ |
| `POST` | `token` | `none` | title:`string`<br>description:`string`<br> |

| Success Response                           | Error Response                                               |
| ------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{newProject}` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                          | Error Response                                               |
| ----------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{project}]` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/:projetId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedProject}` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/:projectId**

| Method   | Header  | Params | Data   |
| -------- | ------- | ------ | ------ |
| `DELETE` | `token` | `none` | `none` |

| Success Response                        | Error Response                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/approve/projectId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedProject}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/decline/:projectId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedProject}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/left/:projectId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedProject}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/todo/:projectId**

| Method | Header  | Params | Data                                                     |
| ------ | ------- | ------ | -------------------------------------------------------- |
| `POST` | `token` | `none` | title:`string`<br>description:`string`<br>dueDate:`Date` |

| Success Response                         | Error Response                                               |
| ---------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{newTodos}` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/project/todos/:projectId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                       | Error Response                                               |
| -------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{todo}]` | Status: `400` <br> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/todos/:projectId/:todoId**

| Method | Header  | Params | Data                                   |
| ------ | ------- | ------ | -------------------------------------- |
| `PUT`  | `token` | `none` | title:`string`<br>description:`string` |

| Success Response                                | Error Response                                               |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedUserData}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/status/:projectId/:todoId**

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `PUT`  | `token` | `none` | `none` |

| Success Response                                | Error Response                                               |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{updatedUserData}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

- **/projects/:projectId/:todoId**

| Method   | Header  | Params | Data   |
| -------- | ------- | ------ | ------ |
| `DELETE` | `token` | `none` | `none` |

| Success Response                        | Error Response                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message}` | Status: `400` <br/> Content: `{"error": ["JwtToken must be provided]"}` |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 

