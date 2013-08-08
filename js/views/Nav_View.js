define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {
        var Nav_View = Backbone.View.extend({

            events: {
                "click .panel-title": "onTitleClicked"
            },

            el: '.nav',

            initialize: function () {
                _.bindAll(this, 'onTitleClicked');
            },

            render: function () {
                return this;
            },

            onTitleClicked: function (event) {
                //deselect all the buttons
                $(this.el).children().removeClass('selected');
                //select the clicked button
                $(event.target).addClass('selected');
                //trigger the event that will notify Panels_View of the change
                this.trigger('newPanelSelected', event.target.id);
            }
        });
        return Nav_View;
    });