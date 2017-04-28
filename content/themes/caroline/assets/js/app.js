var home = require('./home'),
		news = require('./news'),
		schedule = require('./schedule'),
		profile = require('./profile'),
		gallery = require('./gallery'),
		partners = require('./partners'),
		philanthropy = require('./philanthropy'),
		footer = require('./footer'),
		post = require('./post.js')
	;


var app = (function (options) {
	var page = location.pathname.split("/").join("")
	;

  init()

  // PUBLIC API
  return {
    init: init,
  }

  function init ()  {
		addEventListener('load', function () {
			if (page == "gallery") {
				gallery();
			}
		});

		$(document).ready(function() {
			render(page);
		});
  }

	function render (page) {
		switch (page) {
		case "":
			home();
			break;
		case "news":
			news();
			break;
		case "schedule":
			schedule();
			break;
		case "profile":
			profile();
			break;
		case "gallery":
			// instead added event listener to make sure image assets are loaded first
			break;
		case "partners":
			partners();
			break;
		case "philanthropy":
			philanthropy();
			break;
		default:
			post();
		}

		footer();
	}

})();