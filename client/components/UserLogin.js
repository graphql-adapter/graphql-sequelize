var React = require('react'),
    $ = require('jQuery');

var UserLogin = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      age:''
    };
  },

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

    render: function() {
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
            </div>
      )
    },
});

module.exports = UserLogin;
