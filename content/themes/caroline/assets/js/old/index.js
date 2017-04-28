// import modules
var app = require('./app'),
		helper = require('./helper');

// Initialize
app();

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
        photoEle = helper.createTag({class : "photo", tag : "div"}),
        imageSource = image.getAttribute("src"),
        imageAspectRatio = helper.aspectRatio(image.clientWidth, image.clientHeight),
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
    var photosCol = helper.createTag({ tag : "div", class : "photos-column"}),
        colHeight = 0;

    // Calc column height
    // Add photosPerCol number of photos to column
    for ( var j = 0; j < photosPerCol; j++ ) {
      var thumbnailWrapper = helper.createTag({ tag : "a"}),
          lightboxWrapper = helper.createTag({ tag : "a", class : "lightbox"}),
          lightboxImage = helper.createTag({ tag : "img"});

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





// // upcoming schedule
// var scheduleEle = document.getElementById("schedule");
//
// for (var i = 0; i < schedule.length; i++) {
//
// 	var colTournament = helper.createBootCol({class : "tournament-name" + i + " col-xs-7 text-left", content : schedule[i].tournament, contentWrapper : "h2"}),
// 			colDate = helper.createBootCol({class : "text-muted col-xs-5 bg-primary", content : schedule[i].date, contentWrapper : "h2"}),
// 			locationEle = helper.createTag({content : " " + schedule[i].location, tag : "small"}),
// 			rowContainer = helper.createBootRow({class : "bg-info"}),
// 			container = helper.createBootRow({class : "row-top-spacer"});
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
// 	var colOpponent = helper.createBootCol({class : "col-xs-4", content : scheduleResults[i].opponent, contentWrapper : "h2"}),
// 			colTournament = helper.createBootCol({class : "tournamentResults-name" + i + " col-xs-7", content : scheduleResults[i].tournament, contentWrapper : "h3"}),
// 			colDate = helper.createBootCol({class : "text-muted col-xs-5 text-right", content : scheduleResults[i].date, contentWrapper : "h3"}),
// 			colRound = helper.createBootCol({class : "col-xs-12 text-center bg-primary", content : scheduleResults[i].round, contentWrapper : "h2"}),
// 			roundEle = helper.createTag({class : "text-center", content : "ROUND", tag : "h4"}),
// 			locationEle = helper.createTag({content : " " + scheduleResults[i].location, tag : "small"}),
// 			colRightContent = helper.createBootCol({class : "scheduleResults-content col-xs-9"}),
// 			colLeftContent = helper.createBootCol({class : "scheduleResults-content col-xs-3 bg-primary"}),
// 			colContainer = helper.createBootCol({class : "col-xs-12"}),
// 			rowContainer = helper.createBootRow(),
// 			container = helper.createBootRow({class : "row-top-spacer"}),
// 			rowRightTop = helper.createBootRow({class :  "bg-info"}),
// 			rowRightBot = helper.createBootRow({class : "bg-success"}),
// 			rowRightBotCol = helper.createBootRow({class : "col-xs-8"}),
// 			rowLeftTop = helper.createBootRow(),
// 			rowLeftBot = helper.createBootRow();
//
//
//
// 	// create right content rows and add to right content column
// 	rowRightBot.appendChild(colOpponent);
//
// 	for (var j = 0; j < scheduleResults[i].score.length; j++) {
// 		var colScore = helper.createBootCol({class : "col-xs-12 visible-xs text-right", content : scheduleResults[i].score[j], contentWrapper : "h4"})
// 		rowRightBotCol.appendChild(colScore);
// 	}
// 	for (var j = 0; j < scheduleResults[i].score.length; j++) {
// 		var colScore = helper.createBootCol({class : "col-sm-4 hidden-xs text-right", content : scheduleResults[i].score[j], contentWrapper : "h2"})
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
//       colOne = helper.createBootCol({class : "col-xs-12 col-md-4"}),
//       colTwo = helper.createBootCol({class : "col-xs-12 col-md-4"}),
//       colThree = helper.createBootCol({class : "col-xs-12 col-md-4"});
//
//   for (var i = 0; i < photos.length; i++) {
//     var rowContainer = helper.createBootRow(),
//         titleEle,
//         copyEle,
//         photoEle;
//
//     titleEle = helper.createTag({tag : "h4", class : "photo-title white", content : photos[i][0]});
//     copyEle = helper.createTag({tag : "div", class : "photo-copy"});
//     photoEle = helper.createTag({tag : "a", class : "col-xs-12 photo-container photo-copy-padding row-top-spacer"});
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
