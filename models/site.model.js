const mongoose = require("mongoose");

const siteSchema = {
    companyName: String,
    country: String,
    zip: String,
    city: String,
    streetName: String,
    houseNumber: String,
    contact: String,
    hours: String,
    gps: String,
    notes: String
}

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;