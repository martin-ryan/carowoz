var	nextMatch = require('./component/next-match')
		carousel = require('./component/carousel')
;

var myModule = function ( options ) {

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		carousel();
		nextMatch();
		render();
  }

	function render () {

	}

};

module.exports = myModule;