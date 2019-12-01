const {User} = require('../models/modelUser');
const {createBCryptHash, compareBCrypthash} = require('../helpers/bCrypt');
const {createJWToken, verifyJWToken} = require('../helpers/jsonWebToken');

class ControllerUser {
    static viewUser(req, res) {
        User.find().then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    static createUser(req, res) {
        User.create({
            userName: req.body.userName,
            password: createBCryptHash(req.body.password)
        }).then(response => {
            res.status(200).json({message: "data successfuly saved"});
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    static login(req, res) {
        const errMessage = "User / password not found";
        User.findOne({
            userName: req.body.userName
        }).then(response => {
            if (response) {
                let isPasswordMatch = compareBCrypthash(req.body.password, response.password);
                if (isPasswordMatch) {
                    res.status(200).json(createJWToken(response._id));
                } else {
                    throw errMessage;
                }
            } else {
                throw errMessage;
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    };

}

module.exports = ControllerUser;