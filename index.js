var express = require('express');
var app = express();

var assert = require('assert');
var fs = require('fs');
var child_process = require('child_process');
var request = require('request');
var unfluff = require('unfluff');


app.use('/', express.static('public'));


app.get('/search', function(req, res){
  var query = req.query;
  var minutesMax = query.t;

  var terminal = require('child_process').spawn('bash');

  console.log('Sending STDIN to terminal');
  terminal.stdin.write('casperjs ~/Documents/Code/Burst-HackNJIT-2015/google.js ' + query.q + '\n');
  terminal.stdin.end();

  var Out = "";
  var text = "";

  var resultsItems = [];
  terminal.stdout.on('data',function(data) {
    Out=(Out + data);
  });

  terminal.on('exit', function(code) {
    console.log('child process exited with code' + code);

    if (Out !== null && Out !== undefined) {
      Out = Out.split('\n');  //Split into an array of Strings
      Out.pop();              //Pop the trailing newline character

      //Remove the URL from CasperJS that isn't a result
      Out = Out.filter(function (e, i, a) {
        return e.indexOf("/search?q=") === -1;
      });

      for (var i = 0; i < Out.length; i++){
        if (Out[i] !== null && Out[i] !== undefined && typeof Out[i] === "string") {
          if (Out[i].indexOf("/url?q=") > -1)
            Out[i] = Out[i].split("/url?q=")[1]; //Chop up URLS and put them into an array
          if (Out[i].indexOf("&sa=") > -1)
            Out[i] = Out[i].split("&sa=")[0];

          Out[i] = unescape(Out[i]);
        }
      }

      console.log(Out);

      resultsItems = [Out.length];

      var wait = Out.length;

      //TODO Make results consistent and sorted according to Google ranking
      for(var i = 0; i < Out.length; i++){
        (function(i) {
          if(Out[i] !== undefined && Out[i] !== null){
	    console.log(Out[i]);
            request(Out[i], function(error, response, body) {
                var data = unfluff(body);
                var $ = data.text;

                var minutes = $.split(' ').length/150;

                //if
                result = { url: Out[i], content: $, minutes: minutes};

                //if
                resultsItems[i] = result;

                //end if

                //var

                //$(".entry-title > a").each(function() {
                //var link = $(this);
                //var text = link.text();

                //console.log(text + " -> ");
                //});

                wait--;

                if (wait === 0) {
                  resultsItems = resultsItems.filter(function (e, i, a) {
                    if (e.minutes < minutesMax) {
                      minutesMax -= e.minutes;
                      return true;
                    }

                    return false;

                  });

                  resultsItems = resultsItems.map(function (e) { return e.url; } );

                  console.log('done!');

                  res.send( { results: resultsItems } );


                }

              }
            );

          }

        })(i);
      }

    }
  //res.json(resultsItems);
  });

});

/* istanbul ignore next */

if (!module.parent) {
  app.listen(3000);
  console.log('AND HIS NAME IS JOHN CENA, AT PORT  3000');
}

