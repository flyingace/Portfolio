define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {

    var Project_Model = Backbone.Model.extend({

        defaults:{
            'projectName':'Project Name',
            'projectID':'',
            'thumbURL':'',
            'techUsed':'Technologies used in the project.',
            'projectDescription':'A longer description of the project.',
            'slides':[]
        },

        initialize:function () {
            _.bindAll(this);
        }
    });

    return Project_Model;
});
