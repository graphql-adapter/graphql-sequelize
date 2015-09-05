var React = require('react');
var $ = require('jQuery');
var UserLogin = require('./UserLogin');
var Lookup = require('./lookup');
var UpdateAge = require('./updateAge');
var Destroy = require('./destroy');
var AddFriend = require('./addFriend');

var Page = React.createClass({


render: function() {
	return (
	      <div>
          <UserLogin/>
          <Lookup/>
          <UpdateAge/>
          <Destroy/>
          <AddFriend/>
	      </div>
	    )
  }
});

module.exports = Page;
