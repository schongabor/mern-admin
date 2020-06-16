const mongoose = require("mongoose");

const subcontractorSchema = {
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
    typeOfTruck: String,
    certifications: String,
    directions: String,
    notes: String
}

const Subcontractor = mongoose.model("Subcontractor", subcontractorSchema);

module.exports = Subcontractor;