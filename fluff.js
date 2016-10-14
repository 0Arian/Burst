echo extractor = require('unfluff');

data = extractor.lazy(my_html_data, 'en');

var request = require("request");
var unfluff = require(“unfluff””;

request({
  uri: "",
}, function(error, response, body) {
  var $ = unfluff.text(body);

  $(".entry-title > a").each(function() {
    var link = $(this);
    var text = link.text();

    console.log(text + " -> ");
  });
});


