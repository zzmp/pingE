  var fs = module.require('fs');

  var complaint = 'It doesn\'t seem to be working.'
              + '\nI would complain to that guy ->';
  
  var root = '/';

  var indexPath = '/html/index.html';

  var folders = {
    html:    'html',
    modules: 'js',
    style:   'css',
    def:     'def'
  };

  var contents = {
    html: 'text/html',
    js:   'text/javascript',
    css:  'text/css',
    def:  'text/plaintext'
  };

  var shittyRouter = {};

  shittyRouter.getSettings = function () {
    return {
      complaint: complaint,
      root:      root,
      index:     indexPath,
      folders:   folders,
      contents:  contents
    };
  };

  shittyRouter.init = function(path) {
    root = path;
    return this;
  }

  shittyRouter.setIndex = function (path) {
    indexPath = path || '/';
  };

  shittyRouter.setFolder = function (folder, type) {
    type = type || this; // chaining
    if (!type) return;
    folders.type = folder;
    return type;
  };

  shittyRouter.setContent = function (content, type) {
    type = type || this; // chaining
    if (!type) return;
    folders.content = content;
    return type;
  };

  shittyRouter.route = function (req, res) {
    if (req.url === '/') req.url = indexPath;

    if (indexPath !== '/') { // allow index.html at root
      var folder = req.url.indexOf('/', 1) === -1
                   ? 'def'
	       	   : req.url.substring(1, req.url.indexOf('/', 1));
    } else folder = 'html';
    var type = contents[folders[folder]];
   
    console.log(root + req.url);

    fs.readFile(root + req.url,
      function (err, data) {
        if (err) {
	  res.writeHead(500);
	  return res.end(complaint);
	}

	res.writeHead(200, {'Content-Type': type});
	res.end(data);
      }
    );
  };

module.exports = shittyRouter;
