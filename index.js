//Express aanroepen
const express = require('express');

//camelcase
// const camelCase = require('camelcase');
// console.log(camelCase('test-this-package'));

//Aanroepen packages
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const slug = require('slug');
const mongodb = require('mongodb');
require('dotenv').config();

express()
	.use(express.static('static')) //Serveert static files
	.use(bodyParser.urlencoded({
		extended: true
	})) //Aanroepen bodyparser
	.set('view engine', 'ejs')
	.set('views', 'view')
	//Routes:
	.get('/', onhome)
	.get('/add', add)
	.post('/', addFilters)
	.get('/favorieten', favorieten)
	.get('/:name-:age', parameters)
	.get('/about', about)
	.get('/audio', audio)
	.get('/video', video)
	.get('/image', image)
	.listen(1900);

let name = ['Andrea', 'Allison', 'Emily', 'Fiona', 'Sarah', 'Alex', 'Becky'];
let filterSet = [{
	name: 'Filters 1',
	geslacht: 'Vrouw',
	leeftijdA: '22',
	leeftijdB: '30',
	afstand: '55',
	opzoek: ['Serieuze relatie'],
	eigenschap: ['Creatief', 'Spontaan'],
	interesse: ['Boeken', 'Sport']
},
{
	name: 'Filters 2',
	geslacht: 'Vrouw',
	leeftijdA: '25',
	leeftijdB: '55',
	afstand: '25',
	opzoek: ['Serieuze relatie', 'Vriendschap'],
	eigenschap: ['Ambitieus', 'Optimistisch', 'Avontuurlijk'],
	interesse: ['Muziek', 'Schilderen']
},
];
var db = null;
var mongoUrl = process.env.DB_URL;

mongodb.MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, client) {
	if (err){
		throw err;
	}
	db = client.db(process.env.DB_NAME);
});

function onhome(req, res) {
	res.render('index', {
		name: name
	});
}

function add(req, res) {
	res.render('filter');
}

function addFilters(req, res) {
	// var id = slug(req.body.name).toLowerCase()
	//Dit kan je gebruiken om een naam met bv spaties te 'slugifien'

	filterSet.push({ //Pusht een nieuw object in de filterSet array
		name: req.body.name,
		geslacht: req.body.geslacht,
		leeftijdA: req.body.leeftijdA,
		leeftijdB: req.body.leeftijdB,
		afstand: req.body.afstand,
		opzoek: req.body.opzoek,
		eigenschap: req.body.eigenschap,
		interesse: req.body.interesse,
	});

	res.redirect('/favorieten');
}

function favorieten(req, res) {
	res.render('favorieten', {
		filterSet: filterSet
	});
	console.log(filterSet);
	//logt array filterSet in terminal om te zien welke nieuwe data er toegevoegd is aan de array
}

function parameters(req, res) {
	res.send(req.params); //Geeft object met name:'', age:' '
}

function about(req, res) {
	res.status(200).send('<h1>This is a server</h1>\n');
}

function audio(req, res) {
	res.sendFile('./static/audio/Adoreyou.mp3', {
		root: __dirname
	});
	//.sendFile serveert een bestand.
	//De root moet aangegeven worden. __dirname is een globale node.js variabele die het 'currently running file' aangeeft.
}

function video(req, res) {
	res.sendFile('/static/video/Falling.mp4', {
		root: __dirname
	});
}

function image(req, res) {
	res.sendFile('/static/img/landschap.jpg', {
		root: __dirname
	});
}
