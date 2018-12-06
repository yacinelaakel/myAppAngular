//PROD SERVER WITH SERVER SIDE RENDERING
require('dotenv').config(); // .env
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode }   from '@angular/core';
import { ngExpressEngine }  from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { join }             from 'path';

import * as express     from 'express';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';
import * as compression from 'compression';
import * as mongoose 	from 'mongoose';

enableProdMode();

const app = express();

const PORT = process.env.PORT || 8081;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const DB_HOST = process.env.MONGODB_URI || 'mongodb://localhost:27017/myAppAngular';

mongoose.connect(DB_HOST, {useCreateIndex: true, useNewUrlParser: true});

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
    	provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));

// Static Files
app.get('*.*', express.static(join(DIST_FOLDER)));

// HTTP -> HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
    	res.redirect(`https://${req.header('host')}${req.url}`)
    }
    else {
      next();
    }
});

// Backend Node routes
app.use(function (err, req, res, next) {
  	if (err.name === 'UnauthorizedError') {
    	res.status(401).send(err.name + ": " + err.message);
  	}
});

const notification = require('./backend/api/routes/notification');
app.use('/api/notification', notification);

const account = require('./backend/api/routes/account');
app.use('/api/account', account);

const subscription = require('./backend/api/routes/subscription');
app.use('/api/subscription', subscription);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	res.render('index', { req });
});

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:"+PORT);
});