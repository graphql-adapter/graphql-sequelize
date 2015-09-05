var React = require('react'),
    $ = require('jQuery');

var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      user1:'',
      user2:'',
      displayFriends:'',
      displayFriends2:''
    };
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
       console.log('data',data[0].name);
       var friends = data.map(function(element){
         return element.name + " ";
       });
       console.log(friends);
       this.setState({
         displayFriends:friends
       });

       console.log("display",this.state.displayFriends)
     }.bind(this),
     error: function(xhr, status, err){
       console.error('/friend', status, err.toString());
     }.bind(this)
   });
   },

    render: function() {
    	return (
    	      <div>
            <h3>Add Friend</h3>
            <form onSubmit = {this.addFriend}>
              <input type = "text" user1 = {this.state.user1} defaultValue = "" placeholder = "username" onChange = {this.handleUser1}/>
              <input type = "text" user2 = {this.state.user2} defaultValue = "" placeholder = "friend" onChange = {this.handleUser2}/>
              <button>Add Buddy</button>
            </form>
            <p>{this.state.displayFriends} </p>
            </div>
      )
    },
});

module.exports = AddFriend;
