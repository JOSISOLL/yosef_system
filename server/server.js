const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')

const PORT = 3000

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use('/api', api)

app.get('/', function(req, res){
    res.send('Hello from server')
})
// app.get('/mongo', function(req, res){
//     res.send('MONGO API')
// })

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})


