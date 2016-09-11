define(['backbone', 'jquery', 'underscore', 'nanoscroller', 'text!templates/projectTemplate.html'],
    function (Backbone, $, _, nanoscroller, projectTemplate) {
        var Description_View = Backbone.View.extend({

            events: {
                'click .project-title': 'toggleDescriptionVisibility',
                'click .info-button': 'toggleDescriptionVisibility'
            },

            el: '.project-panel',

            template: projectTemplate,

            initialize: function () {
                _.bindAll(this, 'toggleDescriptionVisibility', 'cleanUp');

                this.model = this.options.model;

                this.projectID = this.model.get('projectID');
                this.project_title = this.model.get('projectName');
                this.tech_used = this.model.get('techUsed');
                this.project_description = this.model.get('projectDescription');
            },

            render: function () {

                $(this.el).append(_.template(this.template, {project_ID: this.projectID, project_title: this.project_title, project_description: this.project_description}));

                return this;
            },


            //TODO: Should this be broken down into a few small functions?
            toggleDescriptionVisibility: function () {
                var $description = $('.project-description'),
                    $descriptionText = $('.description-text'),
                    $descriptionHeight = 30, //taken from padding on top and bottom of $descriptionText (which returns a string, so...)
                    $descriptionTop = $description.position().top,
                    $slideButton = $('.slide-button');

                $('.description-text').children().each(function () {
                    $descriptionHeight += $(this).outerHeight(true);
                    //console.log($descriptionHeight);
//                    //console.log(child);
                    //console.log($(this).outerHeight());
                });

                //console.log($descriptionTop, $descriptionHeight);

                $description.toggleClass('shown');
                $slideButton.toggleClass('hidden');

                if ($description.hasClass('shown')) {
                    var newTop = $descriptionTop - $descriptionHeight;
                    //console.log(newTop);
                    newTop = (newTop > 0) ? newTop : 0;
                    //console.log(newTop);
                    $description.css('top', newTop);

                    if (Port.isMobileDevice) {
                        $('.project-description.nano').removeClass('nano');
                    } else {
                        //TODO: Using setTimeout here is an unfortunate way of dealing with nanoScroller's refusal to render. Can this be resolved in another way?
                        setTimeout(function () {
                            $('.project-description.nano').nanoScroller({ iOSNativeScrolling: true, preventPageScrolling: true });
                        }, 500);
                    }

                } else {
                    $description.css('top', '');
                }
                //before reveal
                //get height of box
                //set css height inline to height of box
                //apply nano scroll if nec.
                //

            },

            cleanUp: function () {
                this.undelegateEvents();
            }
        });
        return Description_View;
    });