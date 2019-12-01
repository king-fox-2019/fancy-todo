require('dotenv').config()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `afifahrahmak.app@gmail.com`,
    pass: `${process.env.PASSWORDEMAIL} `,
  }
});

function sendMail(to, text, user, project) {
  let mailOptions = {
    from: "afifahrahmak.app@gmail.com",
    to: to,
    subject: 'New Project Invitation',
    text: text,
    html: `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
        <link
            href="https://cdn.rawgit.com/mdehoog/Semantic-UI/6e6d051d47b598ebab05857545f242caf2b4b48c/dist/semantic.min.css"
            rel="stylesheet" type="text/css" />
        <title>Document</title>
        <style>
          
            body {
                background-image: url("https://i.pinimg.com/564x/1d/66/55/1d66553e380ed1eece11d432225d23c8.jpg");
                background-size: contain;
                background-position: center;
                background-color: rgb(55, 55, 55);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .content-nonblur {
                margin: 5px;
                font-style: none;
                font-size: 20px;
                font-weight: 900;
                letter-spacing: 0.16em;
                text-align: center;
                border-top: 3px solid rgb(241, 206, 3);
                border-bottom: 3px solid rgb(241, 206, 3);
                width: 150px;
                background-color: rgba(255, 255, 255, 0.993);
            }
        </style>
    </head>

    <body>
        <h1 class="content-nonblur">JOYLIST</h1>
        <p style="word-wrap:break-word;">${text}</p>
    </body>

    </html>
    
    `
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

    } else {
      console.log(info.response);

    }
  })
}

module.exports = sendMail