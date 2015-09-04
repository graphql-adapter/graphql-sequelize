var React = require('react');
var $ = require('jQuery');

var Page = React.createClass({
//establish initial state
  getInitialState: function(){
    return {name: "",
    age:"",
    userAge: '',
    username: '',
    loginName:"",
    displayName:"",
    displayAge:"",
    destroyName:'',
    user1:'',
    user2:''
    } ;
  },
//handles intital creation of name and age
handleChangeName: function(event) {
    this.setState({
      name: event.target.value
    })
  },
handleChangeAge: function(event) {
    //console.log('handle');
    this.setState({
      age: event.target.value
    })
  },

//handles when you look up the name based on the age
 handleChangeloginName: function(event) {
        //console.log('handle');
        this.setState({
          loginName: event.target.value
        })
 },

 //handles when you enter a name to change the age.
 handleChangeUsername: function(event) {
   this.setState({
     username: event.target.value
   })
 },
 handleChangeUserAge: function(event) {
    this.setState({
      userAge: event.target.value
    })
  },

//HANDLES WHEN YOU WANT TO OBLITERATE YOURSELF..... OR OTHERS.
handleDestroy: function (event) {
  this.setState({
    destroyName: event.target.value
  })
},

//Handles the adding of a friend. enter in name and who you want to add as friend.
 handleUser1: function(event) {
   this.setState({
     user1: event.target.value
   })
 },
 handleUser2: function(event) {
   this.setState({
     user2: event.target.value
   })
 },

//function to add one's name and age and makes post request to database
//sets data sent to database
addUser: function(event){
  console.log("add event", event.target);
  event.preventDefault();
  console.log("this was run first");
  var data  = {'name' :this.state.name, 'age' :this.state.age};
  console.log('data:', data);
  this.UserSignup(data);
  //console.log('name:', this.state.name,'age:',this.state.age);
},
//actual post request to database
UserSignup: function(user){
    console.log('user:', user);
    $.ajax({
      //dataType: 'json', //dataType requests json
      contentType: 'application/json', //contentType sends json
      type: 'POST',
      url: '/user',
      data: JSON.stringify(user),
      success: function(data){
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/user', status, err.toString());
      }.bind(this)
    });
},

//this is where we make the function to get the age based on name entered
getUserAge: function(event){
  event.preventDefault();
  console.log("send name being run");
  var data = {'name' :this.state.loginName};
  console.log('getUserAgedata:', data);
  this.userAge(data);
},
userAge: function(user){
    console.log('user:', user);
    $.ajax({
      dataType: 'json', //dataType requests json
      contentType: 'application/json', //contentType sends json
      type: 'POST',
      url: '/age',
      data: JSON.stringify(user),
      success: function(data){
        console.log('return age data', data);
        this.setState ({
          displayAge:data.age
        });
        console.log(this.state.displayAge);
        this.setState({
          displayName:data.name
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/age', status, err.toString());
      }.bind(this)
    });
},

//update the age based on name entered
 updateUserAge: function(event) {
   event.preventDefault();
   console.log('userage being ran');
   var data = {'name': this.state.username, 'age': this.state.userAge};
   console.log('data for userage update', data);
   this.updateAge(data);
 },
 updateAge: function(user) {
   $.ajax({
     //dataType: 'json', //dataType requests json
     contentType: 'application/json', //contentType sends json
     type: 'POST',
     url: '/updateUser',
     data: JSON.stringify(user),
     success: function(data){
       console.log(data);
     }.bind(this),
     error: function(xhr, status, err){
       console.error('/updateUser', status, err.toString());
     }.bind(this)
   });
},

//FUNCTION TO KILLLLLLLLL
 destroyUser: function(event){
  event.preventDefault();
  console.log("destroying being run");
  var data = {'name' :this.state.destroyName};
  console.log('destroydata:', data);
  this.destroyer(data);
},
 destroyer: function(user){
 $.ajax({
   //dataType: 'json', //dataType requests json
   contentType: 'application/json', //contentType sends json
   type: 'POST',
   url: '/destroyUser',
   data: JSON.stringify(user),
   success: function(data){
     console.log(data);
   }.bind(this),
   error: function(xhr, status, err){
     console.error('/destroyUser', status, err.toString());
   }.bind(this)
 });
 },

 //function to add data to addFriend
 addFriend: function(event) {
    event.preventDefault();
    console.log('adding buddy');
    var data = {"user1": this.state.user1, "user2": this.state.user2};
    this.friend(data);
  },
 //Creates post to add friend.
 friend: function(user){
 $.ajax({
   //dataType: 'json', //dataType requests json
   contentType: 'application/json', //contentType sends json
   type: 'POST',
   url: '/friend',
   data: JSON.stringify(user),
   success: function(data){
     console.log(data);
   }.bind(this),
   error: function(xhr, status, err){
     console.error('/friend', status, err.toString());
   }.bind(this)
 });
 },

render: function() {
  //console.log("renderannnnnggggg");
	return (
	      <div>
        <h3>Create your name and age</h3>
          <form onSubmit = {this.addUser}>
            <input type = "text"  name = {this.state.name} defaultValue = "" placeholder="Enter Name" onChange = {this.handleChangeName}/>
            <br/>
            <input type = "text"  age = {this.state.age} defaultValue = "" placeholder="Age" onChange = {this.handleChangeAge}/>
            <br/>
            <button>Add User</button>
          </form>

          <h3>Look up the age of someone</h3>
          <form onSubmit = {this.getUserAge}>
            <input type = "text"  loginName = {this.state.loginName} defaultValue = "" placeholder="Enter Name" onChange = {this.handleChangeloginName}/>
            <button> Check for Age </button>
          </form>
          <p>{this.state.displayName} is {this.state.displayAge}</p>

          <h3>Update your age!</h3>
          <form onSubmit = {this.updateUserAge}>
            <input type = "text" username = {this.state.username} defaultValue = "" placeholder = "enter name" onChange = {this.handleChangeUsername}/>
            <br/>
            <input type = "text" userAge = {this.state.userAge} defaultValue = "" placeholder = "enter new age" onChange = {this.handleChangeUserAge}/>
            <button>Change Age</button>
          </form>

          <h3>Eliminate a person</h3>
          <form onSubmit = {this.destroyUser}>
            <input type = "text" destroyName = {this.state.destroyName} defaultValue = "" placeholder = "destroy" onChange = {this.handleDestroy}/>
            <button> Destroy </button>
          </form>

          <h3>Add Friend</h3>
          <form onSubmit = {this.addFriend}>
            <input type = "text" user1 = {this.state.user1} defaultValue = "" placeholder = "username" onChange = {this.handleUser1}/>
            <input type = "text" user2 = {this.state.user2} defaultValue = "" placeholder = "friend" onChange = {this.handleUser2}/>
            <button>Add Buddy</button>
          </form>
	      </div>
	    )
  }
});

module.exports = Page;
