
//
// Manage Title Message
//
function fadeOffMessage() {
  var menuTitle = document.getElementById("menu-title");
  menuTitle.classList.add("fadeOff");
  setTimeout(removeMessage, 500, menuTitle);
}

function removeMessage(ele) {
  ele.classList.add("hidden");
}

window.addEventListener('scroll', function(e) {
  if (window.scrollY > 0) {
    fadeOffMessage();
  }
});

window.onresize = function (){

  var menuTitle = document.getElementById("menu-title");
  var mobileMenu = document.getElementById("menu-grid-portrait");
  //
  // if LANDSCAPE show MenuTitle
  if (window.innerHeight < window.innerWidth) {
    menuTitle.classList.remove("hidden");
  //
  // if PORTRAIT and SubMenu is visible
  } else if (window.innerWidth < window.innerHeight) {
    if (mobileMenu.classList.contains("hidden") != true) {
      menuTitle.classList.add("hidden");
    }
  }
};

//
//
(function menuButton() {

  var button = document.getElementById("menu-button"),
      menu = document.getElementById("menu-grid"),
      mobileMenu = document.getElementById("menu-grid-portrait"),
      menuTitle = document.getElementById("menu-title");

  button.onclick = function() {
    if (window.innerWidth < window.innerHeight && !menuTitle.classList.contains("hidden")) {
      menuTitle.classList.contains("hidden") ? menuTitle.classList.remove("hidden") : menuTitle.classList.add("hidden");
    }

    menu.classList.contains("hidden") ? menu.classList.remove("hidden") :
    menu.classList.add("hidden");

    mobileMenu.classList.contains("hidden") ? mobileMenu.classList.remove("hidden") : mobileMenu.classList.add("hidden");
  };
})();

//
//
window.onload = function(){

  var pageData = document.getElementById("page-data"),
      titleMessage = document.getElementById("title-message"),
      featureImage = document.getElementById("feature-image");

  titleMessage.textContent = pageData.textContent;

  if (featureImage) {
    featureImage.style["background-position"] = pageData.getAttribute("data-header-position");
    featureImage.style["background-image"] ?
    featureImage.style["background-image"] :
    pageData.getAttribute("data-header-image");
  }

  //
  //
  var feature = document.getElementById("feature-image-landing"),
      lockup = document.getElementById("feature-lockup"),
      imagesArr = ["landing-header-2", "landing-header-3", "landing-header-4", "landing-header-5", "landing-header-1"],
      positionArr = ["center", "center", "center", "center", "8% 0px"],
      lockupArr = ["none", "none", "none", "none", "inline-block"];

  function changeFeatureImage() {

    var image = imagesArr.shift(),
        position = positionArr.shift(),
        lockupDisplay = lockupArr.shift();

    positionArr.push(position);
    imagesArr.push(image);
    lockupArr.push(lockupDisplay);

    feature.style["background-image"] = "url(/content/images/headers/" + image + ".jpg)";

    feature.style["background-position"] = position;

    if (window.innerHeight < window.innerWidth) {
      lockup.style.display = lockupDisplay;
    }
  }

  setInterval(changeFeatureImage, 6000);

  //
  // Manage Title Message
  if (window.innerWidth < window.innerHeight) {
    setTimeout(fadeOffMessage, 2000);
  }
};






(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        // $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
        //     e.preventDefault();
        //     $("body").toggleClass("nav-opened nav-closed");
        // });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
