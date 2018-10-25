'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const hashPassword = require('../helpers/hashPassword')
const isEmail = require('../helpers/isEmail')

class UserController {
    // register user
    static registerUser(req,res) {
        
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash    
            })
            .then(user => {
                // get the token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err, token)=>{
                    if(!err){
                        res.status(201).json({
                            msg: 'Register Success',
                            token: token
                        })
                    } else {
                        res.status(500).json({
                            msg: 'ERROR REGISTER - GET TOKEN ', err
                        })
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'ERROR Register User ',err
                })
            })
        }else {
            res.status(500).json({
                msg: 'Please check your email'
            })
        }
    }

    // login user 
    static loginUser (req,res) {
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)
            User.findOne({
                email: req.body.email,
                password: hash    
            })
            .then(user => {
                // get the token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err, token)=>{
                    if(!err){
                        res.status(201).json({
                            msg: 'Login Success',
                            token: token
                        })
                    } else {
                        res.status(500).json({
                            msg: 'ERROR LOGIN - GET TOKEN ', err
                        })
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'ERROR Login User ',err
                })
            })
        }else {
            res.status(500).json({
                msg: 'Please check your email'
            })
        }
    }

    // get basic info
    static getBasicInfo (req,res) {
        res.status(200).json({
            msg: 'User basic info',
            userid: req.decoded.userid,
            name: req.decoded.name,
            email: req.decoded.email
        })
    }
}

module.exports = UserController