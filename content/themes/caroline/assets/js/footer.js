var helper = require('./helper');

var myModule = function ( options ) {

	var footer = document.getElementById("footer-partners");
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
		// place partner images into footer and set classes
	  for (var i = 0; i < partners.length; i++) {
	    var partnerEle = helper.createTag({ tag : "img", class : "footer-partners-item" })
					partnerLink = helper.createTag({ tag : "a"})
			;

			partnerLink.href = partners[i][3];
			partnerLink.target = "_blank";
	    partnerEle.src = partners[i][1];
			partnerLink.appendChild(partnerEle);
			footer.appendChild(partnerLink);
	  }
	}

};

module.exports = myModule;