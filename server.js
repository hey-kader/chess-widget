const express = require ('express')
const path = require ("path")
const https = require ('https')
const vhost = require ('vhost')

const PORT = 3001  
const fs = require('fs')

const bodyParser = require ('body-parser')
const creds = require ('./client_secret.json')

var app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get ('/chess/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})
const ssl = {
    key: fs.readFileSync('ssl/kaderarnold_com.key'),
    cert: fs.readFileSync('ssl/kaderarnold_com.crt')
}

app.listen(PORT)
const server = https.createServer(ssl, app) 
server.listen('4431', function () {
    console.log ('Serving Board at https://kaderarnold.com:4431/chess/')

})
