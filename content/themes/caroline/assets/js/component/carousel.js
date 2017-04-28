var myModule = function ( options ) {

	var headersSource = document.getElementById('header-images')
			imageEles = headersSource.getElementsByTagName('img')
			numImages = imageEles.length
			divs = []
			containers = []
			carouselIndex = 0
			counter = 0
  ;

  init()

  // PUBLIC API
  return {
    init: init
  }

  function init ()  {

		// get header div and img eles
		for (var i = 0; i < numImages; i++) {
			divs.push(document.getElementById("header-div-" + i));
			containers.push(document.getElementById("header-container-" + i));
		}

		render();
  }

	function render () {
		// Apply image src to header img and div tags
		for (var i = 0; i < numImages; i++) {
			divs[i].style.backgroundImage = "url(" + imageEles[i].src + ")";
		}

		setInterval(changeHeader, 2500);

		deleteSource();
	}

	function changeHeader () {
		carouselIndex = counter%numImages;

		for (var i = 0; i < numImages; i++) {
			containers[i].classList.remove("active");
		}

		containers[carouselIndex].classList.add("active");

		counter++;
	}

	function deleteSource () {
		// Delete image elements
		for (var i = imageEles.length - 1; i >= 0; i--) {
			 imageEles[i].remove();
		}
		headersSource.remove();
	}

};

module.exports = myModule;