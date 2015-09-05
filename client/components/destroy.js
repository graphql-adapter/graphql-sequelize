var React = require('react'),
    $ = require('jQuery');

var Destroy = React.createClass({
  getInitialState: function(){
    return {
      destroyName:''
    };
  },

  //HANDLES WHEN YOU WANT TO OBLITERATE YOURSELF..... OR OTHERS.
  handleDestroy: function (event) {
    this.setState({
      destroyName: event.target.value
    })
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

    render: function() {
      //console.log("renderannnnnggggg");
    	return (
    	      <div>
            <h3>Eliminate a person</h3>
            <form onSubmit = {this.destroyUser}>
              <input type = "text" destroyName = {this.state.destroyName} defaultValue = "" placeholder = "destroy" onChange = {this.handleDestroy}/>
              <button> Destroy </button>
            </form>
            </div>
      )
    },
});

module.exports = Destroy;
