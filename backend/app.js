const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const path = require("path")
const dbConnection = require('./database/dbConnection')
const userRoutes = require("./routes/userRoutes")

const app = express()

dbConnection()

app.use(helmet())

app.use(cookieParser())

app.use(express.json({limit:"10kb"}))

app.use("/", express.static("uploads"))

app.use(cors({origin:["http://localhost:3000"],credentials:true}))

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// app.use(mongoSanitize())

// _______________________ API ROUTES ____________________ 
app.use("/api/user", userRoutes)

module.exports=app