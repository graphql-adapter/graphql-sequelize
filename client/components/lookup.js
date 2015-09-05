var React = require('react'),
    $ = require('jQuery');

var Lookup= React.createClass({
      getInitialState: function(){
        return {
          loginName:'',
          displayName:'',
          displayAge:''
        };
      },

      //handles when you look up the name based on the age
       handleChangeloginName: function(event) {
              //console.log('handle');
              this.setState({
                loginName: event.target.value
              })
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

        render: function() {
          //console.log("renderannnnnggggg");
        	return (
        	      <div>
                <h3>Look up the age of someone</h3>
                <form onSubmit = {this.getUserAge}>
                  <input type = "text"  loginName = {this.state.loginName} defaultValue = "" placeholder="Enter Name" onChange = {this.handleChangeloginName}/>
                  <button> Check for Age </button>
                </form>
                <p>{this.state.displayName} is {this.state.displayAge}</p>
                </div>
          )
        },
    });

    module.exports = Lookup;
