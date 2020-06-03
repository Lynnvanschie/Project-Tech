//Express aanroepen
const express = require('express');

//Aanroepen packages
// const ejs = require('ejs');
const bodyParser = require('body-parser');
// const slug = require('slug');
const mongodb = require('mongodb');
const session = require('express-session');
require('dotenv').config();


express()
	.use(express.static('static')) //Serveert static files
	.use(bodyParser.urlencoded({
		extended: true
	})) //Aanroepen bodyparser
	.use(session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.set('view engine', 'ejs')
	.set('views', 'view')
	//Routes:
	.get('/', onhome)
	.get('/add', add)
	.post('/', addFilters)
	.get('/favorieten', favorieten)
	// .delete('/:id', deleteFilterSet)
	.listen(1900);

let name = ['Andrea', 'Allison', 'Emily', 'Fiona', 'Sarah', 'Alex', 'Becky'];

var db = null;
var mongoUrl = process.env.DB_URL;

//Verbinden met mongodb
mongodb.MongoClient.connect(mongoUrl, {
	useUnifiedTopology: true
}, function(err, client) {
	if (err) {
		throw err;
	}
	db = client.db(process.env.DB_NAME);
});

function onhome(req, res) {
	db.collection('user').find().toArray(done);

	function done(err, username) {
		res.render('index.ejs', {
			name: name,
			user: username
		});
	}

	//Proberen usernames op te slaan in een session
	// req.session.user = db.collection('user').findOne(req.body.username, test);
	//
	// function test() {
	// 	return console.log(req.session.user);
	// }
}

function add(req, res) {
	res.render('filter');
}

function addFilters(req, res) {
	//Voegt data uit de request body toe aan de database.
	db.collection('filterSet').insertOne({
		name: req.body.name,
		geslacht: req.body.geslacht,
		leeftijdA: req.body.leeftijdA,
		leeftijdB: req.body.leeftijdB,
		afstand: req.body.afstand,
		opzoek: req.body.opzoek,
		eigenschap: req.body.eigenschap,
		interesse: req.body.interesse
	});
	res.redirect('/favorieten');
}

function favorieten(req, res) {
	//Vindt de data uit de filterSet collectie en laad deze in.
	db.collection('filterSet').find().toArray(done);

	function done(err, data) {
		res.render('favorieten.ejs', {
			filterSet: data
		});
	}
}

// function deleteFilterSet(req, res) {
// 	var id = req.params.id;
//
// 	data = data.filter(function(value) {
// 		return value.id !== id;
// 	});
// }
