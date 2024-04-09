const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")


const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin: "http://localhost:5173",
}))


app.get("/", (req, res) => {
    console.log("Hello");
    res.json({"status" : "success"})
})

app.use("/player",require("./routes/playerRoute"))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
