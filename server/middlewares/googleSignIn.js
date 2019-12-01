const {OAuth2Client} = require('google-auth-library');

function googleSignIn(req,res,next){
    const client = new OAuth2Client("988198646150-rgj76pn8fvilqbcb8pkfgldos3o6ckp3.apps.googleusercontent.com");
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.id_token,
            audience: "988198646150-rgj76pn8fvilqbcb8pkfgldos3o6ckp3.apps.googleusercontent.com"
        });
        const payload = ticket.getPayload();
        req.decoded = payload
        next()
        }
        verify().catch(console.error);
}

module.exports = googleSignIn