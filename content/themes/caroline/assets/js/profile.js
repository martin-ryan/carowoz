var helper = require('./helper');

var myModule = function ( options ) {

	var statsDest = document.getElementById("profile-stats"),
      highlightsDest = document.getElementById("profile-highlights")
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
		stats();
		highlights();
		matchHeight();
	}

	function stats () {
		for (var i = 0; i < profile.stats.length; i++) {
			var statEle = helper.createTag({class : "", content : profile.stats[i][0] + " : " + profile.stats[i][1], tag : "p"});
			statsDest.appendChild(statEle);
		}
	}

	function highlights () {
		profile.highlights.forEach( function(year){
			var rowEle = helper.createBootRow({ class : "row-top-spacer-10 highlight" });
			var yearEle = helper.createBootCol({ class : "col-xs-2", content : year[0] });
			var highlightsEle = helper.createBootCol({ class : "col-xs-10 text-left", content : year[1] });

			year.forEach( function(highlight, index) {
				if (index > 1) {
					var lineBreak = helper.createTag({ tag : "br" });
					var highlightEle = helper.createTag({ tag : "span", content : highlight });

					highlightsEle.appendChild(lineBreak);
					highlightsEle.appendChild(highlightEle);
				}
			});

			rowEle.appendChild(yearEle);
			rowEle.appendChild(highlightsEle);
			highlightsDest.appendChild(rowEle);
		});
	}

	function matchHeight () {
		$(function() {
			$('.profile-box-mh').matchHeight();
		});
	}
};

module.exports = myModule;