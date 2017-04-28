var myModule = function ( options ) {

	var images = document.getElementsByTagName("img")
  ;

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		for (var i = 0; i < images.length; i++) {
			images[i].classList.add("img-responsive");
			images[i].classList.add("margin-center");
		}
		// render();
  }

	function render () {

	}

};

module.exports = myModule;