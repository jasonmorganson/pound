var errs = require('errs'),
    flatiron = require('flatiron'),
    restful = require('restful'),
    resourceful = require('resourceful');

var app = module.exports = flatiron.app;

app.use(require('./config'));
app.use(require('./logger'));
app.use(require('./server'));
app.use(require('./routes'));

// Load resources
app.use(flatiron.plugins.resourceful, app.config.get('resourceful'));

// Expose all resources as restful routers
app.use(restful);


app.on('init', function(err) {

    app.log.verbose("Initialized");
});

app.start(app.config.get("http:port"), function(err) {

    if (err) {
        throw errs.merge(err, "Could not start properly, exiting");
    }

    app.log.info("Listening on http://" + app.server.address());
});

