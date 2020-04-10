const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/bucketlist-app')
var db = mongoose.connection;
db.on('error', () => {
    console.log('Error in connection')
})
db.once('open', () => {
    console.log('Database connected !')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})