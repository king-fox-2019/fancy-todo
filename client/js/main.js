$(document).ready(function(){

    isLogin()
    
    $('#dueDateTodo').val(formatDate(Date.now())) 

    $('#create-account').on('click', function(e) {
        e.preventDefault()
        $('#login').hide()
        $('#register').show()
    })
    $('#have-account').on('click', function(e) {
        e.preventDefault()
        $('#login').show()
        $('#register').hide()
    })

    // login
    $('#loginButton').on('click', function(e){
        event.preventDefault()
        getLogin()

    })

  // register
    $('#registerButton').on('click', function(e){
        event.preventDefault()
        getRegister()
    })

    // change modal mode
    $('#addTodoButton').on('click', function() {
        $('#saveTodo').attr('data-mode', 'add')
    })
    $('#todo-list').on('click', '.editTodo', function(e) {
        e.preventDefault()
        $('#addTodoButton').click()
        $('#saveTodo').attr('data-mode', 'edit')
        $('#saveTodo').attr('data-id', $(this).data('id'))
        
    })

    // update status
    $('#todo-list').on('change', '.todo-check', function(){ 
        
        if(this.checked) {
            updateTodoStatus(this.value, true) 
        } else {
            updateTodoStatus(this.value, false) 
        }

    });

    // add/edit todo
    $('#saveTodo').on('click', function(){
        
        if ($('#saveTodo').data('mode') === "edit") {
            const id = $('#saveTodo').data('id')
            const setValue =  {
                name: $('#nameTodo').val(), 
                description: $('#descriptionTodo').val(), 
                due_date: $('#dueDateTodo').val() 
            }
    
            $.ajax({
                method: 'patch',
                url: `${baseURL}/todo/${$('#saveTodo').data('id')}`,
                data: setValue,
                headers: {"access_token": localStorage.getItem('token')}
            })
                .done(result => {
                    getTodoList()
                    $('button.close').click()
                })
                .fail(err => console.log(err))

        } else {

            const setValue =  {
                name: $('#nameTodo').val(), 
                description: $('#descriptionTodo').val(), 
                due_date: $('#dueDateTodo').val() 
            }
    
            $.ajax({
                method: 'post',
                url: `${baseURL}/todo/`,
                data: setValue,
                headers: {"access_token": localStorage.getItem('token')}
            })
                .done(result => {
                    getTodoList()
                    $('button.close').click()
                })
                .fail(err => console.log(err))
        }
    })

    // delete todo
    $('#todo-list').on('click', '.deleteTodo', function(e){
        e.preventDefault()
        const id = $(this).data('id')

        Swal.fire({
        
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          
        }).then((result) => {
            
            if (result.value) {

                $.ajax({
                    method: 'delete',
                    url: `${baseURL}/todo/${id}`,
                    headers: {"access_token": localStorage.getItem('token')}
                })
                .done(result => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    getTodoList()
                })
                .fail(err => console.log(err))
                
            }

          })
    })

})