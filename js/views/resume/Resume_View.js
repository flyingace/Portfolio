define(['backbone', 'jquery', 'underscore', 'text!templates/resume.html'],
    function (Backbone, $, _, resumeTmplt) {
        var Backbone_View = Backbone.View.extend({

            events: {
                'mouseover .job': 'addHoverState',
                'mouseout .job': 'removeHoverState',
                'click .job': 'toggleJobDesc'
            },

            initialize: function () {
                _.bindAll(this, 'toggleJobDesc', 'addHoverState', 'removeHoverState');
            },

            render: function () {
                $(this.el).html(resumeTmplt); //TODO: not really being used as a template--adjust this?

                return this;
            },

            toggleJobDesc: function (event) {
                var $targetJob = $(event.currentTarget);
                $targetJob.toggleClass('selected');

                if (Port.isMobileDevice) {
                    $('.nano').removeClass('nano');
                } else {
                    $('#resume-pane.nano').nanoScroller({ iOSNativeScrolling: true, preventPageScrolling: true});
                }

                if ($('#main').hasClass("mobile")) {
                    $targetJob.removeClass(':active :hover');
                }

                event.stopPropagation();
            },

            addHoverState: function (event) {
                if (!Port.isMobileDevice) {
                    var $targetJob = $(event.currentTarget);
                    $targetJob.addClass('hover');
                }
            },

            removeHoverState: function (event) {
                if (!Port.isMobileDevice) {
                    var $targetJob = $(event.currentTarget);
                    $targetJob.removeClass('hover');
                }
            }
        });
        return Backbone_View;
    });