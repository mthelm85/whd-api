const bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express'),
      mongoClient = require('mongodb').MongoClient,
      morgan = require('morgan')

const app = express(),
      configDB = require('./config/db'),
      port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors({
  origin:[
    'http://localhost:8080'
  ],
  methods:['GET','POST', 'PATCH'],
  credentials: true
}))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

mongoClient.connect(configDB.url, {useNewUrlParser: true}, (err, client) => {
  if (err) throw err

  const db = client.db('whd-api')

  require('./routes.js')(app, db)

  app.listen(port, () => {
    console.log(`The API is accessible on port ${port}`)
  })
})
