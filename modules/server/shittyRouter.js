  var fs = module.require('fs');

  var complaint = 'It doesn\'t seem to be working.' +
                '\nI would complain to that guy ->';
  
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
    if (!type) return false;
    folders.type = folder;
    return this;
  };

  shittyRouter.setContent = function (content, type) {
    if (!type) return false;
    folders.content = content;
    return this;
  };

  shittyRouter.route = function (req, res) {
    var getExt = function (url) {
      var ext = url.substr(url.lastIndexOf('.') + 1);
      type =  contents[ext] ? contents[ext] : contents['def'];
    }

    var folder;
    var type;

    if (req.url === '/') req.url = indexPath;

    if (indexPath !== '/') { // expect uniform folder contents
      folder = req.url.indexOf('/', 1) === -1 ?
	getExt(req.url) :
	req.url.substring(1, req.url.indexOf('/', 1));
    } else folder = 'html';

    type = type || contents[folders[folder]];
   
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
