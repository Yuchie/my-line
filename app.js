var express = require('express');
var app = module.exports = express();
var http = require('http').Server(app);

var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var index = require('./routes/index');
var talk = require('./routes/talk');

// var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/talk', talk);

var port = process.env.PORT || 5000;

var server = http.listen(port, function(){
	console.log("App is running on port " + port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	//connect
	socket.emit('message', function(message){
		//message
		console.log('message:' +msg);
		io.emit('message', 'You said "' + msg + '".');
	})
	socket.on('disconnect', function(){
		//disconnect
		console.log('disconnected');
	});
});

app.set('io', io);

var socketIoChatSocket = io.of('/talk').on('connection', function(client){
	client.emit('connected');
});
