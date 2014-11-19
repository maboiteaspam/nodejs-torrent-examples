var Client = require('node-torrent');
var client = new Client({
  logLevel: 'DEBUG'
});


var torrent = client.addTorrent('test.torrent');
torrent.on('complete', function() {
  console.log('complete!');
});

var torrent2 = client.addTorrent('test2.torrent');
torrent2.on('complete', function() {
  console.log('complete!');
});


var torrent3 = client.addTorrent('test3.torrent');
torrent3.on('complete', function() {
  console.log('complete!');
});
