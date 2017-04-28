// import modules
var home = require('./home');

//
// Initialize page

window.onload = function(){
  if (location.pathname.split("/").join("") == "photos") {
    customizePhotos();
  }
};

window.onresize = function(){
  if (location.pathname.split("/").join("") == "photos") {
    // placePhotos();
  }
}

$(document).ready(function() {
  customizeFooter();
  customizePage();
});

//
// Helper functions to be move to their own file

// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
function aspectRatio(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

function createBootRow(options = {class : ""}) {
  var rowEle = document.createElement("div");

  rowEle.setAttribute("class", "row " + options.class);
  // options.topSpacer ? rowEle.setAttribute("class", "row row-top-spacer") : rowEle.setAttribute("class", "row");
  return rowEle;
}

function createBootCol(options = {class : "", content : "", contentWrapper : ""}) {
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

function createTag (options = {class : "", content : "", tag : ""}) {
  var tagEle = document.createElement(options.tag);

  tagEle.setAttribute("class", options.class);
  tagEle.textContent = options.content;
  return tagEle;
}

//
// identify and initialize page customization

function customizeFooter() {
  var footer = document.getElementById("footer-partners");

  //
  // place partner images into footer and set classes
  for (var i = 0; i < partners.length; i++) {
    var partnerEle = createTag({ tag : "img" }),
        colEle = createTag({ tag : "div" });

    partnerEle.src = partners[i][1];
    colEle.classList.add("col-xsp-4", "col-xs-2", "col-md-1", "footer-partners-item");

    colEle.appendChild(partnerEle);
    footer.appendChild(colEle);
  }
};

function customizePage() {

  switch (location.pathname.split("/").join("")) {
  case "":
    customizeIndex();
    break;
  case "news":
    customizeNews();
    break;
  case "schedule":
    customizeSchedule();
    break;
  case "profile":
    customizeProfile();
    break;
  case "photos":
    // Don't want to run from $document.ready before images are loaded.
    // Using window.onload instead because images need to be loaded first.
    // customizePhotos();
    break;
  case "partners":
    customizePartners();
    break;
  case "philanthropy":
    customizePhilanthropy();
    break;
  default:
    console.log("default");
    customizePost();
  }

  return location.pathname.split("/").join("");
};

function customizeIndex() {
	var home = document.getElementById("home"),
			imageEles = [].slice.call(home.getElementsByTagName("img")),
			imgs = [],
			divs = [];

	// get header div eles
	for (var i = 1; i <= 5; i++) {
		divs.push(document.getElementById("header-div-" + i));
	}

	// get header img eles
	for (var i = 1; i <= 5; i++) {
		imgs.push(document.getElementById("header-img-" + i));
	}

	// Apply image src to header img and div tags
	for (var i = 0; i < 5; i++) {
		divs[i].style.backgroundImage = "url(" + imageEles[i].src + ")";
		imgs[i].src = imageEles[i].src;
	}

	initCarousel();

	// Delete image elements
	for (var i = imageEles.length - 1; i >= 0; i--) {
		 imageEles[i].remove();
	}

  //
  // nextMatch
  var titleEle = document.getElementById("nextmatch-title"),
      subtitleEle = document.getElementById("nextmatch-subtitle");

  titleEle.textContent = nextMatch.location;
  subtitleEle.textContent = nextMatch.date;

};

function initCarousel() {
	var headers = [];

	for (var i = 0; i < 5; i++) {
		headers = document.getElementById("carousel-header-" + i);
	}

	var intervalID = window.setInterval(animateCarousel, 4000, headers);
}

function animateCarousel(headers) {
	if(!this.counter) {
		this.counter = 0;
	}
	console.log(++this.counter);
}

function customizeNews() {

};

function customizePost() {
  var images = document.getElementsByTagName("img");

  for (var i = 0; i < images.length; i++) {
    images[i].classList.add("img-responsive");
    images[i].classList.add("margin-center");
  }
};

function customizeSchedule() {
	// next match header
  var titleEle = document.getElementById("nextmatch-title"),
      subtitleEle = document.getElementById("nextmatch-subtitle");

  titleEle.textContent = nextMatch.location;
  subtitleEle.textContent = nextMatch.date;

	var schedule = document.getElementById("schedule"),
			scheduleHeader = createTag({ class : "bold-uppercase", content : "schedule", tag : "h1" }),
			scheduleCol = createTag({ class : "col-xsp-12 col-xsp-offset-0 col-xs-10 col-xs-offset-1", tag : "div" }),
			scheduleRow = createTag({ class : "row row-top-spacer text-center", tag : "div" });

	schedule.classList.add("row-top-spacer");
	scheduleCol.appendChild(scheduleHeader);
	scheduleRow.appendChild(scheduleCol);
	schedule.parentNode.insertBefore(scheduleRow, schedule);


	var results = document.getElementById("results"),
			resultsHeader = createTag({ class : "bold-uppercase", content : "results", tag : "h1"}),
			resultsCol = createTag({ class : "col-xsp-12 col-xsp-offset-0 col-xs-10 col-xs-offset-1", tag : "div" }),
			resultsRow = createTag({ class : "row row-top-spacer text-center", tag : "div" });

	results.classList.add("row-top-spacer");
	resultsCol.appendChild(resultsHeader);
	resultsRow.appendChild(resultsCol);
	results.parentNode.insertBefore(resultsRow, results);


  // $(function() {
  //   $('.scheduleResults-content').matchHeight();
  // });

};


function customizeProfile () {
  var stats = document.getElementById("profile-stats"),
      highlights = document.getElementById("profile-highlights");

  //
  // Create stats
  for (var i = 0; i < profile.stats.length; i++) {
    var statEle = createTag({class : "", content : profile.stats[i][0] + " : " + profile.stats[i][1], tag : "p"});
    stats.appendChild(statEle);
  }

  //
  // Create highlights and years
  for (var i = 0; i < profile.highlights.length; i++) {
    var row = createBootRow({ class : "row-top-spacer-10 highlight" }),
				year = createBootCol({ class : "col-xs-2", content : profile.highlights[i][0] }),
				highlight = createBootCol({ class : "col-xs-10 text-left", content : profile.highlights[i][1] });

		row.appendChild(year);
		row.appendChild(highlight);
    highlights.appendChild(row);
  }

  $(function() {
    $('.profile-box-mh').matchHeight();
  });

};

function customizePhotos() {
  var photosContainerEle = document.getElementById("photos"),
      imageEles = [].slice.call(photosContainerEle.getElementsByTagName("img")),
      colWidth = 200,
      numCols = 3,
      photosWide = [],
      photosTall = [],
      photos = [];

  // Convert image elements to divs
  for (var i = imageEles.length - 1; i >= 0; i--) {
    var image = imageEles[i],
        photoEle = createTag({class : "photo", tag : "div"}),
        imageSource = image.getAttribute("src"),
        imageAspectRatio = aspectRatio(image.clientWidth, image.clientHeight),
        arWidth = imageAspectRatio[0],
        arHeight = imageAspectRatio[1],
        imageHeight = (colWidth * arHeight) / arWidth;

    // Style divs
    photoEle.style["background-image"] = "url(" + imageSource + ")";
    photoEle.style.height = imageHeight + "px";
    photoEle.style.width = colWidth + "px";

    // Store in wide or tall image array
    if (arWidth > arHeight) {
      photoEle.classList.add("wide");
      photosWide.push(photoEle);
    } else {
      photoEle.classList.add("tall");
      photosTall.push(photoEle);
    }

  }

  // Delete image elements
  for (var i = imageEles.length - 1; i >= 0; i--) {
     imageEles[i].remove();
  }

  // Merge wide and tall photos array in sorted order
  photos = sortPhotos(photosWide, photosTall);

  placePhotos(photos, colWidth);
};

function sortPhotos(photosWide, photosTall){
  var photosWide = photosWide || [],
      photosTall = photosTall || [],
      numWide = photosWide.length,
      numTall = photosTall.length,
      photos = [];

  for (var i = 0; i < numTall || i < numWide; i++) {
    if (photosTall[i] == undefined) {
      photos.push(photosTall[i%numTall].cloneNode());
    } else {
      photos.push(photosTall[i]);
    }

    if (photosWide[i] == undefined) {
      photos.push(photosWide[i%numWide].cloneNode());
    } else {
      photos.push(photosWide[i]);
    }
  }

  return photos;

};

function placePhotos(photos, colWidth, numCols){
  var photos = photos || [],
      photosMasonry = document.getElementById("photos-masonry"),
      photosLightbox = document.getElementById("photos-lightbox"),
      numPhotos = photos.length,
      numCols = numCols || 3,
      photosPerCol = (numPhotos / numCols).toFixed(),
      colWidth = colWidth || 200;

  // Loop through each column
  for ( var i = 1; i <= numCols; i++ ) {
    var photosCol = createTag({ tag : "div", class : "photos-column"}),
        colHeight = 0;

    // Calc column height
    // Add photosPerCol number of photos to column
    for ( var j = 0; j < photosPerCol; j++ ) {
      var thumbnailWrapper = createTag({ tag : "a"}),
          lightboxWrapper = createTag({ tag : "a", class : "lightbox"}),
          lightboxImage = createTag({ tag : "img"});

      // Add photo to column
      // If column is odd reverse order of photos
      if ( i%2 == 1 ) {
        var photoIndex = (photosPerCol - 1) - j;

        // Lightbox full image
        lightboxImage.src = photos[photoIndex].style.backgroundImage.slice(5,-2);
        if (photos[photoIndex].classList.contains("wide")) {
          lightboxImage.classList.add("wide");
        } else {
          lightboxImage.classList.add("tall");
        }
        lightboxWrapper.id = "photo" + i + "-" + j;
        lightboxWrapper.href = "#_";
        lightboxWrapper.appendChild(lightboxImage);
        photosLightbox.appendChild(lightboxWrapper);

        // Lightbox thumbnail
        thumbnailWrapper.href = "#photo" + i + "-" + j;
        thumbnailWrapper.appendChild(photos[photoIndex]);
        photosCol.appendChild(thumbnailWrapper);

        // Add column height
        colHeight = colHeight + parseInt(photos[photoIndex].style.height);

        // Remove image div from array
        photos.splice(photoIndex,1);

      } else {

        // Lightbox full image
        lightboxImage.src = photos[0].style.backgroundImage.slice(5,-2);
        if (photos[0].classList.contains("wide")) {
          lightboxImage.classList.add("wide");
        } else {
          lightboxImage.classList.add("tall");
        }
        lightboxWrapper.id = "photo" + i + "-" + j;
        lightboxWrapper.href = "#_";
        lightboxWrapper.appendChild(lightboxImage);
        photosLightbox.appendChild(lightboxWrapper);

        // Lightbox thumbnail
        thumbnailWrapper.href = "#photo" + i + "-" + j;
        thumbnailWrapper.appendChild(photos[photoIndex]);
        photosCol.appendChild(thumbnailWrapper);

        thumbnailWrapper.appendChild(photos[0]);
        photosCol.appendChild(thumbnailWrapper);
        colHeight = colHeight + parseInt(photos[0].style.height);
        photos.shift();
      }
    }

    // Set column height
    photosCol.style.height = colHeight + "px";

    // Add column to DOM
    photosMasonry.appendChild(photosCol);

  }

};



function customizePartners() {
  var partnersEle = document.getElementById("partners");

  for (var i = 0; i < partners.length; i++) {
    var partnerEle = createBootCol({class : "col-xs-12 nopadding top-spacer-50"}),
        imageEle = createTag({class : "partner-image", tag : "div"}),
        titleEle = createTag({class : "bold-uppercase text-center", tag : "h1", content : partners[i][0]}),
        descriptionEle = createTag({class : "text-center", tag : "h3", content : partners[i][2]});

    imageEle.style.backgroundImage = "url(" + partners[i][1] + ")";
    partnerEle.appendChild(imageEle);
    partnerEle.appendChild(titleEle);
    partnerEle.appendChild(descriptionEle);

    partnersEle.appendChild(partnerEle);
  }

};

function customizePhilanthropy() {
  var philanthropyDescEle = document.getElementById("philanthropy-desc");

  philanthropyDescEle.textContent = philanthropyDesc;
};



// // upcoming schedule
// var scheduleEle = document.getElementById("schedule");
//
// for (var i = 0; i < schedule.length; i++) {
//
// 	var colTournament = createBootCol({class : "tournament-name" + i + " col-xs-7 text-left", content : schedule[i].tournament, contentWrapper : "h2"}),
// 			colDate = createBootCol({class : "text-muted col-xs-5 bg-primary", content : schedule[i].date, contentWrapper : "h2"}),
// 			locationEle = createTag({content : " " + schedule[i].location, tag : "small"}),
// 			rowContainer = createBootRow({class : "bg-info"}),
// 			container = createBootRow({class : "row-top-spacer"});
//
// 	// create right content rows and add to right content column
// 	rowContainer.appendChild(colTournament);
// 	rowContainer.appendChild(colDate);
//
// 	// add row container to master container
// 	container.appendChild(rowContainer);
//
// 	scheduleEle.appendChild(container);
//
// 	document.querySelector(".tournament-name" + i + " h2").appendChild(locationEle);
//
// }
//
// // previous results
// var	results = document.getElementById("results");


//
// create and add Schedule Results
//
// var scheduleResultsEle = document.getElementById("scheduleResults");
//
// for (var i = 0; i < scheduleResults.length; i++) {
//
// 	var colOpponent = createBootCol({class : "col-xs-4", content : scheduleResults[i].opponent, contentWrapper : "h2"}),
// 			colTournament = createBootCol({class : "tournamentResults-name" + i + " col-xs-7", content : scheduleResults[i].tournament, contentWrapper : "h3"}),
// 			colDate = createBootCol({class : "text-muted col-xs-5 text-right", content : scheduleResults[i].date, contentWrapper : "h3"}),
// 			colRound = createBootCol({class : "col-xs-12 text-center bg-primary", content : scheduleResults[i].round, contentWrapper : "h2"}),
// 			roundEle = createTag({class : "text-center", content : "ROUND", tag : "h4"}),
// 			locationEle = createTag({content : " " + scheduleResults[i].location, tag : "small"}),
// 			colRightContent = createBootCol({class : "scheduleResults-content col-xs-9"}),
// 			colLeftContent = createBootCol({class : "scheduleResults-content col-xs-3 bg-primary"}),
// 			colContainer = createBootCol({class : "col-xs-12"}),
// 			rowContainer = createBootRow(),
// 			container = createBootRow({class : "row-top-spacer"}),
// 			rowRightTop = createBootRow({class :  "bg-info"}),
// 			rowRightBot = createBootRow({class : "bg-success"}),
// 			rowRightBotCol = createBootRow({class : "col-xs-8"}),
// 			rowLeftTop = createBootRow(),
// 			rowLeftBot = createBootRow();
//
//
//
// 	// create right content rows and add to right content column
// 	rowRightBot.appendChild(colOpponent);
//
// 	for (var j = 0; j < scheduleResults[i].score.length; j++) {
// 		var colScore = createBootCol({class : "col-xs-12 visible-xs text-right", content : scheduleResults[i].score[j], contentWrapper : "h4"})
// 		rowRightBotCol.appendChild(colScore);
// 	}
// 	for (var j = 0; j < scheduleResults[i].score.length; j++) {
// 		var colScore = createBootCol({class : "col-sm-4 hidden-xs text-right", content : scheduleResults[i].score[j], contentWrapper : "h2"})
// 		rowRightBotCol.appendChild(colScore);
// 	}
// 	rowRightBot.appendChild(rowRightBotCol);
//
//
// 	rowRightTop.appendChild(colTournament);
// 	rowRightTop.appendChild(colDate);
//
// 	colRightContent.appendChild(rowRightTop);
// 	colRightContent.appendChild(rowRightBot);
//
// 	// create left content and add to left content column
// 	rowLeftTop.appendChild(colRound);
// 	rowLeftBot.appendChild(roundEle);
//
// 	colLeftContent.appendChild(rowLeftTop);
// 	colLeftContent.appendChild(rowLeftBot);
//
//
// 	// add content to row container
// 	rowContainer.appendChild(colLeftContent);
// 	rowContainer.appendChild(colRightContent);
//
// 	// add row container to master container
// 	container.appendChild(rowContainer);
//
// 	scheduleResultsEle.appendChild(container);
//
// 	document.querySelector(".tournamentResults-name" + i + " h3").appendChild(locationEle);
//
// }

// function customizePhotos() {
//   var photosEle = document.getElementById("photos"),
//       colOne = createBootCol({class : "col-xs-12 col-md-4"}),
//       colTwo = createBootCol({class : "col-xs-12 col-md-4"}),
//       colThree = createBootCol({class : "col-xs-12 col-md-4"});
//
//   for (var i = 0; i < photos.length; i++) {
//     var rowContainer = createBootRow(),
//         titleEle,
//         copyEle,
//         photoEle;
//
//     titleEle = createTag({tag : "h4", class : "photo-title white", content : photos[i][0]});
//     copyEle = createTag({tag : "div", class : "photo-copy"});
//     photoEle = createTag({tag : "a", class : "col-xs-12 photo-container photo-copy-padding row-top-spacer"});
//
//     copyEle.appendChild(titleEle);
//     photoEle.style.backgroundImage = "url(" + photos[i][1] + ")";
//     photoEle.appendChild(copyEle);
//
//     // need to loop through 3 columns and add photoEles
//     if (i%3 === 0) {
//       colOne.appendChild(photoEle);
//     }
//
//     if (i%3 === 1) {
//       colTwo.appendChild(photoEle);
//     }
//
//     if (i%3 === 2) {
//       colThree.appendChild(photoEle);
//     }
//
//   }
//
//   rowContainer.appendChild(colOne);
//   rowContainer.appendChild(colTwo);
//   rowContainer.appendChild(colThree);
//
//   photosEle.appendChild(rowContainer);
// };

// var slidebarsjs = require('./slidebars');
//
// var slidebarController = new slidebarsjs();
// slidebarController.init();
//
// // Toggle Slidebars
// $( '.toggle-id-1' ).on( 'click', function ( event ) {
//   // Stop default action and bubbling
//   event.stopPropagation();
//   event.preventDefault();
//
//   // Toggle the Slidebar with id 'id-1'
//   slidebarController.toggle( 'id-1' );
// } );
//
// $( '.toggle-id-2' ).on( 'click', function ( event ) {
//   // Stop default action and bubbling
//   event.stopPropagation();
//   event.preventDefault();
//
//   // Toggle the Slidebar with id 'id-2'
//   slidebarController.toggle( 'id-2' );
// } );
//
// $( '.toggle-id-3' ).on( 'click', function ( event ) {
//   // Stop default action and bubbling
//   event.stopPropagation();
//   event.preventDefault();
//
//   // Toggle the Slidebar with id 'id-3'
//   slidebarController.toggle( 'id-3' );
// } );
//
// $( '.toggle-id-4' ).on( 'click', function ( event ) {
//   // Stop default action and bubbling
//   event.stopPropagation();
//   event.preventDefault();
//
//   // Toggle the Slidebar with id 'id-4'
//   slidebarController.toggle( 'id-4' );
// } );



//
// Manage Title Message
//
// function fadeOffMessage() {
//   var menuTitle = document.getElementById("menu-title");
//   menuTitle.classList.add("fadeOff");
//   setTimeout(removeMessage, 500, menuTitle);
// }

// function removeMessage(ele) {
//   ele.classList.add("hidden");
// }

// window.addEventListener('scroll', function(e) {
//   if (window.scrollY > 0) {
//     fadeOffMessage();
//   }
// });

// window.onresize = function (){
//
//   var menuTitle = document.getElementById("menu-title");
//   var mobileMenu = document.getElementById("menu-grid-portrait");
//   //
//   // if LANDSCAPE show MenuTitle
//   if (window.innerHeight < window.innerWidth) {
//     menuTitle.classList.remove("hidden");
//   //
//   // if PORTRAIT and SubMenu is visible
//   } else if (window.innerWidth < window.innerHeight) {
//     if (mobileMenu.classList.contains("hidden") != true) {
//       menuTitle.classList.add("hidden");
//     }
//   }
// };

//
//
// (function menuButton() {
//
//   var button = document.getElementById("menu-button"),
//       menu = document.getElementById("menu-grid"),
//       mobileMenu = document.getElementById("menu-grid-portrait"),
//       menuTitle = document.getElementById("menu-title");
//
//   button.onclick = function() {
//     if (window.innerWidth < window.innerHeight && !menuTitle.classList.contains("hidden")) {
//       menuTitle.classList.contains("hidden") ? menuTitle.classList.remove("hidden") : menuTitle.classList.add("hidden");
//     }
//
//     menu.classList.contains("hidden") ? menu.classList.remove("hidden") :
//     menu.classList.add("hidden");
//
//     mobileMenu.classList.contains("hidden") ? mobileMenu.classList.remove("hidden") : mobileMenu.classList.add("hidden");
//   };
// })();

//
//
// window.onload = function(){
//
//   var pageData = document.getElementById("page-data"),
//       titleMessage = document.getElementById("title-message"),
//       featureImage = document.getElementById("feature-image");
//
//   titleMessage.textContent = pageData.textContent;
//
//   if (featureImage) {
//     featureImage.style["background-position"] = pageData.getAttribute("data-header-position");
//     featureImage.style["background-image"] ?
//     featureImage.style["background-image"] :
//     pageData.getAttribute("data-header-image");
//   }
//
//   //
//   //
//   var feature = document.getElementById("feature-image-landing"),
//       lockup = document.getElementById("feature-lockup"),
//       imagesArr = ["landing-header-2", "landing-header-3", "landing-header-4", "landing-header-5", "landing-header-1"],
//       positionArr = ["center", "center", "center", "center", "8% 0px"],
//       lockupArr = ["none", "none", "none", "none", "inline-block"];
//
//   function changeFeatureImage() {
//
//     var image = imagesArr.shift(),
//         position = positionArr.shift(),
//         lockupDisplay = lockupArr.shift();
//
//     positionArr.push(position);
//     imagesArr.push(image);
//     lockupArr.push(lockupDisplay);
//
//     feature.style["background-image"] = "url(/content/images/headers/" + image + ".jpg)";
//
//     feature.style["background-position"] = position;
//
//     if (window.innerHeight < window.innerWidth) {
//       lockup.style.display = lockupDisplay;
//     }
//   }
//
//   setInterval(changeFeatureImage, 6000);
//
//   //
//   // Manage Title Message
//   if (window.innerWidth < window.innerHeight) {
//     setTimeout(fadeOffMessage, 2000);
//   }
// };
//
// function currentYPosition() {
//     // Firefox, Chrome, Opera, Safari
//     if (self.pageYOffset) return self.pageYOffset;
//     // Internet Explorer 6 - standards mode
//     if (document.documentElement && document.documentElement.scrollTop)
//         return document.documentElement.scrollTop;
//     // Internet Explorer 6, 7 and 8
//     if (document.body.scrollTop) return document.body.scrollTop;
//     return 0;
// }
//
// function elmYPosition(eID) {
//     var elm = document.getElementById(eID);
//     var y = elm.offsetTop;
//     var node = elm;
//     while (node.offsetParent && node.offsetParent != document.body) {
//         node = node.offsetParent;
//         y += node.offsetTop;
//     } return y;
// }
//
// function smoothScroll(eID) {
//     var startY = currentYPosition();
//     var stopY = elmYPosition(eID);
//     var distance = stopY > startY ? stopY - startY : startY - stopY;
//     if (distance < 100) {
//         scrollTo(0, stopY); return;
//     }
//     var speed = Math.round(distance / 100);
//     if (speed >= 20) speed = 20;
//     var step = Math.round(distance / 25);
//     var leapY = stopY > startY ? startY + step : startY - step;
//     var timer = 0;
//     if (stopY > startY) {
//         for ( var i=startY; i<stopY; i+=step ) {
//             setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//             leapY += step; if (leapY > stopY) leapY = stopY; timer++;
//         } return;
//     }
//     for ( var i=startY; i>stopY; i-=step ) {
//         setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//         leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
//     }
// }


// (function ($, undefined) {
//     "use strict";
//
//     var $document = $(document);
//
//     $document.ready(function () {
//
//         var $postContent = $(".post-content");
//         $postContent.fitVids();
//
//         $(".scroll-down").arctic_scroll();
//
//         // $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
//         //     e.preventDefault();
//         //     $("body").toggleClass("nav-opened nav-closed");
//         // });
//
//     });
//
//     // Arctic Scroll by Paul Adam Davis
//     // https://github.com/PaulAdamDavis/Arctic-Scroll
//     $.fn.arctic_scroll = function (options) {
//
//         var defaults = {
//             elem: $(this),
//             speed: 500
//         },
//
//         allOptions = $.extend(defaults, options);
//
//         allOptions.elem.click(function (event) {
//             event.preventDefault();
//             var $this = $(this),
//                 $htmlBody = $('html, body'),
//                 offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
//                 position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
//                 toMove;
//
//             if (offset) {
//                 toMove = parseInt(offset);
//                 $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
//             } else if (position) {
//                 toMove = parseInt(position);
//                 $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
//             } else {
//                 $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
//             }
//         });
//
//     };
// })(jQuery);
