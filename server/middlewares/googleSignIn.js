const {OAuth2Client} = require('google-auth-library');

function googleSignIn(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        req.decoded = payload
        next()
        }
        verify().catch(console.error);
}

module.exports = googleSignIn