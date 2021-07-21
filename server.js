const express = require ('express')
const path = require ("path")
const https = require ('https')
const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require ('util')

const PORT = 3001  
const fs = require('fs')

const bodyParser = require ('body-parser')
const creds = require ('./client_secret.json')

const fens = []
const answers = []
const colors = []

async function accessSpreadsheet() {

  const doc = new GoogleSpreadsheet('1NwgE2O3xMP30vYXEU90iCKUHVHtULrRxKmZGcd820Yg');
  await promisify (doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  const sheet = info.worksheets[0]

  const rows = await promisify (sheet.getRows) ({
    offset: 1
  })

  rows.forEach ((row) => {
    var sp = row.fen.split(' ')
    let color = ''
    for (var i = 0; i < sp.length; i++) {
      if (sp[i].length == 1 && 
      (sp[i] == 'b' || sp[i] == 'w')
        ) {
        color = sp[i]
        answers.push(row.answer)
      }
    }
    fens.push({id: answers.length, fen: row.fen, answer: row.answer, color: color, title: row.title})
  })
//  console.log(fens)

}

let data = [] 

accessSpreadsheet()

async function write_email (row) {

  const doc = new GoogleSpreadsheet('1NwgE2O3xMP30vYXEU90iCKUHVHtULrRxKmZGcd820Yg');
  await promisify (doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()

  var new_sheet = info.worksheets[1]
  
  data = row
  await promisify (new_sheet.addRow)(row)
  
}

async function write_data (row) {

  var o = {
    email: row[0], 
    name: row[1] 
  }

  for (var i = 1; i < row.length+1; i++) {
    o['q'+String(i)] = row[i+1]
  }

  console.log(o)

  const doc = new GoogleSpreadsheet('1NwgE2O3xMP30vYXEU90iCKUHVHtULrRxKmZGcd820Yg');
  await promisify (doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  var new_sheet = info.worksheets[2]
  await promisify (new_sheet.addRow)(o)
  
}

var app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true 
}));

app.get ('/chess/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})
app.get('/chess/load/', (req, res) => {
  res.send(fens)
})

app.post('/chess/score/', (req, res) => {
  console.log(req.body)
  write_data(req.body)
  res.send(true)
})

app.post('/chess/email/', (req, res) => {
  console.log(req.body)
  write_email (req.body)
})

const ssl = {
    key: fs.readFileSync('ssl/kaderarnold_com.key'),
    cert: fs.readFileSync('ssl/kaderarnold_com.crt')
}

app.listen(PORT)

const server = https.createServer(ssl, app) 
server.listen('443', function () {
    console.log ('Serving Board at https://kaderarnold.com/chess/')
})


