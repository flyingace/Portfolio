define(['backbone', 'jquery', 'underscore'],
    function(Backbone, $, _) {

        var Project_Model = Backbone.Model.extend({

            defaults: {
                'projectName': 'Project Name',
                'projectID': '',
                'thumbURL': '',
                'techUsed': 'Technologies used in the project.',
                'projectDescription': 'A longer description of the project.',
                'slides': []
            },

            initialize: function() {
                _.bindAll(this, "cacheFirstSlide");

//                this.on('change:slides', 'cacheFirstSlide');

//                this.cacheFirstSlide();
            },

            cacheFirstSlide: function() {
//                console.log(this.get('slides'));
//                var firstSlide = new Image();
//                var firstSlideSrc = this.get('slides')[0];
//                if (firstSlideSrc.search('.png | .jpg | .jpeg | .gif') !== -1 ) {
//                    firstSlide.src = this.get('slides')[0];
//                }
            }
        });

        return Project_Model;
    });
