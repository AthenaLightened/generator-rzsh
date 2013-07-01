define([
    "app",
    "backbone"
], function (app, Backbone) {
    return Backbone.Router.extend({

        routes: {
            "": "index"
        },

        index: function () {
            console.log("Hello world");
        }
    });
});
