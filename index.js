const express = require('express')

express()
  .use(express.static('static')) //Serveert static files
  .get('/', onhome)
  .get('/about', about)
  .listen(1900)

function onhome(req,res) {
  res.status(200).send('<h1>Hello Client</h1>\n')
}

function about(req,res) {
  res.status(200).send('<h1>This is a server</h1>\n')
}
