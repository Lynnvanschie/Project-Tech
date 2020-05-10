const express = require('express')
const app = express();

express()
  .get('/', onhome)
  .listen(1900)

function onhome(req,res) {
  res.send('<h1>Hello Client</h1>\n');
}
//This code is supposed to serve static pages but it doesn't work
app.use('/static', express.static('static'));
