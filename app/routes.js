var fs = require('fs'),
    errs = require('errs'),
    plates = require('plates'),
    director = require('director');

exports.attach = function() {

    var app = this;

    app.use(require('./server'));

    app.http.router.get( '/', function() {

        var req = this.req,
            res = this.res,
            headers = req.headers || { 'Content-Type': 'text/html' },
            body = fs.readFileSync( './app/templates/index.html', 'utf-8' );

        //body = plates.bind(body, { user: username } );

        res.writeHead(200, headers);
        res.end(body);
    });

    var onNotFound = app.http.router.notfound = function(callback) {

        var req = this.req,
            res = this.res,
            headers = req.headers || { 'Content-Type': 'text/html' };
            NotFound = new director.http.NotFound;

        NotFound.message += ': ' + req.url;
        res.writeHead(404, headers);
        res.end(NotFound);
        callback(NotFound, req, res);
    };

    var onError = app.http.onError = function(err, req, res) {

        var status = err.status || 500,
            headers = err.headers || { 'Content-Type': 'text/html' },
            body = err.message || err.body.error || "Error";

        if (err) {

            if (err.status >= 500) { app.log.error(body); }
            else if (err.status >= 400) { app.log.warn(body); }
            else { app.log.debug(body); }

            res.writeHead(status, headers);
            res.end(body);
        }
    };

};
