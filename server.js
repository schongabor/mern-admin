const express = require ("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); //ez kell, hogy a két port között működjön a kommunikáció
const path = require("path");

require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json()); //enélkül üres objektumot passzol át az axios

//mongo atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//routing

const clientsRouter = require("./routes/clients");
app.use("/clients", clientsRouter);

const sitesRouter = require("./routes/sites");
app.use("/sites", sitesRouter);

const subcontractorsRouter = require("./routes/subcontractors");
app.use("/subcontractors", subcontractorsRouter);


if(process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

    });
}

//server start


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Backend server started on port ${port}`);
});