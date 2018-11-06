var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [{
	text: 'Chat started.',
	author: 'machine'
}];
app.use(express.static('public'));
app.get('/',function (request, response) {
	response.status(200).send({message:' Success.'});
});

io.on('connection', function (socket) {
	console.log('conection recived.');
	socket.emit('message', messages);
	socket.on('newMessage', function (data) {
		messages.push(data);
		io.sockets.emit('message', messages);
	});
});
server.listen(8080, function(){
	console.log('Servidor ejecutandose en http://localhost:8080 ')
});