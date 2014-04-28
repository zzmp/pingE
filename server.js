var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var router = require('./modules/server/shittyRouter.js')
  .init(__dirname);
var keyTrie = require('./modules/server/keyTrie.js');
var roomMap = {};

var messages = {};

app.listen(5000);

// shitty web handler
function handler (req, res) {
  router.route(req, res)
}

// beatific sockets handler
io.sockets.on('connection', function (socket) {
  messages.intro.call(socket);

  socket.on('match', function (data) {
    messages.match.call(socket, data);
  });

  socket.on('choose', function (data) {
    messages.unchoose.call(socket);
    messages.choose.call(socket, data);
  });

  socket.on('unchoose', function (data) {
    messages.unchoose.call(socket);
  });

  socket.on('disconnect', function (data) {
    messages.unchoose.call(socket);
  });

  socket.on('dashboard', function (data) {
    messages.dashboard.call(socket, data);
  });
});

messages.intro = function () {
  this.emit('intro', {
    intro:
      '          ()               \n' +
      '    ____ ___ ___ ____ ____ \n' +
      '   / o  / / __  / o  /__o_/\n' +
      '  / ___/_/_/ /_/__  /____\\\n' +
      ' / /             / /       \n' +
      '/_/             /_/        \n'
  });
};

messages.match = function (data) {
  var matches = keyTrie.match(data.text);
  
  this.emit('match', matches);

  this.emit('log', {log: matches});
};

messages.choose = function (data) {
  var room = keyTrie.add(data.text);

  this.join(room);
  roomMap[this.id] = room;

  this.emit('log', {log: 'joined room ' + room});
};

messages.unchoose = function () {
  var room = roomMap[this.id];
  if (!room) return;

  this.leave(room);
  keyTrie.remove(room);

  delete roomMap[this.id];

  this.emit('log', {log:'left room ' + room});
};

messages.dashboard = function () {
};
