const db = require('../db/db.js');
const utils = require('./utils.js');

const cloudinary = require('cloudinary');
const multiparty = require('multiparty');

// Wells's cloudinary api key, replace with your own as this key will be deleted soon
cloudinary.config({
 cloud_name: 'dhdysf6qc',
 api_key: '299727653385491',
 api_secret: 'vshmxkEjzRiylUjrXi20qk67hKA'
});

module.exports = {
  addEvent: function(req, res, next) {
    db.Events.create({
      name: req.body.name,
      where: req.body.where,
      when: req.body.when
    })
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      console.log('Error: ', err);
      utils.sendResponse(res, 400);
    });
  }, 
  retrieveEvents: function(req, res, next) {
    db.Events.findAll({order: [['when', 'DESC']]})
    .then(function(events) {
      utils.sendResponse(res, 200, 'application/json', events);
    })
    .catch(function(err) {
      console.log("err", err);
      utils.sendResponse(res, 400);
    });
  },
  addItems: function(req, res, next) {
    var eventId = req.params.eventId;
    db.ItemLists.create({
      item: req.body.item,
      owner: req.body.owner,
      cost: req.body.cost,
      eventId: eventId
    })
    .then(function(item) {
      utils.sendResponse(res, 201, 'text/html', 'item successfully posted');
    })
    .catch(function(err) {
      console.log('Error: ', err);
      utils.sendResponse(res, 400);
    });
  },
  retrieveItems: function(req, res, next) {
    var eventId = req.params.eventId;
    db.ItemLists.findAll({where: {eventId: eventId}})
    .then(function(items) {
      utils.sendResponse(res, 200, 'application/json', items);
    })
    .catch(function(err) {
      console.log('error', err);
      utils.sendResponse(res, 400);
    })
  }, 
  addReminder: function(req, res, next) {
    var eventId = req.params.eventId;
    db.Reminders.create({
      phoneNumber: req.body.phoneNumber,
      msg: req.body.msg,
      when: req.body.when,
      eventId: eventId
    })
    .then(function(item) {
      utils.sendResponse(res, 201, 'text/html', 'reminder successfully posted');
    })
    .catch(function(err) {
      console.log('Error: ', err);
      utils.sendResponse(res, 400);
    });
  }, 
  retrieveReminders: function(req, res, next) {
    var eventId = req.params.eventId;
    db.Reminders.findAll({where: {eventId: eventId}})
    .then(function(reminders) {
      utils.sendResponse(res, 200, 'application/json', reminders);
    })
    .catch(function(err) {
      utils.sendResponse(res, 400);
    })
  },
  addPhotos: function(req, res) {
    var eventId = req.params.eventId;
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      cloudinary.uploader.upload(files.imageFile[0].path, function(result) {
        db.Photos.create({url: result.url, eventId: eventId})
        .then(function(event) {
          utils.sendResponse(res, 200, 'application/json', event);
        })
        .catch(function(err) {
          console.log('err ', err);
          utils.sendResponse(res, 400);
        });
       });
    });
  },
  retrievePhotos: function(req, res) {
    var eventId = req.params.eventId;
    db.Photos.findAll({
      where: {
        eventId: eventId
      }
    })
    .then(function(photos) {
      utils.sendResponse(res, 200, 'application/json', photos);
    })
    .catch(function(err) {
      console.log(err);
      utils.sendResponse(res, 400);
    })
  }
}