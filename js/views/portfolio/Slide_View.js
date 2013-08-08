define(['backbone', 'jquery', 'underscore', 'text!templates/slideTemplate.html'],
    function (Backbone, $, _, slideTemplate) {
        var Slide_View = Backbone.View.extend({

            events: {
            },

            el: '.slide-carousel',

            template: slideTemplate,

            initialize: function () {
                _.bindAll(this, 'centerImg', 'recenterImg');
                this.slideID = this.options.slideID;
                this.slideURL = this.options.slideURL;

                var self = this;
                $(window).on('orientationchange', this.recenterImg);
            },

            render: function () {
                $(this.el).append(_.template(this.template, {slide_id: this.slideID, slide_URL: this.slideURL}));

                this.centerImg();

                return this;
            },

            centerImg: function () {
                var $targetImg = $('img#' + this.slideID);

                $targetImg.load(function () {
                        var imgStyles = {
                            marginTop: $targetImg.height() * -0.5,
                            marginLeft: $targetImg.width() * -0.5
                        };
                        //alert(imgStyles.marginLeft);

                        $targetImg.css(imgStyles);
                    }
                );
                //                alert("howdy");
            },

            recenterImg: function () {
                var $targetImg = $('img#' + this.slideID);

                //$targetImg.removeAttr('style');
                var imgStyles = {
                    marginTop: $targetImg.height() * -0.5,
                    marginLeft: $targetImg.width() * -0.5
                };
                //alert(imgStyles.marginLeft + "r");

                $targetImg.css(imgStyles);

            }
        });
        return Slide_View;
    });