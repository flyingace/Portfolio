define(['backbone','jquery', 'underscore', 'text!templates/thumbTemplate.html'],
    function (Backbone, $, _, Thumb_Template) {
        var Thumb_View = Backbone.View.extend({

            events: {
            },

            el: '#thumbnails',

            initialize: function() {
                this.model = this.options.model;
                this.projectID = this.model.get('projectID');
                this.thumbURL = this.model.get('thumbURL');
            },

            render: function () {
                $(this.el).append(_.template(Thumb_Template, {projectID:this.projectID, thumbnailURL: this.thumbURL}));
                return this;
            }
        });
        return Thumb_View;
    });
