var helper = require('./helper');

var myModule = function ( options ) {

	var col1 = document.getElementById("gallery-col1")
			col2 = document.getElementById("gallery-col2")
			col3 = document.getElementById("gallery-col3")
			imageColumns = [col1, col2, col3]
      // imageEles = [].slice.call(photosContainerEle.getElementsByTagName("img")
			photosMasonry = document.getElementById("photos-masonry") //lives in page-gallery.hbs
			photosLightbox = document.getElementById("photos-lightbox") // lives in default.hbs
  ;

  init();

	// window.onresize = init;

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		render();
  }

	function render () {
		imageColumns.forEach( function ( column, colNum ){
			column.childNodes.forEach( function ( image, imageNum ){
				// image.style.height = "20px";
				console.log(image);
				// var thumbnailWrapper = helper.createTag({ tag : "a"});
				//
				// thumbnailWrapper.href = "#photo" + colNum + "-" + imageNum;
				// console.log(thumbnailWrapper);
			});
		})
	}

	function createLightbox(){
		// var lightboxWrapper = helper.createTag({ tag : "a", class : "lightbox"});
		// var lightboxImage = helper.createTag({ tag : "img"});
		//
		// lightboxImage.src = photos[0].style.backgroundImage.slice(5,-2);
		// lightboxWrapper.id = "photo" + col + "-" + photo;
		// lightboxWrapper.href = "#_";
		// lightboxWrapper.appendChild(lightboxImage);
		// photosLightbox.appendChild(lightboxWrapper);
	}

	function createThumbnail(){

		// thumbnailWrapper.appendChild(photos[0]);
		// photosCol.appendChild(thumbnailWrapper);
	}

};

module.exports = myModule;