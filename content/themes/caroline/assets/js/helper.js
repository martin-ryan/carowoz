var myModule = (function ( options ) {

		var int = int,
				object = {}
	  ;

	  init()

	  // PUBLIC API
	  return {
	    aspectRatio: aspectRatio,
			createBootCol: createBootCol,
			createBootRow: createBootRow,
			createTag: createTag,
			calcHeight: calcHeight
	  }

	  function init ()  {

	  }

		// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
		// function aspectRatio(numerator,denominator){
		//   var gcd = function gcd(a,b){
		//     return b ? gcd(b, a%b) : a;
		//   };
		//   gcd = gcd(numerator,denominator);
		//   return {
		// 		width: numerator/gcd,
		// 		height: denominator/gcd
		// 	};
		// }

		function aspectRatio(numerator,denominator){
		  var gcd = function gcd(a,b){
		    return b ? gcd(b, a%b) : a;
		  };
		  gcd = gcd(numerator,denominator);
		  return [numerator/gcd, denominator/gcd];
		}

		function calcHeight(aspectRatio, width){
			return (width * aspectRatio.height) / aspectRatio.width;
		}

		function createBootRow(options) {
		  var rowEle = document.createElement("div");

		  rowEle.setAttribute("class", "row " + options.class);
		  // options.topSpacer ? rowEle.setAttribute("class", "row row-top-spacer") : rowEle.setAttribute("class", "row");
		  return rowEle;
		}

		function createBootCol(options) {
		  var colEle = document.createElement("div"),
		      contentWrapperEle = document.createElement(options.contentWrapper);

		  options.class ? colEle.setAttribute("class", options.class) : colEle.setAttribute("class", "col-xsp-12");

		  if (options.contentWrapper) {
		    contentWrapperEle.textContent = options.content;
		    colEle.appendChild(contentWrapperEle);
		  } else {
		    colEle.textContent = options.content;
		  }

		  return colEle;
		}

		function createTag (options) {
		  var tagEle = document.createElement(options.tag);

		  tagEle.setAttribute("class", options.class);
		  tagEle.textContent = options.content;
		  return tagEle;
		}

})();

module.exports = myModule;