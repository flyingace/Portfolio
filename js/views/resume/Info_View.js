define(['backbone', 'jquery', 'underscore', 'nanoscroller', 'views/resume/Resume_View', 'text!templates/scrollableContent.html'],
    function (Backbone, $, _, nanoscroller, Resume_View, scrollableContent) {
        var Info_View = Backbone.View.extend({

            events: {
            },

            el: '#info-panel',

            initialize: function () {
                _.bindAll(this, 'onSelectedPanelChanged', 'renderResume', 'onPanelSelected', 'onPanelDeselected');

                Port.state_model.on('change:selectedPanel', this.onSelectedPanelChanged);
            },

            render: function () {
                $(this.el).append(_.template(scrollableContent, {paneID: 'resume-pane'}));

                if (Port.isMobileDevice) {
                    $('.nano').removeClass('nano');
                } else {
                    $('#resume-pane.nano').nanoScroller({ iOSNativeScrolling: true, preventPageScrolling: true});
                }

                this.renderResume();

                return this;
            },

            renderResume: function () {
                var resumeView = new Resume_View({el: '#resume-pane .content-container'});
                resumeView.render().el;

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
            }
        });
        return Info_View;
    });