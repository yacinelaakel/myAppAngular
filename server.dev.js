// DELETE THIS FILE WHEN DEV IS FINISHED
require('dotenv').config(); // .env
const express    = require('express');
const bodyParser = require('body-parser');
const path 		 = require('path');
const cors 	     = require('cors');
const mongoose   = require('mongoose');

const app = express();

const PORT = process.env.PORT || 8081;
const DB_HOST = process.env.MONGODB_URI || 'mongodb://localhost:27017/myAppAngular';

mongoose.connect(DB_HOST, {useCreateIndex: true, useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
  	if (err.name === 'UnauthorizedError') {
    	res.status(401).send(err.name + ": " + err.message);
  	}
});

const account = require('./backend/api/routes/account');
app.use('/api/account', account);

const subscription = require('./backend/api/routes/subscription');
app.use('/api/subscription', subscription);

app.listen(PORT, err => {
	if (err) return console.error(err);
	console.log(`Dev server listening on port ${PORT}`);
});
