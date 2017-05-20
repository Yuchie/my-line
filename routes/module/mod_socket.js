var http = require('http');

//create server instance
var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end('server connected');
});
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8888;

server.listen(port);
io.sockets.on('connection', function(socket){
	io.sockets.on('connection', function(d){
		io.emit('receiveMessage', d);
	})
	
	console.log('connected');
})