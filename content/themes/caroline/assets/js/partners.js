var helper = require('./helper');

var myModule = function ( options ) {

	var partnersEle = document.getElementById("partners")
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
		for (var i = 0; i < partners.length; i++) {
			var partnerEle = helper.createBootCol({class : "col-xs-12 nopadding top-spacer-50"})
					imageEle = helper.createTag({class : "partner-image", tag : "div"})
					titleEle = helper.createTag({class : "bold-uppercase text-center", tag : "h1", content : partners[i][0]})
					descriptionEle = helper.createTag({class : "text-justified padding-30", tag : "p", content : partners[i][2]})
					partnerLink = helper.createTag({ tag : "a"})
			;

			partnerLink.href = partners[i][3];
			partnerLink.target = "_blank";
			imageEle.style.backgroundImage = "url(" + partners[i][1] + ")";
			partnerEle.appendChild(imageEle);
			partnerEle.appendChild(titleEle);
			partnerEle.appendChild(descriptionEle);
			partnerLink.appendChild(partnerEle);

			partnersEle.appendChild(partnerLink);
		}
	}

};

module.exports = myModule;