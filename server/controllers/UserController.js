const { User } = require('../models')
const randomPassword = require('../helpers/randomPassword')
const { checkingPassword } = require('../helpers/bcyryptjs')
const { generateToken } = require('../helpers/jwt')


class UserController
{

    static test(req,res)
      {
          res.send('hello user connected')
      }


    static findAll(req,res,next)
      {
        User.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
      }


    static findOneByName(req,res,next)
      {
        const { username } = req.body
        User.find({
            username
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(next)
      }  


    static getUserId(req,res,next)
      {
        res.status(200).json(req.decoded)
      }

    static register(req,res,next)
      {
        const { username, email, password } = req.body

        User.create({
            username,
            email,
            password
        })
        .then(result=>{
            console.log('success to create')
            res.status(200).json(result)
        })
        .catch(next)
      }

      

    static googleSignIn(req,res,next)
      {
        // res.status(200).json(req.decoded)
        User.findOne({
          email:req.decoded.email
        })
        .then(result=>{
          if(result)
            {
              // kl ada result, generate token
              console.log(result)
              const access_token = generateToken({ userId: result.id})
              const userData = {
                userId: result.id,
                username: result.username,
                email: result.email
              }
              res.status(200).json({ userData, access_token })
            }
          else
            {
              // kl gkada result, create user => .then generate token
              return User.create({
                username: `${req.decoded.given_name} ${req.decoded.family_name || ''}`,
                email: req.decoded.email,
                password: randomPassword()
              })
              .then(result=>{
                console.log(result)
                const access_token = generateToken({ userId: result.id})
                const userData = {
                  userId: result.id,
                  username: result.username,
                  email: result.email
                }
      
                res.status(200).json({ userData, access_token })
              })
              .catch(next)
            }
        })
        
        .catch(next)
      }

    static login(req,res,next)
      {
        console.log(req.body)
        User.findOne({
          email:req.body.email
        })
        .then(result=>{
          if(result) // kalau username ketemu
            {
              // check password
              if( checkingPassword(req.body.password, result.password) )
                {
                  //kalau password bener, generate token
                  const access_token = generateToken({ userId:result.id })
                  const userData = {
                    userId: result.id,
                    username: result.username,
                    email: result.email
                  }

                  res.status(200).json( { userData, access_token} )
                }
              else
                {
                  throw ({
                    status: 404,
                    message: 'username & password combination is wrong'
                  })
                }
            }
          else // kalau username gkketemu
            {
              throw ({
                status: 404,
                message: "Username is not found"
              })
            }
        })
        .catch(next)
      }



    static patchUser(req,res,next)
      {
          
      }
    

    static putUser(req,res,next)
      {

      }


    static deleteUser(req,res,next)
      {

      }
}



module.exports = UserController