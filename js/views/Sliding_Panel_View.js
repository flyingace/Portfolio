define(['backbone','jquery', 'underscore','text!templates/scrollableContent.html'],
    function (Backbone, $, _, Sliding_Panel_Template) {

        var Sliding_Panel_View = Backbone.View.extend({

            events: {
            },

            el: '#main',

            state_model: Port.state_model,

            initialize: function() {
                this.panelID = this.model.get('panelID');

            },

            render: function () {
                $(this.el).html(_.template(Sliding_Panel_Template));
                return this;
            },

            onSelectedPanelChanged: function () {
                var selectedPanel = this.state_model.get('selectedPanel');
                (this.id !== selectedPanel) ? this.collapsePanel() : this.expandPanel();
            },

            collapsePanel: function () {
                $(this.el).removeClass('selected');
            },

            expandPanel: function () {
                $(this.el).addClass('selected');
            }
        });
        return Sliding_Panel_View;
    });
