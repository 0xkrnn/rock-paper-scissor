const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

const mongoose = require('mongoose')

const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
// DB connection

mongoose.connect(process.env.DB_URL);

let connection = mongoose.connection
connection.on("error",(err) => console.log("error occured"));
connection.once("open",() => console.log("connected succesfully")); 


app.get("/", (req, res) => {
    console.log("Hello");
    res.json({"status" : "success"})
})

app.use("/player",require("./routes/playerRoute"))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
