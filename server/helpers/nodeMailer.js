'use strict';

const nodemailer = require('nodemailer');

function mailSender(email){
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'doclocdevandre@gmail.com',
            pass: 'doclochacktiv8'
        }
    })
    
    let message = {
        from: 'doclocapp@gmail.com',
        to: email,
        subject: 'You Have Been Invited to Collaborate on a Project!',
        text: 'You are invited to join a project on your Lavish Todo app. Check it out by logging in to your web app, we are looking forward to see your action. See you there ✨'
    }
    
    
    transport.sendMail(message, (err, info)=>{
    })

}

module.exports = mailSender