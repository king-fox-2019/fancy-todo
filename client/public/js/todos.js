
function getAllTodos(){
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {token: localStorage.getItem('token')}
  })
  .done(todos => {
    console.log(todos)
  })
  .fail(err => {
    console.log(err)
  })
}