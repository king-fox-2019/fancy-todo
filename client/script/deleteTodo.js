function deleteTodo(event,id){
    let token = localStorage.getItem('token')
    event.preventDefault()
    $.ajax({
        method:"delete",
        url:`http://35.186.155.74/todo`,
        data:{id},
        header:{token}
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