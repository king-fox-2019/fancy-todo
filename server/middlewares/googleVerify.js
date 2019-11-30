const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function googleVerify(req,res,next){
    client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
        const payload = ticket.getPayload()
        req.user = payload
        next()
    })
    .catch(err => {
        next(err)
    })
}


module.exports = googleVerify;