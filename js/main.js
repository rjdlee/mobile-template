var Slides = function() {

    this.slideButtons = this.getElementsArray('nav_button');

    this.slides = this.getElementsArray('slide');
    this.activeSlide = 0;

    this.menuState = 0; /* 0 for navigation menu inactive, 1 for menu active */

    this.initListeners();

};

/* Add event listeners for buttons */
Slides.prototype.initListeners = function() {

    var navButton = document.getElementById('navBack');
    var menuButton = document.getElementById('navHome');

    navButton.addEventListener('click', function() {
        slider.changeSlide()
    }, false);
    menuButton.addEventListener('click', function() {
        slider.toggleMenu()
    }, false);

    for (var i = this.slideButtons.length - 1; i >= 0; i--) {

        this.slideButtons[i].addEventListener('click', function() {
            slider.changeSlide(this)
        }, false);

    }

}

/* Move to the next slide */
Slides.prototype.changeSlide = function(slideIndex) {

    var previousSlide = this.slides[this.activeSlide];

    //Keep track of the current slide number.
    if (slideIndex != null) {

        this.activeSlide = this.slideButtons.indexOf(slideIndex);
        this.toggleMenu();

    } else if (this.activeSlide < this.slides.length - 1) {

        this.activeSlide++;

    } else {

        this.activeSlide = 0;

    }

    var currentSlide = this.slides[this.activeSlide];

    if (previousSlide === currentSlide)
        return;

    //Run transitions.
    previousSlide.setAttribute('data-state', 'previous');
    currentSlide.setAttribute('data-state', 'active');

    //Timeout that runs after the transition to retain the post-transition states.
    window.setTimeout(function() {

        currentSlide.setAttribute('data-state', '');
        previousSlide.setAttribute('data-state', 'inactive');

    }, 300);

};

/* Toggle the menu of pages. Similar method to changeSlide() function. */
Slides.prototype.toggleMenu = function() {

    var content = document.getElementById('content'),
        state = this.menuState;

    if (this.menuState === 1) {

        content.setAttribute('data-state', 'previous');
        this.menuState = 0;

    } else {

        content.setAttribute('data-state', 'active');
        this.menuState = 1;

    }

    window.setTimeout(function() {

        if (state === 1) {

            content.setAttribute('data-state', '');

        } else {

            content.setAttribute('data-state', 'menu_on');

        }

    }, 300);

}

Slides.prototype.getElementsArray = function(className) {

    return Array.prototype.slice.call(document.getElementsByClassName(className));

};

var slider = new Slides();
