require.config({
    baseUrl: "app/",

    deps: ["main"],

    paths: {
        "jquery": "components/jquery/jquery",
        "underscore": "components/underscore/underscore",
        "backbone": "components/backbone/backbone",
        "backbone.layoutmanager": "components/layoutmanager/backbone.layoutmanager"
    },

    shim: {
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },

        "backbone.layoutmanager": {
            deps: ["jquery", "backbone", "underscore"],
            exports: "Backbone.Layout"
        }
    }
});
