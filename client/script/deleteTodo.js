function deleteTodo(event,id){
    event.preventDefault()
    $.ajax({
        method:"delete",
        url:`http://localhost:3000/todo`,
        data:{id}
    })
    .done(()=>{
        $(`.${id}`).remove()
        location.reload()
    })
    .fail(err=>{
        console.log(err)
        $('#authorizationError').empty()
        $('#authorizationError').append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">You are not authorized</div>
        `)
        setTimeout(() => {
            $('#authorizationError').hide()
        }, 1500);
    })
}