define(['backbone', 'jquery', 'underscore', 'nanoscroller', 'views/portfolio/Project_View', 'views/portfolio/Thumb_View', 'text!templates/scrollableContent.html'],
    function (Backbone, $, _, nanoscroller, Project_View, Thumb_View, scrollableContent) {
        var Projects_View = Backbone.View.extend({

            events: {
                "click .thumb": "onThumbClick"
            },

            el: '#projects-panel',

            initialize: function () {
                _.bindAll(this, 'renderProjects', 'onFetchError', 'onSelectedPanelChanged', 'onPanelDeselected', 'onPanelSelected', 'onThumbClick','addScrollBar');

                this.collection.on('reset', this.renderProjects);

                Port.state_model.on('change:selectedPanel', this.onSelectedPanelChanged);
            },

            render: function () {

                $(this.el).html(_.template(scrollableContent, {paneID: 'thumbs-pane'}));
                this.collection.fetch({url: 'data/projectsData.json', success: this.renderProjects, error: this.onFetchError});

                return this;
            },

            renderProjects: function () {
                var self = this;
                _.each(self.collection.models, function (projectModel) {
                    var thumbView = new Thumb_View({model: projectModel, el: '#thumbs-pane .content-container'});
                    thumbView.render().el;
                });

                this.addScrollBar();
            },

            addScrollBar: function() {
                if (Port.isMobileDevice) {
                    $('.nano').removeClass('nano');
                } else {
                    //TODO: Using setTimeout here is an unfortunate way of dealing with nanoScroller's refusal to render. Can this be resolved in another way?
                    setTimeout(function () {
                        $('#thumbs-pane.nano').nanoScroller({ iOSNativeScrolling: true, preventPageScrolling: true });
                    }, 500);
                }
            },

            onFetchError: function (error) {
                console.warn(error);
            },

            onSelectedPanelChanged: function (response) {
                var selectedPanel = response.attributes.selectedPanel;
                (this.id !== selectedPanel) ? this.onPanelDeselected() : this.onPanelSelected();
            },

            onPanelDeselected: function () {
                if ($(this.el).hasClass('panel-shown')) {
                    $(this.el).removeClass('panel-shown').addClass('panel-hidden');
                }
            },

            onPanelSelected: function () {
                $(this.el).removeClass('panel-hidden').addClass('panel-shown');
            },

            onThumbClick: function (event) {
                event.stopPropagation();
                var projectModel = this.collection.findWhere({projectID: event.target.id});
                var selectedProject = new Project_View({model: projectModel});
                selectedProject.render().el;

                $('.project-panel').addClass('shown');
            }
        });
        return Projects_View;
    });
