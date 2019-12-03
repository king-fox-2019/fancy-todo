const nodemailer = require('nodemailer')
module.exports = (email,pesan) =>{
    console.log(email);
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fancytodo.mail@gmail.com',
            pass: 'angga007'
        }
    });

    const mailOptions = {
        from: 'fancytodo.mail@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: 'Invitation in project', // Subject line
        text: `${pesan}`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err);
            console.log('gagal kirim')
        }
        else {
            console.log('berhasil kirim!');
        }
    });
}