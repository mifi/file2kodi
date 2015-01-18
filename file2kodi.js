var jayson = require('jayson');
var minimist = require('minimist');
var express = require('express');
var morgan = require('morgan');
var config = require('./config');
var app = express();


var argv = minimist(process.argv.slice(2));

if (argv['_'].length != 1) {
    console.log('Usage: node ' + process.argv[1] + ' [filename]');
    process.exit(1);
}

var fileToPlay = argv['_'][0];


var xbmcClient = jayson.client.tcp({
    host: config.params.kodiHostName,
    port: config.params.kodiPort
});

var xbmc = {
    playUrl: function(url) {
        xbmcClient.request('Player.Open', {item: {file: url}}, function(err, error, response) {
            if(err) throw err;
            console.log(response);
        });
    },
    stop: function(cb) {
        var playerId = 0;
        xbmcClient.request('Player.Stop', {playerid: playerId}, function(err, error, response) {
            if(err) console.log(err);
            console.log(response);
            cb();
        });
    }
}


app.use(morgan('combined'));


app.get('/', function(req, res){
    // TODO doesn't support seeking
    res.sendfile(fileToPlay);
});

app.listen(config.params.localPort, function() {
    console.log("Listening on " + config.params.localPort);
    xbmc.playUrl('http://' + config.params.localHostName + ':' + config.params.localPort + '/');
});

process.on('SIGINT', function() {
    console.log('Stopping playback');
    xbmc.stop(function() {
        process.exit();
    });
});
