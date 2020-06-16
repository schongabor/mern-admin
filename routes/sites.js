const router = require("express").Router();
let Site = require("../models/site.model");

router.route("/")

    .get((req, res) => {

        const next = req.query.next;

        Site.estimatedDocumentCount((err, count) => {

            if(!err){

                Site.find({})
                .sort({companyName: 1})
                .limit(Number(next))

                .exec((err, foundSites) => {

                    if(!err) {
                        res.json({
                            items: foundSites,
                            numberOfDocuments: count
                        });
                    } else {
                        console.log(err);
                    }
                    
                });

            } else {
                console.log(err);
            }
        })


    })

    .post((req, res) => {

        console.log(req.body);
        
        const newSite = new Site({

            country: req.body.country,
            zip: req.body.zip,
            city: req.body.city,
            streetName: req.body.streetName,
            houseNumber: req.body.houseNumber,
            companyName: req.body.companyName,
            contact: req.body.title,
            hours: req.body.phone,
            gps: req.body.email,
            notes: req.body.notes

        });

        newSite.save();

        res.send("A telep hozzáadása sikeresen megtörtént!")

    })

    .delete((req, res) => {

        const deletableID = req.body.id;

        Site.deleteOne({
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
        Site.update(
            {_id: req.body.id},
            {
                country: req.body.country,
                zip: req.body.zip,
                city: req.body.city,
                streetName: req.body.streetName,
                houseNumber: req.body.houseNumber,
                companyName: req.body.companyName,
                contact: req.body.title,
                hours: req.body.phone,
                gps: req.body.email,
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

router.route("/:findSite")
    
    .get((req, res) => {

        console.log(":/findSite route pinged")

        const searchQuerys = req.query.search;
        const next = req.query.next;

        var reusltCounter = 0;
        var filteredResults = [];
        var limitedResults = [];
        
        console.log(searchQuerys)

        const splittedQuerys = searchQuerys.split(" ");
        const numberOfQuerys = splittedQuerys.length;

        console.log(numberOfQuerys);

        Site.find({}, (err, results) => {

            // var reusltCounter = 0;
            // var filteredResults = [];

            for(var i = 0; i < results.length; i++){
                for (var j = 0; j < splittedQuerys.length; j++){
                    if(numberOfQuerys > 1) {
                        if(
                            (results[i].companyName.toLowerCase().startsWith(splittedQuerys[j]) ||
                            results[i].country.toLowerCase().startsWith(splittedQuerys[j]) ||
                            results[i].city.toLowerCase().startsWith(splittedQuerys[j]))
                            &&
                            (results[i].companyName.toLowerCase().startsWith(splittedQuerys[j+1]) ||
                            results[i].country.toLowerCase().startsWith(splittedQuerys[j+1]) ||
                            results[i].city.toLowerCase().startsWith(splittedQuerys[j+1]))
                            ){
                            reusltCounter++;
                            filteredResults.push(results[i]);
                            }
                    } else if(
                        results[i].companyName.toLowerCase().startsWith(splittedQuerys[0]) ||
                        results[i].country.toLowerCase().startsWith(splittedQuerys[0]) ||
                        results[i].city.toLowerCase().startsWith(splittedQuerys[0])
                    ){
                        reusltCounter++;
                        filteredResults.push(results[i]);
                    }
                }
            }

            console.log("There are " + reusltCounter + " results for " + splittedQuerys + " keywords");

            limitedResults = filteredResults.slice(0, next);

        })

        // .sort(companyName - 1)

        .exec((err, foundSites) => {
            if(!err) {
                console.log(limitedResults)
                // const limitedResults = foundSites.slice(0, next);
                res.json({
                    filteredItems: limitedResults,
                    numberOfFoundSites: reusltCounter
                })
            } else {
                console.log(err);
            }
        });
    })

module.exports = router;