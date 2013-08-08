define(['backbone', 'jquery', 'underscore', 'models/Project_Model'],
    function (Backbone, $, _, Project_Model) {
        var Projects_Collection = Backbone.Collection.extend({

            model: Project_Model,

            initialize: function () {
            }
        });

        return Projects_Collection;
    });
