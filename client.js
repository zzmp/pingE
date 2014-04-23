var socket = io.connect('http://localhost');

var broadcastMessage = function (tag) {
  socket.emit('tag', {
    tag: tag
  });
};

socket.on('tag', function (tag) {
  console.log(tag);
});

var echo = function (tag) {
  broadcastMessage(tag);

  Mousetrap.echo(echo, 'enter');
};

Mousetrap.echo(echo, 'enter');
