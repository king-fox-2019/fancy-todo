const jwt = require('../helpers/jwt.js');
const Todo = require('../models/Todo.js');

module.exports = (req, res, next) => {
	console.log('TodoAuthorization');
	console.log('req.params.id => ',req.params.id);

    const decoded = jwt.verify(req.headers.token)
    console.log('decoded => ',decoded);
    
    Todo.findOne({ _id: req.params.id })
        .populate('UserId')
        .then((foundUser) => {
            if (foundUser.UserId.email === decoded.email) next()
            else res.status(401).json({ type: 'Authorization Failed', message: 'Not Authorized !' })
        })
        .catch(next)
}