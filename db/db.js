var Sequelize = require('sequelize');
var mysql = require('mysql');

mysql.createConnection({
  user: root,
  password: null,
  database: 'gitgreat'
});

var sequelize = new Sequelize('gitgreat', 'root', '', {
  host: 'localhost', dialect: 'mysql'
});

var Events = sequelize.define('events', {
  name: {
    type: Sequelize.STRING
  },
  where: {
    type: Sequelize.STRING
  },
  when: {
    type: Sequelize.DATE
  }
});

var ItemLists = sequelize.define('itemlists', {
  item: {
    type: Sequelize.STRING
  },
  owner: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.STRING
  },
});

var Reminders = sequelize.define('reminders', {
  phoneNumber: {
    type: Sequelize.INTEGER
  },
  msg: {
    type: Sequelize.STRING
  },
  when: {
    type: Sequelize.DATE
  },
});

var Photos = sequelize.define('photos', {
  url: {
    type: Sequelize.STRING
  }
});

//Create associations such that ItemListTable and ReminderTable contain eventId
ItemLists.belongsTo(Events);
Reminders.belongsTo(Events);
Photos.belongsTo(Events);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });



module.exports.Photos = Photos;
module.exports.Events = Events;
module.exports.ItemLists = ItemLists;    
module.exports.Reminders = Reminders;