var React = require('react'),
    $ = require('jQuery');

var UpdateAge = React.createClass({
  getInitialState: function() {
    return {
      userAge: '',
      username: ''
    };
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

    render: function() {
    	return (
    	      <div>
            <h3>Update your age!</h3>
            <form onSubmit = {this.updateUserAge}>
              <input type = "text" username = {this.state.username} defaultValue = "" placeholder = "enter name" onChange = {this.handleChangeUsername}/>
              <br/>
              <input type = "text" userAge = {this.state.userAge} defaultValue = "" placeholder = "enter new age" onChange = {this.handleChangeUserAge}/>
              <button>Change Age</button>
            </form>
            </div>
      )
    },
});

module.exports = UpdateAge;
