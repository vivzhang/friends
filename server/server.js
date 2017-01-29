const express = require('express');
const parser = require('body-parser');
const url = require('url');

const db = require('../db/db.js');
const utils = require('./utils.js');

const app = express();
const controllers = require('./controllers.js')

//Middleware: 
app.use(parser.json());
app.use(express.static('../public'));
app.use('/scripts', express.static('../node_modules'));

//serve the homepage html page
app.get('/', function(req, res, next) {
  res.redirect('/homepage.html');
});

//serve the create event html page
app.get('/create', function(req, res, next) {
  res.redirect('/createEvent.html');
});

const eventRouter = express.Router();
app.use('/events', eventRouter);

eventRouter.route('/')
  .post(controllers.addEvent)
  .get(controllers.retrieveEvents)

eventRouter.route('/:eventId/itemList')
  .post(controllers.addItems)
  .get(controllers.retrieveItems)

eventRouter.route('/:eventId/reminders')
  .post(controllers.addReminder)
  .get(controllers.retrieveReminders)

eventRouter.route('/:eventId/photos')
  .post(controllers.addPhotos)
  .get(controllers.retrievePhotos)

app.listen(3000, function() {
  console.log('Gitgreat server is listening on port 3000');
});
