var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , router = require('./modules/server/shittyRouter.js').init(__dirname);

app.listen(5000);

// shitty web handler
function handler (req, res) {
  router.route(req, res)
}

// beatific sockets handler
var tags = {};
var broadcastMessage = function (tag) {
  var obj = {};
  obj[tag] = transform(tags[tag]);

  io.sockets.emit('tag', obj);
};

io.sockets.on('tag', function (tag, callback) {
  console.log(tag);

  tags[tag] = tags[tag] || 0;
  tags[tag] += 1;

  broadcastMessage(tag);
});

// utilities
var transform = function (number) {
  // a 'never-ending' growth
  return 1 - Math.pow(Math.E, -number);
};
