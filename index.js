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

function onhome(req, res, next) {
	db.collection('user').find().toArray(done);

	function done(err, username) {
		if (err) {
			next(err);
		} else {
			res.render('index.ejs', {
				name: name,
				user: username
			});

			req.session.user = {
				user: username
			};
			console.log(req.session.user);
		}
	}
}

function add(req, res) {
	res.render('filter');
}

function addFilters(req, res) {
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

function favorieten(req, res, next) {
	db.collection('filterSet').find().toArray(done);

	function done(err, data) {
		if (err) {
			next(err);
		} else {
			res.render('favorieten.ejs', {
				filterSet: data
			});
		}
	}
}
