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
  console.log(sheet.title)

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
        console.log(sp[i])
        color = sp[i]
        answers.push(row.answer)
      }
    }
    fens.push({id: answers.length, fen: row.fen, answer: row.answer, color: color, title: row.title})
  })
  console.log(fens)

}

accessSpreadsheet()

var app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get ('/chess/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))

})
app.get('/chess/load/', (req, res) => {
  res.send(fens)
})

app.post('/chess/score', (req, res) => {
  console.log(req.body)
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


