define(['backbone', 'jquery', 'underscore', 'views/portfolio/Slide_View', 'text!templates/carouselTemplate.html'],
    function (Backbone, $, _, Slide_View, carouselTemplate) {
        var Carousel_View = Backbone.View.extend({

            events: {
                'click #next-button': 'slideLeft',
                'click #prev-button': 'slideRight',
                'touchstart .slide-carousel': 'onTouchStart',
                'touchend .slide-carousel': 'onTouchEnd'
            },

            el: '.project-panel',

            template: carouselTemplate,

            initialize: function () {
                _.bindAll(this, 'addSlides', 'updateSlideDimensions', 'updateSlidePositions', 'onTouchStart', 'onTouchEnd', 'slideLeft', 'slideRight', 'cleanUp');
                this.model = this.options.model;
                this.slides = this.model.get('slides');

            },

            render: function () {

                $(this.el).append(_.template(this.template));

                this.activeSlide = 0;
                this.slideViews = [];
                this.touchStartX = [];
                this.touchEndX = [];

                this.addSlides();
                return this;
            },

            addSlides: function () {
                var self = this,
                    projectID = this.model.get('projectID');

                _.each(this.slides, function (projectSlide, i) {
                    var slide_id = projectID.concat(i);
                    var slide_view = new Slide_View({slideURL: projectSlide, slideID: slide_id});
                    slide_view.render();
                    self.slideViews.push(slide_view);
                });

                this.updateSlideDimensions();
                this.updateSlidePositions(this.activeSlide + 1);

            },

            updateSlideDimensions: function () {
                $windowWidth = $(window).width();
                //TODO: Can the sizing of the carousel and the slides be handled any other way?
                //                $('.project-slide').width($windowWidth);
                //                $('.slide-carousel').width($windowWidth * this.slideViews.length);
            },

            onTouchStart: function (event) {
                event.preventDefault();
                this.touchStartX = event.originalEvent.touches[0].pageX;
            },

            onTouchEnd: function (event) {
                event.preventDefault();
                var self = this;
                this.touchEndX = event.originalEvent.changedTouches[0].pageX;

                if (Math.abs(self.touchEndX - self.touchStartX) > 50) {
                    if (self.touchEndX > self.touchStartX) {
                        self.slideRight();
                    } else {
                        self.slideLeft();
                    }
                }
            },

            //TODO: Put the arrow buttons on a timer so that they fade significantly if they're not used after a given period of time. If they're clicked, they re-appear.

            slideLeft: function () {
                //set value of this.activeSlide & insure it does not exceed the number of slides or go below 0
                this.activeSlide += 1;
                this.activeSlide = (this.activeSlide < 0) ? 0 : this.activeSlide;
                this.activeSlide = (this.activeSlide > this.slideViews.length - 1) ? this.slideViews.length - 1 : this.activeSlide;

                this.updateSlidePositions(this.activeSlide + 1);
            },

            slideRight: function () {
                //set value of this.activeSlide & insure it does not exceed the number of slides or go below 0
                this.activeSlide -= 1;
                this.activeSlide = (this.activeSlide < 0) ? 0 : this.activeSlide;
                this.activeSlide = (this.activeSlide > this.slideViews.length - 1) ? this.slideViews.length - 1 : this.activeSlide;

                this.updateSlidePositions(this.activeSlide + 1);
            },

            updateSlidePositions: function (currentSlide) {

                $('.current').removeClass('current');
                $('.project-slide:nth-child(' + currentSlide + ')').addClass('current');

                //                var slideWidth = $('.project-slide').width(),
                //                    newLeftPos = (this.activeSlide * slideWidth * -1) + "px",
                //                    $carousel = $('.slide-carousel'),
                //                    $carouselPos = $carousel.css('left');
                //
                //                //if the carousel isn't already in place...
                //                if (newLeftPos !== $carouselPos) {
                //                    //shift carousel's absolute position accordingly
                //                    //TODO: Should this be translateX instead?
                //                    $carousel.css('left', newLeftPos);
                //                }
            },

            //            onOrientationChange: function () {
            //                var self = this;
            //                $('.slide-carousel').empty();
            //                $('.slide-carousel .slide-button').remove();
            //                this.render();
            //            },

            cleanUp: function () {
                this.undelegateEvents();
            }
        });
        return Carousel_View;
    });