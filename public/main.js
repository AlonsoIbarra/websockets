var socket = io.connect('http://localhost:8080', { 'foceNew': true});
socket.on('message', function (data) {
	console.log(data);
	render(data);
});
function render(data) {
	var html = data.map(function(item, index){
	 return (`<div>
			<strong>${item.author}</strong>
			<em>${item.text}</em>
		</div>`);
	}).join(' ');
	console.log(html)
	document.getElementById('messages').innerHTML = html;
}

function addMessage(event) {
	var payload = {
		author: document.getElementById('author').value,
		text: document.getElementById('text').value
	};
	socket.emit('newMessage', payload);
	return false;
}