var flatiron = require('flatiron');

exports.attach = function() {

    var app = this;

    app.use(flatiron.plugins.http);
};
