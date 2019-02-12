<<<<<<< HEAD
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Imports = require('../models/import')
const User = require('../models/user')
const Customer = require('../models/customer')
const Suplier = require('../models/suplier');
const Repair = require('../models/repair')
const Parts = require('../models/parts')
const ImportedParts = require('../models/imported_parts')
const Sell = require('../models/sell') 
const Distribute = require('../models/distribute')
const Checkout = require('../models/checkout')
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
=======
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Imports = require("../models/import");
const User = require("../models/user");
const Customer = require("../models/customer");
const Suplier = require("../models/suplier");
const Repair = require("../models/repair");
const Parts = require("../models/parts");
const Sell = require("../models/sell");
const mongoose = require("mongoose");
const db = "mongodb://root:root@ds135179.mlab.com:35179/ks_yosefdb";
const db2 = "mongodb://localhost:27017/ks_yosefdb";
const keypair = require("keypair");
const RSA_PRIVATE_KEY = "secret-key";
const Purchase = require("../models/purchase");
const api_imp = require("./api_imp");
mongoose.connect(
  db2,
  err => {
    if (err) {
      console.error("Error!" + err);
    } else {
      console.log("Connected to the database");
>>>>>>> add-excel-import
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  let payload = jwt.verify(token, RSA_PRIVATE_KEY);
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From API route");
});
router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registerdUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registerdUser._id };
      let token = jwt.sign(payload, RSA_PRIVATE_KEY);
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { algorithm: "RS256", subject: user._id };
          let token = jwt.sign(payload, RSA_PRIVATE_KEY);
          res.cookie("SESSIONID", token, { httpOnly: true, secure: true });
          // res.status(200).send({token})
          res.status(200).json({
            idToken: token,
            expiresIn: 43200
          });
        }
      }
    }
  });
});
router.get("/repair", verifyToken, (req, res) => {
  Repair.find(function(error, repairs) {
    if (error) {
      console.log(error);
    } else {
      res.json(repairs);
    }
  });
});
router.post("/garage/client/add", (req, res) => {
  let clientData = req.body;
  res.status(200).send({ success: true });
});
router.put("/garage/client/update", (req, res) => {
  let clientData = req.body;
  Customer.findByIdAndUpdate(
    clientData.id,
    {
      name: clientData.name,
      email: clientData.email,
      telMobile: clientData.telMobile,
      telHome: clientData.telHome,
      telWork: clientData.telWork,
      address: clientData.address
    },
    { new: true },
    function(err, model) {
    }
  );

  res.status(200).send({ success: true });
});
// TODO: send the appropriate response code if the requested record is not found!

router.delete("/garage/client/delete/:id", (req, res) => {
  Customer.findOneAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        status = "Customer not found.";
        res.status(401).send({ status: status });
      } else {
        res.status(200).send({ status: true });
      }
    }
  });
});
router.get("/clients_get", (req, res) => {
  Customer.find(function(error, customers) {
    if (error) {
      console.log(error);
    } else {
      res.json(customers);
    }
  });
});
router.post("/customer/add", verifyToken, (req, res) => {
  let customerData = req.body;

  let customer = new Customer(customerData);
  Customer.findOne(
    { telMobile: customerData.telMobile },
    (error, customer_get) => {
      if (error) {
        console.log(error);
      } else {
        if (!customer_get) {
          customer.save((error, addedCustomer) => {
            if (error) {
              console.log(error);
            } else {
              let add_status = "Customer added successfully";
              res.status(200).send(addedCustomer);
            }
          });
        } else {
          res
            .status(401)
            .send("Customer with this Mobile number already exists!");
        }
      }
    }
  );
});
router.post("/suplier/add", (req, res) => {
  let suplierData = req.body;
  let suplier = new Suplier(suplierData);
  Suplier.findOne({ phone: suplierData.phone }, (error, suplier_get) => {
    if (error) {
      console.log(error);
    } else {
      if (!suplier_get) {
        suplier.save((error, addedSuplier) => {
          if (error) {
            console.log(error);
          } else {
            let add_status = "Suplier added successfully";
            res.status(200).send(addedSuplier);
          }
        });
      } else {
        res.status(401).send("Suplier with this Mobile number already exists!");
      }
    }
  });
});
router.post("/import/add", (req, res) => {
  let importFData = req.body;
  let imports = new Imports(importFData);
  imports.save((error, newImport) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(newImport);
    }
  });
});
router.get("/imports", (req, res) => {
  Imports.find(function(error, imports) {
    if (error) {
      console.log(error);
    } else {
      res.jsonp(imports);
    }
  });
});
router.get("/supliers", (req, res) => {
  Suplier.find(function(error, supliers) {
    if (error) {
      console.log(error);
    } else {
      res.json(supliers);
    }
  });
});

router.post("/repair/add", verifyToken, (req, res) => {
<<<<<<< HEAD
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
router.put('/imported/update', (req, res) =>{
    console.log("Attempting to updated imported items")
    let importedData = req.body;
    ImportedParts.findByIdAndUpdate(importedData.id, {
        part_number : importedData.part_number,
        stamp : importedData.stamp,
        description : importedData.description,
        origin : importedData.origin,
        remark : importedData.remark,
        price : importedData.price,
        local_cost : importedData.local_cost,
        quantity : importedData.quantity
    }, {new : true}, function (err, model){
        if(err){
            console.log(err)
        } else {
            console.log("Update excecuted....")
            console.log(model)
        }
    }); 
    res.status(200).send({"success": true});
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
=======
  let repairData = req.body;
  let repair = new Repair(repairData);
  repair.save((error, addedRepair) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(addedRepair);
    }
  });
});
router.put("/repair/update", (req, res) => {
  let repairData = req.body;
  Repair.findByIdAndUpdate(
    repairData.id,
    {
      customer: repairData.customer,
      plateNumber: repairData.plateNumber,
      reportedProblem: repairData.reportedProblem,
      carType: repairData.carType,
      remark: repairData.remark,
      personInCharge: repairData.personInCharge,
      date: repairData.date
    },
    { new: true },
    function(err, model) {}
  );
  res.status(200).send({ success: true });
>>>>>>> add-excel-import
});
// TODO: set the appropriate response code for unknown record.
router.delete("/repair/delete/:id", (req, res) => {
  Repair.findOneAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        status = "This repair doesn't exist in the stock.";
        res.status(401).send({ status: status });
      } else {
        res.status(200).send({ status: true });
      }
    }
  });
});

//Get checkout

router.get("/checkouts", (req, res) =>{
    Checkout.find(function (error, checkouts){
        if(error){
            console.log(error);
        } else {
            res.json(checkouts);
            console.log("Checkouts fetched from database");
        }
    })

})


// Add checkout to database

router.post("/repiar/checkout", (req, res) =>{
    let checkoutData = req.body;
    console.log("Attempting to checkout repair")
    let checkout = new Checkout(checkoutData)
    checkout.save((error, checkout) =>{
        if(error){
            console.log(error)
        } else {
            res.status(200).send(checkoutData)
        }
    })
})


router.post("/parts/purchase", (req, res) => {
<<<<<<< HEAD
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
router.get("/distributes", (req, res) =>{
    Distribute.find(function (error, distributes){
        if(error){
            console.log(error);
        } else {
            res.json(distributes);
            console.log("Distributes fetched from database");
        }
    })
})
router.post("/imports/distribute", (req, res) =>{
    let distData = req.body;
    if(!distData){
        res.status(400).send("Invalid request body.")
    } else {
        console.log("Attempting to distribute imported parts")
        for(var i = 0; i < req.body.parts.length;i++){
            let distPart = req.body.parts[i];
            ImportedParts.findOne({partNumber : distPart.partNumber}, (error, part) =>{
                if (error){
                    console.log(error)
                } else {
                    if (!part){
                        console.log("This item is not available in stock")
                        res.status(400).send("Item not available in stock")
                    } else {
                        if( part.stamp !== distPart.stamp){
                            console.log("Stamp for part number " + req.body.parts[i].partNumber + " doesn't match!")
                            res.status(400).send("Stamp number doesn't match!")
                        } else {
                            var availableQty = part.quantity;
                            var remQty = availableQty - distPart.quantity;
                            console.log("Item ID  : " + part.partNumber + " " + part.stamp);
                            console.log("Avai QTY : " + part.quantity);
                            console.log("Dist QTY : " + distPart.quantity); 
                            console.log("Rema Qty : " + remQty);
                            ImportedParts.findByIdAndUpdate(part._id,{
                                quantity : remQty
                            },{new: true}, function(err, updatedPart){
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log("Quantity for distributed item " + part._id + " " + part.partNumber + " updated!");
                                    console.log(updatedPart);
                                    
                                    
                                }
                            })
                        }

                    }
                }
            })
        }
        let distribute = new Distribute(distData);
        distribute.save((error, distItems) =>{
        if(error){
            console.log(error)
        } else {
            res.status(200).send(distItems)
        }
        })
    }
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
=======
  let purchaseData = req.body;
  let purchase = new Purchase(purchaseData);
  // res.status(200).send("Works fine");
  purchase.save((error, purchasedData) => {
    if (error) {
      // res.json({status: 500, error: err});
      console.log(error);
    } else {
      res.status(200).send(purchasedData);
>>>>>>> add-excel-import
    }
  });
});
<<<<<<< HEAD
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
router.get("/imported/parts", (req, res) =>{
    ImportedParts.find(function (error, importedParts){
        if(error){
            console.log(error);
        } else {
            res.json(importedParts);
            console.log("Imported parts fetched from database!");
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

router.post("/import/parts", (req, res) =>{
    let partsData = req.body;
    ImportedParts.findOne({part_number : partsData.part_number}, (error, part) =>{
        if(error){
            console.log(error)
        } else{
            if (!part){
                let parts = new ImportedParts(partsData)
                parts.save((err, addedImportedPart) =>{
                    if (err){
                        console.log(err)
                    } else {
                        console.log("New imported part added with new Part NUmber");
                        res.status(200).send(addedImportedPart)
                    }
                })
            } else {
                if(part.stamp !== partsData.stamp){
                    let parts = new ImportedParts(partsData)
                    parts.save((err, addedImportedPart) =>{
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Already existing imported part added with a new STAMP.");
                            res.status(200).send(addedImportedPart);
                        }
                    })
                } else {
                    if(part.price !== partsData.price){
                        console.log(part.price, partsData.price)
                        let parts = new ImportedParts(partsData)
                        parts.save((err, addedImportedPart) =>{
                            if(err){
                                console.log(err)
                            } else {
                                console.log("Already existing part added with a new Price.");
                                res.status(200).send(addedImportedPart);
                            }
                        })
                    } else{
                        let parts = new ImportedParts(partsData)
                        
                        var availableQty = part.quantity;
                        var totalQuantity = Number(availableQty) + Number(parts.quantity);
                        
                        ImportedParts.findByIdAndUpdate(part._id,{
                            quantity : totalQuantity
                        },{new: true}, function(err, updatedImportedPart){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(updatedImportedPart)
                                console.log("Quantity for existing imported part  with part number " + updatedImportedPart.part_number + " and stamp " + updatedImportedPart.stamp + " updated!")
                                res.status(200).send(updatedImportedPart)
                            }
                        })

                    }
                } 
            }
        }
    })
})
router.post("/parts/stock", (req, res) => {
    let partsData = req.body;
    Parts.findOne({partNumber: partsData.partNumber}, (error, part) => {
        if (error){
=======
router.post("/parts/sell", (req, res) => {
  let sellData = req.body;
  var parts = [];
  if (!sellData) {
    res.status(400).send("Invalid request body.");
  } else {
    for (var i = 0; i < req.body.parts.length; i++) {
      let soldQty = req.body.parts[i].quantity;
      let sellPart = req.body.parts[i];
      Parts.findOne(
        { partNumber: req.body.parts[i].partNumber },
        (error, part) => {
          if (error) {
>>>>>>> add-excel-import
            console.log(error);
          } else {
            if (!part) {
              res.status(400).send("Item not found");
            } else {
<<<<<<< HEAD
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
                    if(part.price !== partsData.price){
                        let parts = new Parts(partsData)
                        parts.save((err, addedPart) =>{
                            if(err){
                                console.log(err)
                            } else {
                                console.log("Already existing part added with a new Price.");
                                res.status(200).send(addedPart);
                            }
                        })
                        
=======
>>>>>>> add-excel-import

              if (part.stamp !== sellPart.stamp) {
                res.status(400).send("Stamp number doesn't match!");
              } else {
                var availableQty = part.quantity;
                var remQty = Number(availableQty) - sellPart.quantity;
                Parts.findByIdAndUpdate(
                  part._id,
                  {
                    quantity: remQty
                  },
                  { new: true },
                  function(err, updatedPart) {
                    if (err) {
                      console.log(err);
                    } else {
                      // parts.push(updatedPart);
                      // res.status(200).send(updatedPart)
                    }
                  }
                );
              }
            }
          }
        }
      );
    }
    let sell = new Sell(sellData);
    sell.save((error, soldItems) => {
      if (error) {
        // res.json({status: 500, error: err});
        console.log(error);
      } else {
        res.status(200).send(soldItems);
      }
    });
  }
});

router.get("/purchases", (req, res) => {
  Purchase.find(function(error, purchases) {
    if (error) {
      console.log(error);
    } else {
      res.json(purchases);
    }
  });
});
router.get("/parts/stock", (req, res) => {
  Parts.find(function(error, stock) {
    if (error) {
      console.log(error);
    } else {
      res.json(stock);
    }
  });
});
router.get("/parts/sold", (req, res) => {
  Sell.find(function(error, parts) {
    if (error) {
      console.log(error);
    } else {
      res.json(parts);
    }
  });
});
router.post("/parts/stock", (req, res) => {
  let partsData = req.body;
  Parts.findOne({ partNumber: partsData.partNumber }, (error, part) => {
    if (error) {
      console.log(error);
    } else {
      if (!part) {
        let parts = new Parts(partsData);
        parts.save((err, addedPart) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(addedPart);
          }
        });
      } else {
        if (part.stamp !== partsData.stamp) {
          let parts = new Parts(partsData);
          parts.save((err, addedPart) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send(addedPart);
            }
          });
        } else {
          if (part.price !== partsData.price) {
            let parts = new Parts(partsData);
            parts.save((err, addedPart) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).send(addedPart);
              }
            });
          } else {
            let parts = new Parts(partsData);
            var availableQty = part.quantity;
            var totalQuantity =
              Number(availableQty) + Number(partsData.quantity);
            Parts.findByIdAndUpdate(
              part.id,
              {
                quantity: totalQuantity
              },
              { new: true },
              function(err, updatedPart) {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).send(updatedPart);
                }
              }
            );
          }
        }
      }
    }
  });
});
router.put("/stock/update", (req, res) => {
  let partData = req.body;
  Parts.findByIdAndUpdate(
    partData.id,
    {
      itemPId: partData.itemPId,
      partNumber: partData.partNumber,
      stamp: partData.stamp,
      description: partData.description,
      supplier: partData.supplier,
      price: partData.price,
      quantity: partData.quantity,
      shelfNumber: partData.shelfNumber,
      purchaseDate: partData.purchaseDate
    },
    { new: true },
    function(err, model) {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
  res.status(200).send({ success: true });
});
router.delete("/stock/delete/:id", (req, res) => {
  Parts.findOneAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        status = "This part doesn't exist in the stock.";
        res.status(401).send({ status: status });
      } else {
        res.status(200).send({ status: true });
      }
    }
  });
});
router.delete("/purchase/delete/:id", (req, res) => {
  Purchase.findOneAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        status = "This purchase doesn't exist in the stock.";
        res.status(401).send({ status: status });
      } else {
        res.status(200).send({ status: true });
      }
    }
  });
});
router.delete("/import/delete/:id", (req, res) => {
  Imports.findOneAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        status = "This import doesn't exist in the database.";
        res.status(401).send({ status: status });
      } else {
        res.status(200).send({ status: true });
      }
    }
  });
});

module.exports = router;
