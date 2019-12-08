function getAllTodo() {
  console.log(localStorage.getItem('userId'))
  $.ajax({
    method: "get",
    url: "http://localhost:3000/todo"
  })
    .done(result => {
      for (let i = 0; i < result.length; i++) {
        let id = result[i]._id;
        if(result[i].status===false && result[i].userId===localStorage.getItem('userId')){
          $('#listTodo').append(`
          <div onclick='showDetail(event,\"${id}\")' class="${id}" id="singleTodo">
          <h4>${result[i].name}</h4>
          </div> 
              `);
        }else if(result[i].status===true && result[i].userId===localStorage.getItem('userId')){
          $('#finishedTodo').append(`
          <div onclick='showDetail(event,\"${id}\")' class="${id}" id="singleTodo">
          <h4>${result[i].name}</h4>
          </div> 
              `);
        }
      }
    })
    .fail(error => {
      console.log(error);
    });
}