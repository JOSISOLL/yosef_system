const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://root:root@ds135179.mlab.com:35179/ks_yosefdb"
const db2 = "mongodb://localhost:27017/ks_yosefdb"

mongoose.connect(db2, err => {
    if(err){
        console.error('Error!' + err)
    }
    else{
        console.log('Connected to the database')
    }
})

router.get('/', (req, res) => {

    res.send('From API route')
})
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registerdUser) =>{
        if(error){
            console.log(error)
        }
        else{
            let payload = { subject: registerdUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }

    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
     }else{
        if(!user){
            res.status(401).send('Invalid Email')
        } else {
            if(user.password !== userData.password){
                res.status(401).send('Invalid Password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    }

    })
})
router.get('/garage_history', (req, res) => {
    let history = [
        {
            "_id": "1",
            "client_name" : "Yoseph Solomon",
            "client_phone" : "123456789",
            "plate_number" : "123456"
        },
        {
            "_id": "2",
            "client_name" : "Yoseph Solomon",
            "client_phone" : "123456789",
            "plate_number" : "123456"
        },
        {
            "_id": "3",
            "client_name" : "Yoseph Solomon",
            "client_phone" : "123456789",
            "plate_number" : "123456"
        },
        {
            "_id": "4",
            "client_name" : "Yoseph Solomon",
            "client_phone" : "123456789",
            "plate_number" : "123456"
        }
    ]
    res.json(history)
})
module.exports = router