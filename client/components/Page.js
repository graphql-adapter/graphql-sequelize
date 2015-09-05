var React = require('react'),
 $ = require('jQuery'),
 UserLogin = require('./UserLogin'),
 Lookup = require('./lookup'),
 UpdateAge = require('./updateAge'),
 Destroy = require('./destroy'),
 AddFriend = require('./addFriend');

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
