# fancy-todo

## USER REGISTER

- **URL's**

  ```javascript
  /users/register
  ```

  

- **URL Params**

  - Require     :  `none`

  - Optional   :  `none`

    

- **Data Params**

  - Require     :  `username: [string]`  ,  `email: [string]`  ,  `password: [string]`
  - Optional   :  `address: [string]`

  

- **Headers**

  - Require     :  `none`  

  

- **HTTP Method**

  `POST` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```





## USER LOGIN

- **URL's**

  ```javascript
  /users/login
  ```

  

- **URL Params**

  - Require     :  `none`

  - Optional   :  `none`

    

- **Data Params**

  - Require     :  `email: [string]`  ,  `password: [string]`

  - Optional   :  `address: [string]`

    

- **Headers**

  - Require     :  `none`  

    

- **HTTP Method**

  `POST` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```

  



## TODO CREATE

- **URL's**

  ```javascript
  /todos/
  ```

  

- **URL Params**

  - Require     :  `none`

  - Optional   :  `none`

    

- **Data Params**

  - Require     :  `title: [string]`  ,  `description: [string]` ,   `dueDate: [date]`
  - Optional   :  `none`

  

- **Headers**

  - Require     :  `user_key: [string]`  

  

- **HTTP Method**

  `POST` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```





## TODO READ

- **URL's**

  ```javascript
  /todos/
  ```

  

- **URL Params**

  - Require     :  `none`

  - Optional   :  `title: [string]`

    

- **Data Params**

  - Require     :  `none`
  - Optional   :  `none`

  

- **Headers**

  - Require     :  `user_key: [string]`  

    

- **HTTP Method**

  `GET` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```

  



## TODO UPDATE

- **URL's**

  ```javascript
  /todos/:id
  ```

  

- **URL Params**

  - Require     :  `id: [integer]` 

  - Optional   :  `none`

    

- **Data Params**

  - Require     :  `minimum one field`
  - Optional   :  `title: [string]`  ,  `description: [string]` ,   `dueDate: [date]`

  

- **Headers**

  - Require     :  `user_key: [string]`  

    

- **HTTP Method**

  `PATCH` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```





## TODO DELETE

- **URL's**

  ```javascript
  /todos/:id
  ```

  

- **URL Params**

  - Require     :  `id: [integer]`  

  - Optional   :  `none`

    

- **Data Params**

  - Require     :  `none`
  - Optional   :  `none`

  

- **Headers**

  - Require     :  `user_key: [string]`  

  

- **HTTP Method**

  `DELETE` 



- **Success Response**

  - Code		:

  - Content   : 

    ```json
    {
      
    }
    ```

  

- **Error Response**

  - Validation

    - Code		:

    - Content   : 

      ```javascript
      {
        "error" : ""
      }
      ```

      

- **Sample Call**

  ```javascript
  
  ```

  