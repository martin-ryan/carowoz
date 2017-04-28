var helper = require('./helper');

var myModule = function ( options ) {

	var imagesCol1 = document.getElementById("images-col1")
			imagesCol2 = document.getElementById("images-col2")
			imagesCol3 = document.getElementById("images-col3")
			imageSource = document.getElementById("image-source");
      imgSet1 = [].slice.call(imagesCol1.getElementsByTagName("img"))
			imgSet2 = [].slice.call(imagesCol2.getElementsByTagName("img"))
			imgSet3 = [].slice.call(imagesCol3.getElementsByTagName("img"))
			galleryCol1 = document.getElementById("gallery-col1") //lives in page-gallery.hbs
			galleryCol2 = document.getElementById("gallery-col2") //lives in page-gallery.hbs
			galleryCol3 = document.getElementById("gallery-col3") //lives in page-gallery.hbs
			photosLightbox = document.getElementById("photos-lightbox") // lives in default.hbs
			photosCol1 = []
			photosCol2 = []
			photosCol3 = []
			colWidth = null
			numCols = null
			photosLightbox = document.getElementById("photos-lightbox")
  ;

  init();

	window.onresize = init;

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {
		if (window.innerWidth < 376) {
			numCols = 1;
			colWidth = window.innerWidth - 40;
		} else {
			numCols = 3;
			colWidth = (window.innerWidth - 100)/3;
		}
		photosCol1 = createGalleryCollection(imgSet1);
		photosCol2 = createGalleryCollection(imgSet2);
		photosCol3 = createGalleryCollection(imgSet3);
		deleteImageSource()
		render();
  }

	function render () {
		placePhotos(photosCol1, 1, galleryCol1);
		placePhotos(photosCol2, 2, galleryCol2);
		placePhotos(photosCol3, 3, galleryCol3);
	}

	function deleteImageSource(){
		imageSourceParent = document.getElementById('content-background');
		imageSourceParent.removeChild(imageSource);
	}

	function createGalleryCollection (imgSet) {
		var photosArray = [];
		for (var i = 0; i < imgSet.length; i++) {
			// store single image from array
			var image = imgSet[i],
					// create new photo element tag
					photoEle = helper.createTag({class : "photo", tag : "div", content : ""}),
					imageSource = image.getAttribute("src"),
					imageAspectRatio = helper.aspectRatio(image.clientWidth, image.clientHeight),
					ratioWidth = imageAspectRatio[0],
					ratioHeight = imageAspectRatio[1],
					// cross multiply to determine height from width according to aspect ratio
					imageHeight = (colWidth * ratioHeight) / ratioWidth
			;

			// Style divs
			photoEle.style["background-image"] = 'url(' + imageSource + ')';
			photoEle.style.height = imageHeight + "px";
			photoEle.style.width = colWidth + "px";

			// Store in wide or tall image array
			if (ratioWidth > ratioHeight) {
				photoEle.classList.add("wide");
				photosArray.push(photoEle);
			} else {
				photoEle.classList.add("tall");
				photosArray.push(photoEle);
			}
		}
		return photosArray;
	}

	function placePhotos (imgSet, col, galleryCol) {
			for ( var i = 0; i < imgSet.length; i++ ) {
				var thumbnailWrapper = helper.createTag({ tag : "a", content : ""})
						lightboxWrapper = helper.createTag({ tag : "a", class : "lightbox", content : ""})
						lightboxImage = helper.createTag({ tag : "img", content : ""})
				;

					imageURL = imgSet[i].style.backgroundImage.slice(4,-1);
					imageURL = imageURL.replace(/\"/g,'');
					lightboxImage.src = imageURL;

					if (imgSet[i].classList.contains("wide")) {
						lightboxImage.classList.add("wide");
					} else {
						lightboxImage.classList.add("tall");
					}

					lightboxWrapper.id = "photo" + col + "-" + i;
					lightboxWrapper.href = "#_";
					lightboxWrapper.appendChild(lightboxImage);
					photosLightbox.appendChild(lightboxWrapper);

					thumbnailWrapper.href = "#photo" + col + "-" + i;
					thumbnailWrapper.appendChild(imgSet[i]);
					galleryCol.appendChild(thumbnailWrapper);
		}
	}

};

module.exports = myModule;