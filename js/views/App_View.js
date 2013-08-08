define(['backbone', 'jquery', 'underscore', 'models/State_Model','views/Panels_View', 'routers/Site_Router'],
    function (Backbone, $, _, State_Model, Panels_View, Site_Router) {

        var App_View = Backbone.View.extend({
            el: '#main',

            initialize: function () {
                Port.state_model = new State_Model();
                this.panels_view = new Panels_View();

                var site_router = new Site_Router();
                Backbone.history.start();
            },
            render: function () {
                this.panels_view.render().el;


                return this;
            }
        });
        return App_View;
    });
