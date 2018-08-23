const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Imports = require('../models/import')
const User = require('../models/user')
const Customer = require('../models/customer')
const Suplier = require('../models/suplier');
const Repair = require('../models/repair')
const Parts = require('../models/parts')
const Sell = require('../models/sell') 
const mongoose = require('mongoose')
const db = "mongodb://root:root@ds135179.mlab.com:35179/ks_yosefdb"
const db2 = "mongodb://localhost:27017/ks_yosefdb"
const keypair = require('keypair')
const RSA_PRIVATE_KEY = "secret-key"
const Purchase = require('../models/purchase')
const api_imp = require('./api_imp');
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
    Customer.findOneAndRemove({_id : req.params.id}, function (err,data){
        if(err){
            console.log(err)
        } else {
            if(!data){
                status = "Customer not found."
                res.status(401).send({status: status})

            }else{
                console.log(data)
                console.log("Customer data successfully deleted.")
                res.status(200).send({status : true})
            }
            
        }
    } )
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
router.post("/import/add", (req, res) =>{
    let importFData = req.body;
    console.log("Attempting to add new imports...")
    let imports = new Imports(importFData)
    imports.save((error, newImport) =>{
        if(error){
            console.log(error)
        } else {
            res.status(200).send(newImport)
        }
    })
})
router.get("/imports", (req,res)=>{
    Imports.find(function (error, imports){
        if(error){
            console.log(error)
        } else {
            res.jsonp(imports)
            console.log("Imports fetched from database")
        }
    })
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
    res.status(200).send({"success": true}); 
});
// TODO: set the appropriate response code for unknown record.
router.delete('/repair/delete/:id', (req, res) => {
    console.log("id: " + req.params.id);
    console.log("Attemptin to delete repair data.")
    Repair.findOneAndRemove({_id : req.params.id}, function (err,data){
        if(err){
            console.log(err)
        } else {
            if(!data){
                status = "This repair doesn't exist in the stock."
                res.status(401).send({status: status})

            }else{
                console.log(data)
                console.log("Repair data successfully deleted.")
                res.status(200).send({status : true})
            }
            
        }
    } )
});

router.post("/parts/purchase", (req, res) => {
    let purchaseData = req.body;
    console.log("Attempting to add purchase data");
    console.log(purchaseData);
    let purchase = new Purchase(purchaseData)
    // res.status(200).send("Works fine");
    purchase.save((error, purchasedData) =>{
        if(error){
            // res.json({status: 500, error: err});
            console.log(error)
        } else {
            res.status(200).send(purchasedData)
        }
    })
})
router.post("/parts/sell", (req, res) =>{
    let sellData = req.body;
    var parts = [];
    if (!sellData) {
        res.status(400).send('Invalid request body.');
    } else{
    console.log("Attempting to sell parts.");
    
    for(var i = 0; i < req.body.parts.length;i++){
        // console.log(req.body.parts[i].quantity);
        let soldQty = req.body.parts[i].quantity;
        let sellPart = req.body.parts[i];
        Parts.findOne({partNumber : req.body.parts[i].partNumber}, (error, part) => {
            if(error){
                console.log(error)
            } else {
                if (!part){
                    console.log("This item is not available in stock.");
                    res.status(400).send("Item not found");
                } else {
                    // console.log(part.stamp + " " + part.partNumber);
                    // console.log(sellPart);
                    
                    if( part.stamp !== sellPart.stamp){
                        console.log("Stamp for part number " + req.body.parts[i].partNumber + " doesn't match!")
                        res.status(400).send("Stamp number doesn't match!")
                    } else {
                        var availableQty = part.quantity;
                        var remQty = Number(availableQty) - sellPart.quantity;
                        console.log("Item ID  : " + part.partNumber + " " + part.stamp);
                        console.log("Avai QTY : " + part.quantity);
                        console.log("Sold QTY : " + sellPart.quantity); 
                        console.log("Rema Qty : " + remQty);
                        Parts.findByIdAndUpdate(part._id,{
                            quantity : remQty
                        },{new: true}, function(err, updatedPart){
                            if(err){
                                console.log(err);
                            } else {
                                console.log("Quantity for sold item " + part._id + " " + part.partNumber + " updated!");
                                console.log(updatedPart);
                                // parts.push(updatedPart);
                                // res.status(200).send(updatedPart)
                            }
                        })
                    }
                }
            }   
            
        })
    }
    let sell = new Sell(sellData);
    sell.save((error, soldItems) =>{
        if(error){
            // res.json({status: 500, error: err});
            console.log(error)
        } else {
            res.status(200).send(soldItems)
        }
    })
    }
})

router.get("/purchases", (req, res)=>{
    Purchase.find(function (error, purchases){
        if(error){
            console.log(error);
        } else {
            res.json(purchases);
            console.log("purchases fetched from database");
        }
    })
});
router.get("/parts/stock", (req, res)=>{
    Parts.find(function (error, stock){
        if(error){
            console.log(error);
        } else {
            res.json(stock);
            console.log("Parts stock fetched from database");
        }
    })
})
router.get("/parts/sold", (req, res)=>{
    Sell.find(function (error, parts){
        if(error){
            console.log(error);
        } else {
            res.json(parts);
            console.log("Sold parts fetched from database!");
        }
    })
})
router.post("/parts/stock", (req, res) => {
    let partsData = req.body;
    Parts.findOne({partNumber: partsData.partNumber}, (error, part) => {
        if (error){
            console.log(error);
        } else {
            if(!part){
                let parts = new Parts(partsData)
                parts.save((err, addedPart) =>{
                    if(err){
                        console.log(err)
                    } else {
                        console.log("New part added with new PART NUMBER");
                        res.status(200).send(addedPart);
                    }
                })
            } else {
                
                if(part.stamp !== partsData.stamp){
                    let parts = new Parts(partsData)
                    parts.save((err, addedPart) =>{
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Already existing part added with a new STAMP.");
                            res.status(200).send(addedPart);
                        }
                    })
                } else {
                    let parts = new Parts(partsData)
                    console.log(part.quantity);
                    var availableQty = part.quantity;
                    var totalQuantity = Number(availableQty) + Number(partsData.quantity);
                    Parts.findByIdAndUpdate(part.id,{
                        quantity : totalQuantity
                    },{new: true}, function(err, updatedPart){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Quantity for existing part updated!")
                            // console.log(updatedPart)
                            res.status(200).send(updatedPart)
                        }
                    })

                }
            }

        }
    })
})
router.put('/stock/update', (req, res) => {
    console.log("attempting to update Stock");
    let partData = req.body; 
    // console.log("Part_id  " + partData.id);
    Parts.findByIdAndUpdate(partData.id, 
        {
            itemPId : partData.itemPId,
            partNumber : partData.partNumber,
            stamp : partData.stamp,
            description : partData.description,
            supplier : partData.supplier,
            price : partData.price,
            quantity : partData.quantity,
            shelfNumber : partData.shelfNumber,
            purchaseDate : partData.purchaseDate
        }, {new: true}, function(err, model){
            if(err){
                console.log(err)
            } else{
            console.log("Part information updated successfully");
            console.log(model);}
        });
    res.status(200).send({"success": true}); 
});
router.delete('/stock/delete/:id', (req, res) => {
    Parts.findOneAndRemove({_id : req.params.id}, function (err,data){
        if(err){
            console.log(err)
        } else {
            if(!data){
                status = "This part doesn't exist in the stock."
                res.status(401).send({status: status})

            }else{
                console.log(data)
                res.status(200).send({status : true})
            }
            
        }
    } )
    

})
router.delete('/purchase/delete/:id', (req, res) => {
    Purchase.findOneAndRemove({_id : req.params.id}, function (err,data){
        if(err){
            console.log(err)
        } else {
            if(!data){
                status = "This purchase doesn't exist in the stock."
                res.status(401).send({status: status})

            }else{
                console.log("Delete successfull!")
                console.log(data)
                res.status(200).send({status : true})
            }
            
        }
    } )
    

})


module.exports = router
