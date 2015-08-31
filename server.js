var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.static('client'));

var sequelize = new Sequelize('postgres://localhost/test');

var User = sequelize.define('users', {

  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  id:{
    type: Sequelize.INTEGER,
    field: 'id'
  },
  age: {
    type: Sequelize.STRING,
    field: 'age'
  }
  // friends: {
  //   type: Sequelize.STRING,
  //   field: 'friends'
  // }
}, {
freezeTableName: true
});

var Friend = sequelize.define('friend', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
}, {
freezeTableName: true
});
// sequelize
//   .sync({ force: true })
//   .then(function() {
//     // Even if we didn't define any foreign key or something else,
//     // Sequelize will create a table SourcesTargets.
//   });
Friend.sync();
User.sync();
// User.hasMany(Friend);
// Friend.belongsTo(User);

app.post('/user', function(req,res){
  console.log('body:',req.body);
  User
    .findOrCreate({
      where: {
        name : req.body.name
      },
      defaults:{
        age: req.body.age
      }
    }).spread(function(user, created){
      console.log(user.get({
        plain:true
      }));
    })
});



app.listen(process.env.PORT || 3000, function(err){
	if(err) throw err;
	 console.log("Listening on port 3000");
});

module.exports = app;
