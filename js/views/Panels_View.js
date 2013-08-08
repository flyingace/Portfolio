define(['backbone', 'jquery', 'underscore', 'collections/Projects_Collection', 'views/Nav_View', 'views/portfolio/Portfolio_View', 'views/resume/Info_View', 'views/contact/Contact_View', 'text!templates/panelsTemplate.html'],
    function (Backbone, $, _, Projects_Collection, Nav_View, Projects_View, Info_View, Contact_View, panelsTmplt) {
        var Panels_View = Backbone.View.extend({

            events: {
            },

            el: '#main',

            initialize: function () {
                _.bindAll(this, 'onNewPanelSelected');

                this.state_model = this.options.state_model;
            },

            render: function () {
                $(this.el).html(_.template(panelsTmplt));

                this.nav_view = new Nav_View();
                this.nav_view.on('newPanelSelected', this.onNewPanelSelected);

                var projects_collection = new Projects_Collection({url: 'data/projectsData.json'});
                this.projects_view = new Projects_View({id: 'projects-panel', collection: projects_collection});
                this.info_view = new Info_View({id: 'info-panel'});
                this.contact_view = new Contact_View({id: 'contact-panel'});

                this.nav_view.render().el;
                this.projects_view.render().el;
                this.info_view.render().el;
                this.contact_view.render().el;

                return this;
            },

            onNewPanelSelected: function (panelID) {
                //TODO: Can this be simplified without turning them all off first?
                switch (panelID) {
                    case "portfolio":
                        this.projects_view.onPanelSelected();
                        this.info_view.onPanelDeselected();
                        this.contact_view.onPanelDeselected();
                        break;
                    case "info":
                        this.projects_view.onPanelDeselected();
                        this.info_view.onPanelSelected();
                        this.contact_view.onPanelDeselected();
                        break;
                    case "contact":
                        this.projects_view.onPanelDeselected();
                        this.info_view.onPanelDeselected();
                        this.contact_view.onPanelSelected();
                        break;
                    default:
                        this.projects_view.onPanelSelected();
                        this.info_view.onPanelDeselected();
                        this.contact_view.onPanelDeselected();
                        break;
                }
            }
        });
        return Panels_View;
    });