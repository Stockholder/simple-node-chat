var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1337);
console.log(__dirname);
function handler (req, res) {
  fs.readFile(__dirname + '/client_socket.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading client_socket.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	socket.emit('text', { msg_client: "Bem vindo ao socket" });
	socket.on('msg_server', function (data) {
		console.log(data['msg']);
		io.sockets.emit('text', { msg_client: data['msg'] });
	});
});
