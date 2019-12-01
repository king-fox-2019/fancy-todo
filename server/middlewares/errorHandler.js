module.exports = (err, req, res, next)=>{
    console.log(`
    ERROR HAPPENED!!!!!!!!!!!!!!!
    =============================
    ${err}
    `)

    
    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 400
            let arr = []
            for (const key in err.errors)
              {
                arr.push(err.errors[key].message)
              }
            message = arr
            break;

        case 'JsonWebTokenError':
            status = 401
            message = err.message
            break;
    
        case 'MongoError':
            if(err.code === 11000)
              {
                  status = 409
                  if(err.keyPattern.username)
                      message = 'username has been used'  
                  else if (err.keyPattern.email)
                      message = 'email has been used'
                  else 
                      message = err.msg  
              }
            break;

        default:
            status = 500
            message = err.message ||  err.msg || 'INTERNAL SERVER ERROR'
            break;
    }

    
    res
    .status(status)
    .json(
      {
        code: status,
        message
      })



}