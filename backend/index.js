const express = require("express");
const chats = require("./data/data")
var cors = require('cors');
const { connect } = require("./database/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

// Database connect

connect()

// File Upload
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();


// Routes

app.use("/api/v1/auth" , authRoutes )
app.use("/api/v1/users" , userRoutes)

app.get("/" , (req , res) => {
    res.send("App is running")
})

app.get("/api/chats" , (req , res) => {
    res.send(chats)
})


app.listen(PORT , () => {
    console.log(`App is running on PORT : ${PORT}`)
})