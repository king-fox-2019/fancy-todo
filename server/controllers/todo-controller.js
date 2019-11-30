class TodoController {
  static getAllTodos (request, response, next) {
    response.json({ data: 'all todos' })
  }

  static createTodo (request, response, next) {
    const { title, description } = request.body

    response.status(201).json({ message: 'success create todo' })
  }

  static putTodo (request, response, next) {
    const { title, description } = request.body
    const { todoId } = request.params

    response.status(200).json({ message: `will update todo with id ${todoId}` })
  }

  static patchTodo (request, response, next) {
    const { title, description } = request.body
    const { todoId } = request.params

    response.status(200).json({ message: `will update todo with id ${todoId}` })
  }

  static deleteTodo (request, response, next) {
    const { todoId } = request.params
    
    response.status(200).json({ message: `will delete todo with id ${todoId}` })
  }
}


module.exports = TodoController
