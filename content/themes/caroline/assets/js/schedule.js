var helper = require('./helper'),
	nextMatch = require('./component/next-match')
	;

var myModule = function ( options ) {
 // NOTE: this is a duplicate of next-match component, need to DRY
	var schedule = document.getElementById("schedule"),
		scheduleHeader = helper.createTag({ class : "bold-uppercase", content : "2017 schedule", tag : "h1" }),
		scheduleCol = helper.createTag({ class : "col-xsp-12 col-xsp-offset-0 col-xs-10 col-xs-offset-1", tag : "div" }),
		scheduleRow = helper.createTag({ class : "row row-top-spacer text-center", tag : "div" }),
		//
		results = document.getElementById("results"),
		resultsHeader = helper.createTag({ class : "bold-uppercase", content : "2016 results", tag : "h1"}),
		resultsCol = helper.createTag({ class : "col-xsp-12 col-xsp-offset-0 col-xs-10 col-xs-offset-1", tag : "div" }),
		resultsRow = helper.createTag({ class : "row row-top-spacer text-center", tag : "div" }),
		resultsViewButton = helper.createTag({ class : "bold-uppercase", content : "- view -", tag : "a"})
		//
		titleEle = document.getElementById("nextmatch-title"), // next-match
      	subtitleEle = document.getElementById("nextmatch-subtitle"), //next-match
		;

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		schedule.classList.add("row-top-spacer");
		scheduleCol.appendChild(scheduleHeader);
		scheduleRow.appendChild(scheduleCol);

		resultsViewButton.setAttribute("role", "button");
		resultsViewButton.setAttribute("onclick", "this.textContent == '- view -' ? (this.textContent = '- close -', results.style.display = 'table') : (this.textContent = '- view -', results.style.display = 'none')");

		results.classList.add("row-top-spacer-10");
		resultsCol.appendChild(resultsHeader);
		resultsCol.appendChild(resultsViewButton);
		resultsRow.appendChild(resultsCol);

		render();
  }

	function render () {
		nextMatch();
		createSchedule();
		createResults();
	}

	function createSchedule () {
		schedule.parentNode.insertBefore(scheduleRow, schedule);
	}

	function createResults () {
		results.parentNode.insertBefore(resultsRow, results);
	}

};

module.exports = myModule;