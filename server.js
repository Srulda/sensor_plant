const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/sensor_plant',{ useNewUrlParser: true, useFindAndModify: false })

//for production only
// app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/', api)

//for production only
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

const PORT = 2805
app.listen(process.env.PORT || PORT, function () {
    console.log(`server running on ${PORT}`)
})
