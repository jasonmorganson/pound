var flatiron

flatiron = require('flatiron')

exports.attach = function() {
    var app

    app = this

    app.config
        .argv()
        .env('_')
        .file( 'config/config.json' )
        .file( 'env', 'config/' + app.config.get('env') + '.json' )
        .defaults({
            'http': {
                'port': 80
            }
        })
}
