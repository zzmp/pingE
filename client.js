var socket = io.connect('http://localhost');

socket.on('intro', function (data) {
  console.log(data.intro);
});

socket.on('log', function (data) {
  console.log(data.log);
});
