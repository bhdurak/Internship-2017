var cluster = require('cluster');
if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var execSync = require('child_process').execSync;

  //to specify pages
  var index = require('./routes/index');
  var users = require('./routes/users');
  var profileEng = require('./routes/profileEng');
  var profileTr = require('./routes/profileTr');

  var app = express();

  //Starting server on port 8083
  var http = require('http').Server(app).listen(8083);

  console.log("Server Started at 8083");

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  //to use pages
  app.use('/', index);
  app.use('/users', users);
  // '/profile' has our upload function and handler. therefore the upload destination is :8080/profile .
  app.use('/profileEng', profileEng);
  app.use('/profileTr', profileTr);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    var hata = execSync('echo '+err+' >> log.txt')
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  /*process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });*/


  module.exports = app;
}
