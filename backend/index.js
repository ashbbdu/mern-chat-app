const express = require("express");
const chats = require("./data/data")
var cors = require('cors')

require("dotenv").config()

const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000;


app.get("/" , (req , res) => {
    res.send("App is running")
})

app.get("/api/chats" , (req , res) => {
    res.send(chats)
})

app.listen(PORT , () => {
    console.log(`App is running on PORT : ${PORT}`)
})