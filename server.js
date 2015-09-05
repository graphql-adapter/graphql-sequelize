var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('client'));

var sequelize = new Sequelize('postgres://localhost/test');

var User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  // id:{
  //   type: Sequelize.INTEGER,
  //   field: 'id'
  // },
  age: {
    type: Sequelize.STRING,
    field: 'age'
  }
  // friend: {
  // type: Sequelize.STRING,
  // field: 'friend'
  // }
}, {
freezeTableName: true
});

// var Friend = sequelize.define('friend', {
//   User1: {
//     type: Sequelize.STRING,
//     field: 'name'
//   },
//   User2: {
//     type: Sequelize.STRING,
//     field: 'name'
//   }
//
// }, {
// freezeTableName: true
// });
// sequelize
//   .sync({ force: true })
//   .then(function() {
//     // Even if we didn't define any foreign key or something else,
//     // Sequelize will create a table SourcesTargets.
//   });
//Friend.sync();
//User.hasMany(Friend);

User.belongsToMany(User, {as: 'friends', through: 'friendships'});
sequelize.sync().then(function(){});

app.post('/friend', function(req,res){
  console.log('body:',req.body);
User.findOrCreate({
  where: {
    name: req.body.user1
  },
  defaults: {
    age: ''
  }
}).spread(function(userone, created){
  User.findOrCreate({
    where: {
      name: req.body.user2
    },
    defaults: {
      age: ''
    }
  }).spread(function(usertwo, created){
    userone.addFriend(usertwo).then(function(){
      usertwo.addFriend(userone).then(function(friends){
        userone.getFriends().then(function (friends){
          res.send(friends);
        })
      });
    });
  })
});
});


app.post('/user', function(req,res){
  console.log('body:',req.body);
  User
    .findOrCreate({
      where: {
        name : req.body.name
      },
      defaults:{
        age: req.body.age
        // friend: req.body.friend
      }
    }).spread(function(user, created){
      console.log(user.getFriends());
    })
});
//update user age
app.post('/updateUser', function(req, res) {
  console.log("updated", req.body);
  User.update(
      {age: req.body.age},
      {where:
      {name: req.body.name}
      }
      ).then(function() {
        console.log('data1:');
      })
});

//DESTROYYYYYY!!!!!!!
 app.post('/destroyUser', function (req, res) {
   console.log("RGHGHGH!! DESTROYINGGGG!!!", req.body)
   User.destroy({
    where: {
      name: req.body.name
    }
  }).then(function(){
    console.log("HUMAN. HAS. BEEN. DESTROYED. BEEPBOOPBEEP");
  })
 });

app.post('/age', function(req,res){
  console.log('body:',req.body);
  User
    .findOne({
      where: {
        name : req.body.name
       }
    }).then(function(user){
    console.log('user;', user);
    res.send(user);
    })
});


app.listen(process.env.PORT || 3000, function(err){
	if(err) throw err;
	 console.log("Listening on port 3000");
});

module.exports = app;
