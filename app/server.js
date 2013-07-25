var flatiron

flatiron = require('flatiron')

exports.attach = function() {
    var app

    app = this

    app.use(flatiron.plugins.http)
}
