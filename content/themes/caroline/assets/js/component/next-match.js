var myModule = function ( options ) {

	var titleEle = document.getElementById("nextmatch-title"),
			subtitleEle = document.getElementById("nextmatch-subtitle")
  ;

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		render();
  }

	function render () {
		if (titleEle) {
			titleEle.textContent = nextMatch.location;
			subtitleEle.textContent = nextMatch.date;			
		}
	}

};

module.exports = myModule;