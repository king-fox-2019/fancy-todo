const nodemailer = require('nodemailer')

function sendEmail(email,task,description,dueDate){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
            user: 'fancytodoapp@gmail.com',
            pass: 'F@ncyTodo123'
        }
    })

    var mailOptions = {
        from: 'fancytodoapp@gmail.com',
        to: email,
        subject: 'Your new task',
        text: `Hi , this is your new task!
               Name: ${task}
               Description: ${description}
               Due Date: ${dueDate}
               Thank You`,
        html: `Hi , this is your new task!<br>
               Name: ${task}<br>
               Description: ${description}<br>
               Due Date: ${dueDate}<br><br><br>
               Thank You`
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log('Email sent: '+ info.response)
        }
    })
}

module.exports = sendEmail