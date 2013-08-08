define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {

    var State_Model = Backbone.Model.extend({

        defaults:{
            'selectedPanel':'projects-panel' //projects-panel, info-panel, contact-panel
        },

        initialize:function () {
            _.bindAll(this);
        }
    });

    return State_Model;
});
