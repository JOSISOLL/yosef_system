const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Customer = require('../models/customer')
const Suplier = require('../models/suplier');
const Repair = require('../models/repair')
const mongoose = require('mongoose')
const db = "mongodb://root:root@ds135179.mlab.com:35179/ks_yosefdb"
const db2 = "mongodb://localhost:27017/ks_yosefdb"
const keypair = require('keypair')
const RSA_PRIVATE_KEY = "secret-key"
const Purchase = require('../models/parts')
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
router.get('/repair', verifyToken, (req, res) => {
    console.log("attempting to fetch repairs data list...")
    Repair.find(function (error, repairs){
        if(error){
            console.log(error)
        } else {
            res.json(repairs)
            console.log("Repairs list fetched from database")
        }
    })
})
router.post('/garage/client/add', (req, res) => {
    let clientData = req.body; 
    console.log("attempting to add client ");
    res.status(200).send({"success" : true});

})
router.put('/garage/client/update', (req, res) => {
    let clientData = req.body; 
    console.log("client_id  " + clientData.id);
    Customer.findByIdAndUpdate(clientData.id, 
        {
            name: clientData.name, 
            email: clientData.email, 
            telMobile: clientData.telMobile, 
            telHome: clientData.telHome, 
            telWork: clientData.telWork, 
            address: clientData.address
        }, {new: true}, function(err, model){
            console.log("update executed...");
            console.log(model);

        });
    // let result = Customer.findByIdAndUpdate(o_id, 
    //     {
    //         name: clientData.name, 
    //         email: clientData.email, 
    //         telMobile: clientData.telMobile, 
    //         telHome: clientData.telHome, 
    //         telWork: clientData.telWork, 
    //         address: clientData.address
    //     }); 
    // console.log("attempting to edit client");
    // console.log(clientData);
    // console.log("result"); 
    // console.log(result);
    res.status(200).send({"success": true}); 
});
// TODO: send the appropriate response code if the requested record is not found!
router.delete('/garage/client/delete/:id', (req, res) => {
    console.log("id: " + req.params.id);
    Customer.findByIdAndRemove(req.params.id, function(err, res){
        res.status(200).send({status: true}); 
    });
    //res.status(404).send({status: false, response: "REQUESTED RECORD NOT FOUND!"});
});
router.get('/clients_get',  (req, res) => {
    Customer.find(function (error, customers){
        if(error){
            console.log(error)
        } else {
            res.json(customers)
            console.log("Customer fetched from database")
        }
    }); 
});
router.post("/customer/add", verifyToken, (req, res) => {
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
router.post("/suplier/add",  (req, res) => {
    let suplierData = req.body; 
    console.log("attempting customer add new suplier...")
    let suplier = new Suplier(suplierData)
    Suplier.findOne({phone: suplierData.phone}, (error, suplier_get) => {
        if(error){
            console.log(error)
        } else{
            if(!suplier_get){
                suplier.save((error, addedSuplier) =>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        let add_status = "Suplier added successfully";
                        res.status(200).send(addedSuplier);
                        console.log(add_status);
                    }
                })
            } else {
                res.status(401).send("Suplier with this Mobile number already exists!")
            }
        }
    });
    

})

router.get("/supliers", (req, res)=>{
    Suplier.find(function (error, supliers){
        if(error){
            console.log(error)
        } else {
            res.json(supliers)
            console.log("supliers fetched from database")
        }
    })
});


router.post("/repair/add", verifyToken, (req, res) => {
        let repairData = req.body
    let repair = new Repair(repairData)
    repair.save((error, addedRepair) =>{
        if(error){
            console.log(error)
        }
        else{
            res.status(200).send(addedRepair)
        }

    })
}); 
router.put('/repair/update', (req, res) => {
    console.log("attempting to update repair");
    let repairData = req.body; 
    console.log("client_id  " + repairData.id);
    Repair.findByIdAndUpdate(repairData.id, 
        {
            customer: repairData.customer, 
            plateNumber: repairData.plateNumber, 
            reportedProblem: repairData.reportedProblem, 
            carType: repairData.carType, 
            remark: repairData.remark, 
            personInCharge: repairData.personInCharge, 
            date: repairData.date
        }, {new: true}, function(err, model){
            console.log("update executed...");
            console.log(model);
        });
    // let result = Customer.findByIdAndUpdate(o_id, 
    //     {
    //         name: clientData.name, 
    //         email: clientData.email, 
    //         telMobile: clientData.telMobile, 
    //         telHome: clientData.telHome, 
    //         telWork: clientData.telWork, 
    //         address: clientData.address
    //     }); 
    // console.log("attempting to edit client");
    // console.log(clientData);
    // console.log("result"); 
    // console.log(result);
    res.status(200).send({"success": true}); 

});
router.delete('/repair/delete/:id', (req, res) => {

    Repair.findByIdAndRemove(req.params.id, function(err, res){
        res.status(200).send({status: true}); 
    });

}); 
    
router.post("/parts/purchase", verifyToken, (req, res) => {
    let purchaseData = req.body
    let purchase = new Purchase(purchaseData)
    purchase.save((error, partPurchased) =>{
        if(error){
        console.log(error)
        } else {
            res.status(200).send(partPurchased)
        }
    })
})

router.get("/purchases", (req, res)=>{
    Purchase.find(function (error, purchases){
        if(error){
            console.log(error)
        } else {
            res.json(purchases)
            console.log("purchases fetched from database")
        }
    })
});



module.exports = router
