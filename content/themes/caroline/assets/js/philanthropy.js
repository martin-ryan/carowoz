var helper = require('./helper');

var myModule = function ( options ) {

  var imageSource = document.getElementById("images")
      images = [].slice.call(imageSource.getElementsByTagName('img'))
      imageDest = document.getElementById("philo-images")
  ;

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
    imageSource.remove();
    console.log(images);

		render();
  }

	function render () {
    images.forEach(function(image) {

      var colWrapper = helper.createTag({ tag : "div", class : "col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2" });
      var row = helper.createTag({ tag : "div", class : "row top-spacer-50"});

      image.style.width = '100%';
      colWrapper.appendChild(image);
      row.appendChild(colWrapper);
      imageDest.appendChild(row);

    });
	}

};

module.exports = myModule;