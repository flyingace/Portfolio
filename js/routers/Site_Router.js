define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {

        var Site_Router = Backbone.Router.extend({
            routes: {

                'portfolio': 'gotoPortfolio',
                'info': 'gotoInfo',
                'contact': 'gotoContact',
                'contact/thanks': 'gotoFormThanks'
            },

            initialize: function () {
                _.bindAll(this, 'gotoPortfolio', 'gotoInfo', 'gotoContact','gotoFormThanks');

                this.state_model = Port.state_model;

            },

            gotoPortfolio: function (event) {
                this.state_model.set('selectedPanel','projects-panel');
            },

            gotoInfo: function () {
                this.state_model.set('selectedPanel','info-panel');
            },

            gotoContact: function() {
                this.state_model.set('selectedPanel','contact-panel');
            },

            gotoFormThanks: function() {
                // console.log(event);
                // console.log("youve gone to the thanks page");

            }
    });
    return Site_Router;
})
;
