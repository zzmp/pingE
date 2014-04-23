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

  // prevent ghost keypress on next echo
  return false;
};

Mousetrap.echo(echo, 'enter');
