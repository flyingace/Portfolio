// Require.js allows us to configure shortcut alias
require.config({
    paths: {
        // Major libraries
        backbone: 'libs/backbone/backbone-min',
        jquery: 'libs/jquery/jquery-min',
        // Note that lo-dash is being used though underscore is referenced
        underscore: 'libs/lodash/lodash',
        json2: 'libs/json2',

        // Require.js plugins
        text: 'libs/require/text',

        // jQuery plugins
        nanoscroller: 'libs/nanoscroller/jquery.nanoscroller',
        overthrow: 'libs/nanoscroller/overthrow',


        // Just a short cut so we can put our html outside the js dir
        templates: '../templates'

    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [ 'underscore', 'jquery', 'json2'],
            exports: 'Backbone'
        },
        'nanoscroller': {
            deps: [ 'jquery' ],
            exports: 'nanoscroller'
        }
    }
});

require([ 'views/App_View'],
    function (App_View) {
        var app_view = new App_View();
        app_view.render();
    });
