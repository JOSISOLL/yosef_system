const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Customer = require('../models/customer')
const mongoose = require('mongoose')
const db = "mongodb://root:root@ds135179.mlab.com:35179/ks_yosefdb"
const db2 = "mongodb://localhost:27017/ks_yosefdb"
const keypair = require('keypair')
const RSA_PRIVATE_KEY = "secret-key"
mongoose.connect(db2, err => {
    if(err){
        console.error('Error!' + err)
    }
    else{
        console.log('Connected to the database')
        // console.log(RSA_PRIVATE_KEY)
    }
})

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, RSA_PRIVATE_KEY)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()

}

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
            let token = jwt.sign(payload, RSA_PRIVATE_KEY)
            res.status(200).send({token})
        }

    })
})

router.post('/login', (req, res) => {
    console.log("attempting login...");
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
                let payload = { algorithm: 'RS256', subject: user._id }
                let token = jwt.sign(payload, RSA_PRIVATE_KEY)
                res.cookie("SESSIONID", token,{httpOnly: true, secure: true})
                // res.status(200).send({token})
                res.status(200).json({
                    idToken: token,
                    expiresIn: 43200
                })
            }
        }
    }

    })
})
router.get('/garage_history', verifyToken, (req, res) => {
    let history = [
        {
            "_id": "1",
            "client_name" : "Yoseph Solomon",
            "client_phone" : "123456789",
            "plate_number" : "123456"
        },
        {
            "_id": "2",
            "client_name" : "Josioooo",
            "client_phone" : "129016789",
            "plate_number" : "124563"
        },
        {
            "_id": "3",
            "client_name" : "Another Customer",
            "client_phone" : "854923789",
            "plate_number" : "566756"
        },
        {
            "_id": "4",
            "client_name" : "New Customer",
            "client_phone" : "348112323",
            "plate_number" : "384729"
        }
    ]
    res.json(history)
})
router.post('/garage/client/add', (req, res) => {
    let clientData = req.body; 
    console.log("attempting to add client ");
    res.status(200).send({"success" : true});

    // let client = Client(client);
    // console.log(clientData);
    // client.save((error, registerdUser) =>{
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         let payload = { subject: registerdUser._id }
    //         let token = jwt.sign(payload, RSA_PRIVATE_KEY)
    //         res.status(200).send({token})
    //     }

    // })
})
router.get('/clients_get',  (req, res) => {
    Customer.find(function (error, customers){
        if(error){
            console.log(error)
        } else {
            res.json(customers)
            console.log("Customer fetched from database")
        }
    })
    
    
})

router.post("/customer/add",  (req, res) => {
    let customerData = req.body; 
    console.log("attempting customer add...")

    let customer = new Customer(customerData)
    Customer.findOne({telMobile: customerData.telMobile}, (error, customer_get) => {
        if(error){
            console.log(error)
        } else{
            if(!customer_get){
                customer.save((error, addedCustomer) =>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        let add_status = "Customer added successfully"
                        res.status(200).send(addedCustomer)
                        console.log(add_status)
                    }
                })
            } else {
                res.status(401).send("Customer with this Mobile number already exists!")
            }
        }
    })
    

})
module.exports = router
