function register(name,email,password){
    event.preventDefault()
    $.ajax({
        method:"post",
        url:"http://localhost:3000/user/register",
        data:{name,email,password}
    })
    .done(()=>{
        $('.register').hide()
        $('.login').show()
    })
    .fail(err=>{
        console.log(err)
    })
}