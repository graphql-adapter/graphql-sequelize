var React = require('react');
var $ = require('jQuery');

var Page = React.createClass({

  getInitialState: function(){
    return {name: "",
    age:""
    } ;
  },

handleChangeName: function(event) {
    console.log('handle');
    this.setState({
      name: event.target.value
    })
  },
handleChangeAge: function(event) {
    console.log('handle');
    this.setState({
      age: event.target.value
    })
  },

addUser: function(event){
  event.preventDefault();
  console.log("this was run first");
  console.log('name:', this.state.name,'AGE',this.state.age);
    $.post('/user', {'name': "Ken", 'age': 34}, function(data){
      console.log(data);
    });
},


render: function() {
  console.log("renderannnnnggggg");
	return (
	      <div>
          <form onSubmit = {this.addUser}>
              <input type = "text"  name = {this.state.name} defaultValue = "" placeholder="Enter Name" onChange = {this.handleChangeName}/>
              <br/>
              <input type = "text"  age = {this.state.age} defaultValue = "" placeholder="Age" onChange = {this.handleChangeAge}/>
               <br/>
              <button> Enter </button>
          </form>
        pagecomponent
	      </div>
	    )
  }
});

module.exports = Page;
