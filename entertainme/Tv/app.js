const express = require('express')
const app = express()
const cors = require('cors')
const port = 3002
const mongoose = require('mongoose')
const router = require('./routes')
const Redis  = require('ioredis')


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(router)

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,'conection error'));
db.once('open', function () {
  console.log('connected')
})

app.listen(port , () => {
  console.log('connected'+ port)
})