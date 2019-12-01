$(document).ready(function() {

   if(localStorage.getItem('access_token') !== null) {
      pullTodoList()
      $('#front').hide()
      $('#todo-main').show()
   }
})
   

const host = 'http://localhost:3000'

$('#signin-tab').click(function() {

   $('#signup-tab').removeClass('tab-selected')
   this.classList.add('tab-selected')
})

$('#signup-tab').click(function() {
   
   $('#signin-tab').removeClass('tab-selected')
   this.classList.add('tab-selected')
})

$('#signIn-submit').click(function() {

   event.preventDefault()

   const formType = $('#sign-tab .tab-selected').text()
   let url

   if(formType == 'Sign In') url = `${host}/user/login`
   else url = `${host}/user/register`
   
   $.ajax({
      method: 'post',
      url,
      data: {email: $('#input-email').val(), password: $('#input-password').val()}
   })
   .done(data => {
      if(data.message) {
         $('#signin-tab').addClass('tab-selected')
         $('#signup-tab').removeClass('tab-selected')
      }
      else {
         localStorage.setItem('access_token', data.access_token)
         $('#front').hide()
         $('#todo-main').show()
      }
   })
})

function pullTodoList() {
   
   if(localStorage.getItem('access_token') !== null) {
      $.ajax({
         url: `${host}/todo`,
         headers: {
            access_token: `${localStorage.getItem('access_token')}`
         },
         method: 'get'
      })
      .done(todos => {
         
         $('.todo-list-items').empty()

         todos.forEach((todo) => {

            $('.todo-box').data('todoId', todo._id)
            
            $('.todo-list-items').append(`
            <div class="todo-box">
               <h3>${todo.name}</h3>
               <p>${todo.description}</p>
               <div class="todo-box-foot">
                  <span class="todo-box-foot-status">Status: (<a href="">${todo.status == false ? "in progress" : "done"}</a>)</span>

                  <a href="" class="todo-box-foot-edit">Edit</a>

                  <span class="todo-box-foot-due${new Date() > todo.due_date ? " error-color" : ""}">Due date: ${typeof todo.due_date != "undefined" ? todo.due_date.toString().split('T')[0] : "Not set"}</span>
               </div>
            </div>
            `)
         })
      })
      .fail(error => console.error(error))
   }
}

$('#todo-control-box-form-submit').click(function() {

   event.preventDefault()

   let method
   let url = `${host}/todo`

   if($('#todoId').val() != '') {
      method = 'patch'
      url += `/${$('#todoId').val()}`
   }
   else method = 'post'

   $.ajax({
      url,
      method,
      data: {
         name: $('#todo-control-box-form-name').val(),
         description: $('#todo-control-box-form-description').val(),
         due_date: $('#todo-control-box-form-due').val()
      },
      headers: {access_token: localStorage.getItem('access_token')}
   })
   .done(() => {
      pullTodoList()
   })
   .fail(error => console.error(error))
})

// $('#todo-control-box-form-name').val('hehe')

$('.todo-box-foot-edit').click(function() {

   event.preventDefault()

   // $('#todoId').val(this.)
})