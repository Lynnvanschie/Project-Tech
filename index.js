//camelcase
const camelCase = require('camelcase');
console.log(camelCase('test-this-package'));

//Express aanroepen
const express = require('express');
const app = express();

express()
  .use(express.static('static')) //Serveert static files
  .get('/', onhome)
  .get('/about', about)
  .get('/audio', audio)
  .get('/video', video)
  .get('/image', image)
  .listen(1900)

function onhome(req,res) {
  res.status(200).send('<h1>Hello Client</h1>\n')
}

function about(req,res) {
  res.status(200).send('<h1>This is a server</h1>\n')
}

function audio(req,res) {
  res.sendFile('./static/audio/Adoreyou.mp3', { root: __dirname });
  //.sendFile serveert een bestand.
  //De root moet aangegeven worden. __dirname is een globale node.js variabele die het 'currently running file' aangeeft.
}

function video(req,res) {
  res.sendFile('/static/video/Falling.mp4', { root: __dirname })
}

function image(req,res) {
  res.sendFile('/static/img/landschap.jpg', { root: __dirname })
}
