var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , router = require('./modules/server/shittyRouter.js').init(__dirname);

app.listen(5000);

// shitty web handler
function handler (req, res) {
  router.route(req, res)
}

// beatific sockets handler
io.sockets.on('connection', function (socket) {
  socket.emit('news', {hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
