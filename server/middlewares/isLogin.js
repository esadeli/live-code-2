'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')

function isLogin(req,res,next){
    jwt.verify(req.headers.token, process.env.SECRETTOKEN, (err,decoded)=>{
        if(!err){
            let decodedobj = decoded
            // check the user
            User.findOne({
                _id: decodedobj.userid
            })
              .then(user => {
                if(user) {
                    req.decoded = decodedobj
                    next()
                } else {
                    res.status(400).json({
                        msg: 'User not found - isLogin ERROR'
                    })  
                }
              })
              .catch(err => {
                  res.status(500).json({
                      msg: 'ERROR islogin ', err
                  })
              })

        } else {
            res.status(403).json({
                msg: 'User should login first'
            })
        }
    })
}

module.exports = isLogin