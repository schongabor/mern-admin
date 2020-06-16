const mongoose = require("mongoose");

const clientSchema = {
    companyName: String,
    country: String,
    zip: String,
    city: String,
    streetName: String,
    houseNumber: String,
    title: String,
    lastName: String,
    firstName: String,
    email: String,
    tel: String,
    notes: String
}

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;