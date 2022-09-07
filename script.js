// services mobile slider
document.addEventListener('DOMContentLoaded', () => {
  var mobileSlider = document.querySelector('.services-mobile-slider');
  var mobileSliderContent = document.querySelector('.services-slider-content');
  var mobileSlides = document.querySelectorAll('.services-card-wrapper');
  var mobileArrayOfSlides = Array.prototype.slice.call(mobileSlides);
  var mobileSliderDisplaying;
  var mobileScreenSize;
  setMobileScreenSize();
  var lengthOfMobileSlide;

  function addClone() {
    var lastMobileSlide = mobileSliderContent.lastElementChild.cloneNode(true);
    lastMobileSlide.style.left = (-lengthOfMobileSlide) + "px";
    mobileSliderContent.insertBefore(lastMobileSlide, mobileSliderContent.firstChild);
  }

  function removeClone() {
    var firstMobileSlide = mobileSliderContent.firstElementChild;
    firstMobileSlide.parentNode.removeChild(firstMobileSlide);
  }

  function moveSlidesRight() {
    var mobileSlides = document.querySelectorAll('.services-card-wrapper');
    var mobileSlidesArray = Array.prototype.slice.call(mobileSlides);
    var width = 0;

    mobileSlidesArray.forEach(function (el, i) {
      el.style.left = width + "px";
      width += lengthOfMobileSlide;
    });
    addClone();
  }
  moveSlidesRight();

  function moveSlidesLeft() {
    var mobileSlides = document.querySelectorAll('.services-card-wrapper');
    var mobileSlidesArray = Array.prototype.slice.call(mobileSlides);
    mobileSlidesArray = mobileSlidesArray.reverse();
    var maxWidth = (mobileSlidesArray.length - 1) * lengthOfMobileSlide;

    mobileSlidesArray.forEach(function (el, i) {
      maxWidth -= lengthOfMobileSlide;
      el.style.left = maxWidth + "px";
    });
  }

  window.addEventListener('resize', setMobileScreenSize);

  function setMobileScreenSize() {
    mobileSliderDisplaying = 1;
    getScreenSize();
  }

  function getScreenSize() {
    var mobileSlides = document.querySelectorAll('.services-card-wrapper');
    var mobileSlidesArray = Array.prototype.slice.call(mobileSlides);
    lengthOfMobileSlide = (mobileSlider.offsetWidth / mobileSliderDisplaying);
    var initialWidth = -lengthOfMobileSlide;
    mobileSlidesArray.forEach(function (el) {
      el.style.width = lengthOfMobileSlide + "px";
      el.style.left = initialWidth + "px";
      initialWidth += lengthOfMobileSlide;
    });
  }

  var rightNav = document.querySelector('.services-slider-nav-right');
  rightNav.addEventListener('click', moveLeft);

  var moving = true;
  function moveRight() {
    if (moving) {
      moving = false;
      var lastMobileSlide = mobileSliderContent.lastElementChild;
      lastMobileSlide.parentNode.removeChild(lastMobileSlide);
      mobileSliderContent.insertBefore(lastMobileSlide, mobileSliderContent.firstChild);
      removeClone();
      var firstMobileSlide = mobileSliderContent.firstElementChild;
      firstMobileSlide.addEventListener('transitionend', activateAgain);
      moveSlidesRight();
    }
  }

  function activateAgain() {
    var firstMobileSlide = mobileSliderContent.firstElementChild;
    moving = true;
    firstMobileSlide.removeEventListener('transitionend', activateAgain);
  }

  var leftNav = document.querySelector('.services-slider-nav-left');
  leftNav.addEventListener('click', moveRight);

  function moveLeft() {
    if (moving) {
      moving = false;
      removeClone();
      var firstMobileSlide = mobileSliderContent.firstElementChild;
      firstMobileSlide.addEventListener('transitionend', replaceToEnd);
      moveSlidesLeft();
    }
  }

  function replaceToEnd() {
    var firstMobileSlide = mobileSliderContent.firstElementChild;
    firstMobileSlide.parentNode.removeChild(firstMobileSlide);
    mobileSliderContent.appendChild(firstMobileSlide);
    firstMobileSlide.style.left = ((mobileArrayOfSlides.length - 1) * lengthOfMobileSlide) + "px";
    addClone();
    moving = true;
    firstMobileSlide.removeEventListener('transitionend', replaceToEnd);
  }

  mobileSliderContent.addEventListener('mousedown', seeMovement);

  var initialX;
  var initialPos;
  function seeMovement(e) {
    initialX = e.clientX;
    getInitialPos();
    mobileSliderContent.addEventListener('mousemove', slightMove);
    document.addEventListener('mouseup', moveBasedOnMouse);
  }

  function slightMove(e) {
    if (moving) {
      var movingX = e.clientX;
      var difference = initialX - movingX;
      if (Math.abs(difference) < (lengthOfMobileSlide / 4)) {
        slightMoveSlides(difference);
      }
    }
  }

  function getInitialPos() {
    var mobileSlides = document.querySelectorAll('.services-card-wrapper');
    var mobileSlidesArray = Array.prototype.slice.call(mobileSlides);
    initialPos = [];
    mobileSlidesArray.forEach(function (el) {
      var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
      initialPos.push(left);
    });
  }

  function slightMoveSlides(newX) {
    var mobileSlides = document.querySelectorAll('.services-card-wrapper');
    var mobileSlidesArray = Array.prototype.slice.call(mobileSlides);
    mobileSlidesArray.forEach(function (el, i) {
      var oldLeft = initialPos[i];
      el.style.left = (oldLeft + newX) + "px";
    });
  }

  function moveBasedOnMouse(e) {
    var finalX = e.clientX;
    if (initialX - finalX > 0) {
      moveRight();
    } else if (initialX - finalX < 0) {
      moveLeft();
    }
    document.removeEventListener('mouseup', moveBasedOnMouse);
    mobileSliderContent.removeEventListener('mousemove', slightMove);
  }
});

// testimonial slider
document.addEventListener('DOMContentLoaded', () => {
  var slider = document.querySelector('.testimonial-slider');
  var sliderContent = document.querySelector('.testimonial-slider-content');
  var slides = document.querySelectorAll('.testimonial-card-wrapper');
  var arrayOfSlides = Array.prototype.slice.call(slides);
  var sliderDisplaying;
  var screenSize;
  setScreenSize();
  var lengthOfSlide;

  function addClone() {
    var lastSlide = sliderContent.lastElementChild.cloneNode(true);
    lastSlide.style.left = (-lengthOfSlide) + "px";
    sliderContent.insertBefore(lastSlide, sliderContent.firstChild);
  }

  function removeClone() {
    var firstSlide = sliderContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
  }

  function moveSlidesRight() {
    var slides = document.querySelectorAll('.testimonial-card-wrapper');
    var slidesArray = Array.prototype.slice.call(slides);
    var width = 0;

    slidesArray.forEach(function (el, i) {
      el.style.left = width + "px";
      width += lengthOfSlide;
    });
    addClone();
  }
  moveSlidesRight();

  function moveSlidesLeft() {
    var slides = document.querySelectorAll('.testimonial-card-wrapper');
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

    slidesArray.forEach(function (el, i) {
      maxWidth -= lengthOfSlide;
      el.style.left = maxWidth + "px";
    });
  }

  window.addEventListener('resize', setScreenSize);

  function setScreenSize() {
    if (window.innerWidth >= 1200) {
      sliderDisplaying = 2;
    } else {
      sliderDisplaying = 1;
    }
    getScreenSize();
  }

  function getScreenSize() {
    var slides = document.querySelectorAll('.testimonial-card-wrapper');
    var slidesArray = Array.prototype.slice.call(slides);
    lengthOfSlide = (slider.offsetWidth / sliderDisplaying);
    var initialWidth = -lengthOfSlide;
    slidesArray.forEach(function (el) {
      el.style.width = lengthOfSlide + "px";
      el.style.left = initialWidth + "px";
      initialWidth += lengthOfSlide;
    });
  }

  var rightNav = document.querySelector('.slider-nav-right');
  rightNav.addEventListener('click', moveLeft);

  var moving = true;
  function moveRight() {
    if (moving) {
      moving = false;
      var lastSlide = sliderContent.lastElementChild;
      lastSlide.parentNode.removeChild(lastSlide);
      sliderContent.insertBefore(lastSlide, sliderContent.firstChild);
      removeClone();
      var firstSlide = sliderContent.firstElementChild;
      firstSlide.addEventListener('transitionend', activateAgain);
      moveSlidesRight();
    }
  }

  function activateAgain() {
    var firstSlide = sliderContent.firstElementChild;
    moving = true;
    firstSlide.removeEventListener('transitionend', activateAgain);
  }

  var leftNav = document.querySelector('.slider-nav-left');
  leftNav.addEventListener('click', moveRight);

  function moveLeft() {
    if (moving) {
      moving = false;
      removeClone();
      var firstSlide = sliderContent.firstElementChild;
      firstSlide.addEventListener('transitionend', replaceToEnd);
      moveSlidesLeft();
    }
  }

  function replaceToEnd() {
    var firstSlide = sliderContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    sliderContent.appendChild(firstSlide);
    firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + "px";
    addClone();
    moving = true;
    firstSlide.removeEventListener('transitionend', replaceToEnd);
  }

  sliderContent.addEventListener('mousedown', seeMovement);

  var initialX;
  var initialPos;
  function seeMovement(e) {
    initialX = e.clientX;
    getInitialPos();
    sliderContent.addEventListener('mousemove', slightMove);
    document.addEventListener('mouseup', moveBasedOnMouse);
  }

  function slightMove(e) {
    if (moving) {
      var movingX = e.clientX;
      var difference = initialX - movingX;
      if (Math.abs(difference) < (lengthOfSlide / 4)) {
        slightMoveSlides(difference);
      }
    }
  }

  function getInitialPos() {
    var slides = document.querySelectorAll('.testimonial-card-wrapper');
    var slidesArray = Array.prototype.slice.call(slides);
    initialPos = [];
    slidesArray.forEach(function (el) {
      var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
      initialPos.push(left);
    });
  }

  function slightMoveSlides(newX) {
    var slides = document.querySelectorAll('.testimonial-card-wrapper');
    var slidesArray = Array.prototype.slice.call(slides);
    slidesArray.forEach(function (el, i) {
      var oldLeft = initialPos[i];
      el.style.left = (oldLeft + newX) + "px";
    });
  }

  function moveBasedOnMouse(e) {
    var finalX = e.clientX;
    if (initialX - finalX > 0) {
      moveRight();
    } else if (initialX - finalX < 0) {
      moveLeft();
    }
    document.removeEventListener('mouseup', moveBasedOnMouse);
    sliderContent.removeEventListener('mousemove', slightMove);
  }
});

// mobile menu hamburger
window.onload = () => {
  const hamburgerToggle = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.close-btn img');
  const mobNav = document.querySelector('.mobile-header-menu');

  hamburgerToggle.addEventListener('click', () => {
    mobNav.style.width = '100%';
  });

  closeBtn.addEventListener('click', () => {
    mobNav.style.width = '0%';
  })

  window.addEventListener('resize', (event) => {
    if (event.target.outerWidth > 576 && mobNav.style.width == '100%') {
      mobNav.style.width = '0%';
    }
  });
};