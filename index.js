//Express aanroepen
const express = require('express');
const app = express();

//camelcase
// const camelCase = require('camelcase');
// console.log(camelCase('test-this-package'));

//Aanroepen packages
const ejs = require("ejs");
const bodyParser = require('body-parser');
const slug = require('slug')

express()
  .use(express.static('static')) //Serveert static files
  .use(bodyParser.urlencoded({extended: true})) //Aanroepen bodyparser
  .set('view engine', 'ejs')
  .set('views', 'view')
  //Routes:
  .get('/', onhome)
  .post('/', addFavorieten)
  .get('/favorieten', favorieten)
  .get('/:name-:age', parameters)
  .get('/about', about)
  .get('/audio', audio)
  .get('/video', video)
  .get('/image', image)
  .listen(1900)

function onhome(req,res) {
  // res.status(200).send('<h1>Hello Client</h1>\n')
  res.render('index', {name: name});
}

function favorieten(req,res) {
  res.render('favorieten', {filterSet: filterSet});
  console.log(filterSet) //logt array filterSet in terminal om te zien welke nieuwe data er toegevoegd is aan de array
}

function addFavorieten(req,res) {
  // var id = slug(req.body.name).toLowerCase()
  //Dit kan je gebruiken om een naam met bv spaties te 'slugifien'

   filterSet.push({ //Pusht een nieuw object in de filterSet array
     name: req.body.name,
     geslacht: req.body.geslacht,
     leeftijdA: req.body.leeftijdA,
     leeftijdB: req.body.leeftijdB,
     afstand: req.body.afstand
   })

   res.redirect('/favorieten')
}

function parameters(req,res){
  res.send(req.params) //Geeft object met name:'', age:' '
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

let name = ['Andrea', 'Allison', 'Emily', 'Fiona', 'Sarah', 'Alex', 'Becky'];
let filterSet = [
  {
    name: 'Filters 1',
    geslacht: 'vrouw',
    leeftijdA: '22',
    leeftijdB: '30',
    afstand: '55'
  },
  {
    name: 'Filters 2',
    geslacht: 'vrouw',
    leeftijdA: '25',
    leeftijdB: '55',
    afstand: '25'
  },
  {
    name: 'Filters 3',
    geslacht: 'vrouw',
    leeftijdA: '29',
    leeftijdB: '34',
    afstand: '75'
  },
  {
    name: 'Filters 4',
    geslacht: 'vrouw',
    leeftijdA: '25',
    leeftijdB: '40',
    afstand: '40'
  }
]
