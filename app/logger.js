var errs, flatiron, winston

errs = require('errs')
flatiron = require('flatiron')
winston = require('winston')

exports.attach = function() {

    var app, logger

    app = this

    app.use(flatiron.plugins.log)

    logger = app.log.get('default')

    logger.transports.console.colorize = true
    logger.transports.console.prettyPrint = true

    if (app.env !== 'development') {
        logger.remove(winston.transports.Console)
    }

    logger.add(winston.transports.File, {
        level: 'info',
        name: 'file.info',
        filename: 'log/info.log'
    })

    logger.add(winston.transports.File, {
        level: 'warn',
        name: 'file.warn',
        filename: 'log/warnings.log'
    })

    logger.add(winston.transports.File, {
        level: 'error',
        name: 'file.error',
        filename: 'log/errors.log'
    })

    logger.add(winston.transports.File, {
        level: 'error',
        handleExceptions: true,
        name: 'file.exceptions',
        filename: 'log/exceptions.log'
    })

    process.addListener('uncaughtException', function(err) {
        console.log(err.stack.split('\n'))
        app.log.error(err.message)
        process.exit(1)
    })
}
