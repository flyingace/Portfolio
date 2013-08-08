define(['backbone', 'jquery', 'underscore', 'views/portfolio/Carousel_View', 'views/portfolio/Description_View'],
    function (Backbone, $, _, Carousel_View, Description_View) {
        var Project_View = Backbone.View.extend({

            events: {
                'click .project-close': 'closeProject'
            },

            el: '.project-panel',

            initialize: function () {
                _.bindAll(this, 'closeProject');

                this.model = this.options.model;
            },

            render: function () {
                var self = this;

                this.carousel_view = new Carousel_View({model: this.model});
                this.carousel_view.render().el;

                this.description_view = new Description_View({model: this.model});
                this.description_view.render().el;

                return this;
            },

            closeProject: function() {
                $(window).off('orientationchange');
                $(this.el).removeClass('shown');
                this.carousel_view.cleanUp();
                $('.carousel-view').remove();
                this.description_view.cleanUp();
                $('.description-view').remove();
                $(this.el).empty();
            }
        });
        return Project_View;
    });