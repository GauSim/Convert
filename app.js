var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var _ = require('underscore');
var $ = require('jquery');


var ViewModelBase = require("./ViewModelBase");

var logic = require("./logic");
var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//app.get('/', routes.index);
app.get('/', routes.indexController(ViewModelBase,$,_).indexAction);
app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var server = http.createServer(app);
// http server
server.listen(process.env.PORT, process.env.IP, function(){
  //var addr = server.address();
  console.log("[app.js] Server Online");
});


// Laden von Socket.io (Gibt für die Demo nur Fehler/Warnungen auf der Konsole aus)
var io = require('socket.io').listen(server).set('log level', 1);
io.sockets.on('connection', function (socket) {
 
 console.log("[app.js] clients:"+io.sockets.clients().length);
  
    var jobid = logic.func_getID(14)

  socket.emit('welcome', jobid);

  //socket.broadcast.emit('user_connected');

  socket.on('createjob',function(job){
      console.log("[app.js]"+jobid);

        // job.jobid
        // job.dropboxurl
        
        var on_done = function(donejob){
            
            console.log("[app.js] final callback");
            socket.emit('jobdone', donejob);    
        }
      
      logic.run(job,on_done);
      
      
  });

  socket.on('user agent', function (data) {
    //console.log('[socket.io] EMPFANGE "user agent"-Event vom Client:');
    //console.log(data, '\n');
  });
});