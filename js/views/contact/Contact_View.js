define(['backbone', 'jquery', 'underscore','views/contact/Form_View','text!templates/scrollableContent.html', ],
    function (Backbone, $, _, Form_View, scrollableContent) {
        var Contact_View = Backbone.View.extend({

            events: {
            },

            el: '#contact-panel',

            initialize: function () {
                _.bindAll(this, 'renderForm', 'onSelectedPanelChanged', 'onPanelSelected', 'onPanelDeselected');

                Port.state_model.on('change:selectedPanel', this.onSelectedPanelChanged);
            },

            render: function () {

                $(this.el).append(_.template(scrollableContent, {paneID: 'contact-pane'}));

                this.renderForm();

                return this;
            },

            renderForm:function() {
                this.formView = new Form_View({el: '#contact-pane .content-container'});

                this.formView.render().el;
            },


            onSelectedPanelChanged: function (response) {
                var selectedPanel = response.attributes.selectedPanel;
                (this.id !== selectedPanel) ? this.onPanelDeselected() : this.onPanelSelected();
            },

            onPanelDeselected: function () {
                if ($(this.el).hasClass('panel-shown')) {
                    $(this.el).removeClass('panel-shown').addClass('panel-hidden');
                }

                this.formView.resetForm();
            },

            onPanelSelected: function () {
                $(this.el).removeClass('panel-hidden').addClass('panel-shown');
            },
        });
        return Contact_View;
    });