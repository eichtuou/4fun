// Set up an Express.js server with various middleware and route handlers.

// Import dependencies
var express = require('express');
var path = require('path');
var debug = require('debug')('appDebug');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Import route handlers
var routes = require('./routes/index');

// Instantiate app
var app = express();
app.set('port', process.env.PORT || 1337);

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve favicon
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/favicon.ico', (req, res) => res.status(204)); // Ignore requests

// Set up middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', routes); // root

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler (with stacktrace)
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler (no stacktrace)
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start server and listen on the specified port
var server = app.listen(app.get('port'), function () {
    debug('Server listening on port ' + server.address().port);
});

