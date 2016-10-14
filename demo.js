var express = require('express');
var app = express();

//app.get('/', function (req, res) {
  //res.send('Hello World!');
  //res.sendfile('index.html');
//});

app.use('/', express.static('public'));

//app.get('/search', function(req, res) {
//  res.json([ 'http://www.apple.com/', 'http://www.wwe.com/', 'http://www.reddit.com/'])

  //console.log(req.body.objectData);
  //res.contentType('json');
  //res.send({ some: JSON.stringify({response:'json'}) });

  //console.log(req.query.data);
//});

    app.post('/search', function(req, res) {
      //console.log(req.body.objectData);
      res.contentType('json');
      res.send({ results: [ 'http://www.apple.com/', 'http://www.wwe.com/', 'http://sleepyti.me/'] });
    });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

