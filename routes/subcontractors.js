const router = require("express").Router();
let Client = require("../models/client.model");

router.route("/")

    .get((req, res) => {

        Client.find({

        }, (err, foundClients) => {
            res.json(foundClients)
            console.log("found data sent to frontend")
        })
    })

    .post((req, res) => {

        console.log(req.body);
        
        const newClient = new Client({

            companyName: req.body.companyName,
            country: req.body.country,
            zip: req.body.zip,
            city: req.body.city,
            streetName: req.body.streetName,
            houseNumber: req.body.houseNumber,
            title: req.body.title,
            lastName: req.body.lastName, 
            firstName: req.body.firstName,
            tel: req.body.tel,
            email: req.body.email,
            typeOfTruck: req.body.typeOfTruck,
            certifications: req.body.certifications,
            directions: req.body.directions,
            notes: req.body.notes

        });

        newClient.save();

        res.send("A szállító hozzáadása sikeresen megtörtént!")

    })

    .delete((req, res) => {

        const deletableID = req.body.id;

        Client.deleteOne({
            _id: deletableID
        }, err => {
            if(!err){
                res.send("A törlés sikeresen megtörtént!")
            }else {
                res.send(err)
            }
        })
    })

    .put((req, res) => {
        console.log(req.body);
        Client.update(
            {_id: req.body.id},
            {
                companyName: req.body.companyName,
                country: req.body.country,
                zip: req.body.zip,
                city: req.body.city,
                streetName: req.body.streetName,
                houseNumber: req.body.houseNumber,
                title: req.body.title,
                lastName: req.body.lastName, 
                firstName: req.body.firstName,
                tel: req.body.tel,
                email: req.body.email,
                typeOfTruck: req.body.typeOfTruck,
                certifications: req.body.certifications,
                directions: req.body.directions,
                notes: req.body.notes
            },
            {overwrite: true},
            (err) =>{
                if(!err) {
                    res.send("A frissítés sikeresen megtörtént!")
                } else {
                    res.send(err);
                }
            }
        )
    })

module.exports = router;