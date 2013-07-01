require([
    "app",
    "router",
    "backbone.layoutmanager"
], function (app, Router) {

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.Layout.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        fetch: function (path) {
            // Concatenate the file extension.
            path = app.tplPrefix + path + ".tpl";

            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(app.root + path, function (contents) {
                done(JST[path] = _.template(contents));
            });
        }
    });


    // start router
    app.router = new Router();
    Backbone.history.start({pushState: false});
});
