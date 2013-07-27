var fs, path, errs, flatiron, plates, director, oppressor

fs = require('fs')
path = require('path')
errs = require('errs')
filed = require('filed')
plates = require('plates')
oppressor = require('oppressor')
director = require('director')
flatiron = require('flatiron')

exports.attach = function() {
    var app, onNotFound, onError

    app = this

    app.use(require('./server'))

    app.use(flatiron.plugins.static)

    app.static(path.join(__dirname, '../public'))
    app.static(path.join(__dirname, '../vendor'))

    app.router.get( '/', function() {
        var req, res, headers, body, templates

        req = this.req
        res = this.res

        templates = path.join(__dirname, '/templates')

        filed(templates).pipe(oppressor(req)).pipe(res);
    })

    onNotFound = app.router.notfound = function(callback) {
        var req, res, headers, NotFound

        req = this.req
        res = this.res
        headers = req.headers || { 'Content-Type': 'text/html' }
        NotFound = new director.http.NotFound

        NotFound.message += ': ' + req.url
        res.writeHead(404, headers)
        res.end(NotFound.message)
        callback(NotFound, req, res)
    }

    onError = app.http.onError = function(err, req, res) {
        var status, headers, body

        status = err.status || 500
        headers = err.headers || { 'Content-Type': 'text/html' }
        body = err.message || err.body.error || "Error"

        if (err) {

            if (err.status >= 500) app.log.error(body)
            else if (err.status >= 400) app.log.warn(body)
            else app.log.debug(body)

            res.writeHead(status, headers)
            res.end(body)
        }
    }
}
