var helper = require('./helper');

var myModule = function ( options ) {

	var photosContainerEle = document.getElementById("gallery"),
      imageEles = [].slice.call(photosContainerEle.getElementsByTagName("img")),
			// imageEles = photosContainerEle.childNodes,
			colWidth,
      numCols,
			photosPerCol,
      photosWide = [],
      photosTall = [],
      photos = [],
			gallery = {},
			photosWide = photosWide || [],
			photosTall = photosTall || [],
			numWide,
			numTall,
			numPhotos,
			photosMasonry = document.getElementById("photos-masonry"), //lives in page-gallery.hbs
			photosLightbox = document.getElementById("photos-lightbox") // lives in default.hbs
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

		createGalleryCollection();
		deleteImgTags();
		combinePhotos();
		render();
  }

	function render () {
		placePhotos();
	}

	function createGalleryCollection () {

		// gallery = imageEles
		// .map(function (ele) {
		// 	return {
		// 		src: ele.getAttribute("src"),
		// 		thumbHeight: helper.calcHeight( helper.aspectRatio(ele.clientWidth, ele.clientHeight), colWidth ),
		// 		thumbWidth: colWidth,
		// 		thumb: {},
		// 		lightbox: {}
		// 	}
		// });
		//
		// gallery.forEach(function (obj) {
		// 	var lightboxImage = helper.createTag({ tag : "img"});
		// 	lightboxImage.src = obj.src;
		//
		// 	obj.thumb = helper.createTag({class : "photo", tag : "div"});
		// 	obj.thumb.style["background-image"] = "url(" + obj.src + ")";
		// 	obj.thumb.style.height = obj.thumbHeight + "px";
		// 	obj.thumb.style.width = obj.thumbWidth + "px";
		//
		// 	obj.thumbWidth > obj.thumbHeight ? obj.orientation = "horizontal" : obj.orientation = "vertical"
		//
		// 	obj.link = helper.createTag({ tag : "a"});
		// 	obj.link.appendChild(obj.thumb);
		//
		// 	obj.lightbox = helper.createTag({ tag : "a", class : "lightbox"});
		// 	obj.lightbox.href = "#_";
		// 	obj.lightbox.appendChild(lightboxImage);
		// });
		//
		// console.log(gallery);
		for (var i = 0; i < imageEles.length; i++) {
			// store single image from array
			var image = imageEles[i],
					// create new photo element tag
					photoEle = helper.createTag({class : "photo", tag : "div"}),
					imageSource = image.getAttribute("src"),
					imageAspectRatio = helper.aspectRatio(image.clientWidth, image.clientHeight),
					ratioWidth = imageAspectRatio[0],
					ratioHeight = imageAspectRatio[1],
					// cross multiply to determine height from width according to aspect ratio
					imageHeight = (colWidth * ratioHeight) / ratioWidth
			;

			// Style divs
			// console.log("width: " + colWidth + " height: " + imageHeight);
			photoEle.style["background-image"] = "url(" + imageSource + ")";
			photoEle.style.height = imageHeight + "px";
			photoEle.style.width = colWidth + "px";

			// Store in wide or tall image array
			if (ratioWidth > ratioHeight) {
				photoEle.classList.add("wide");
				photosWide.push(photoEle);
			} else {
				photoEle.classList.add("tall");
				photosTall.push(photoEle);
			}
		}

		numWide = photosWide.length;
		numTall = photosTall.length;
	}

	function deleteImgTags () {
		for (var i = imageEles.length - 1; i >= 0; i--) {
			imageEles[i].remove();
		}
	}

	function combinePhotos () {
		// add wide and tall photos back and forth, clone when needed to make sure there are equal amounts
		for (var i = 0; i < numTall || i < numWide; i++) {
			if (photosWide[i] == undefined) {
				photos.push(photosWide[i%numWide].cloneNode());
			} else {
				photos.push(photosWide[i]);
			}

			if (photosTall[i] == undefined) {
				photos.push(photosTall[i%numTall].cloneNode());
			} else {
				photos.push(photosTall[i]);
			}
		}

		numPhotos = photos.length;
		photosPerCol = (numPhotos / numCols).toFixed()
	}

	function placePhotos () {
		// Loop through each column
		for ( var col = 1; col <= numCols; col++ ) {
			var photosCol = helper.createTag({ tag : "div", class : "photos-column"});

			if ( col%2 == 1 ) {
				photos.splice(photosPerCol, 0, photos.shift());
			}
			// Calc column height
			// Add photosPerCol number of photos to column
			for ( var photo = 0; photo < photosPerCol; photo++ ) {
				var thumbnailWrapper = helper.createTag({ tag : "a"})
						lightboxWrapper = helper.createTag({ tag : "a", class : "lightbox"})
						lightboxImage = helper.createTag({ tag : "img"})
				;

				// Add photo to column
				// If column is odd reverse order of photos
				if (photos.length > 0) {
					lightboxImage.src = photos[0].style.backgroundImage.slice(5,-2);

					if (photos[0].classList.contains("wide")) {
						lightboxImage.classList.add("wide");
					} else {
						lightboxImage.classList.add("tall");
					}

					lightboxWrapper.id = "photo" + col + "-" + photo;
					lightboxWrapper.href = "#_";
					lightboxWrapper.appendChild(lightboxImage);
					photosLightbox.appendChild(lightboxWrapper);

					thumbnailWrapper.href = "#photo" + col + "-" + photo;
					thumbnailWrapper.appendChild(photos[0]);
					photosCol.appendChild(thumbnailWrapper);
					photos.shift();
				}



				if ( col%2 == 1 ) {
					var photoIndex = (photosPerCol - 1) - photo;

					// Lightbox image
					// console.log(photos[photoIndex].style.backgroundImage.slice(5,-2));
					// lightboxImage.src = photos[photoIndex].style.backgroundImage.slice(5,-2);

					// if (photos[photoIndex].classList.contains("wide")) {
					// 	lightboxImage.classList.add("wide");
					// } else {
					// 	lightboxImage.classList.add("tall");
					// }
					//
					// lightboxWrapper.id = "photo" + i + "-" + j;
					// lightboxWrapper.href = "#_";
					// lightboxWrapper.appendChild(lightboxImage);
					// photosLightbox.appendChild(lightboxWrapper);

					// Lightbox thumbnail
					// thumbnailWrapper.href = "#photo" + col + "-" + photo;
					// thumbnailWrapper.appendChild(photos[photoIndex]);
					// photosCol.appendChild(thumbnailWrapper);

					// Remove photo div from array
					// photos.splice(photoIndex,1);

				} else {

					// Lightbox image
					// lightboxImage.src = photos[0].style.backgroundImage.slice(5,-2);
					//
					// if (photos[0].classList.contains("wide")) {
					// 	lightboxImage.classList.add("wide");
					// } else {
					// 	lightboxImage.classList.add("tall");
					// }
					//
					// lightboxWrapper.id = "photo" + i + "-" + j;
					// lightboxWrapper.href = "#_";
					// lightboxWrapper.appendChild(lightboxImage);
					// photosLightbox.appendChild(lightboxWrapper);

					// Lightbox thumbnail
					// thumbnailWrapper.href = "#photo" + col + "-" + photo;
					// thumbnailWrapper.appendChild(photos[photoIndex]);
					// photosCol.appendChild(thumbnailWrapper);
					//
					// thumbnailWrapper.appendChild(photos[0]);
					// photosCol.appendChild(thumbnailWrapper);
					// photos.shift();
				}
			}

			// Add column to DOM
			photosMasonry.appendChild(photosCol);
		}
	}

};

module.exports = myModule;