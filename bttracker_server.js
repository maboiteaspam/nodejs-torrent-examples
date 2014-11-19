var Server = require('bittorrent-tracker').Server;

var server = new Server({
  udp: true, // enable udp server? [default=true]
  http: true // enable http server? [default=true]
});

var port = 8080;

server.on('error', function (err) {
  // fatal server error!
  console.log(err.message);
});

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message);
});

server.on('listening', function (port) {
  console.log('tracker server is now listening on ' + port);
});

// start tracker server listening!
server.listen(port);

// listen for individual tracker messages from peers:

server.on('start', function (addr) {
  console.log('got start message from ' + addr);
});

server.on('complete', function (addr) {
  console.log("stop",addr)
});
server.on('update', function (addr) {
  console.log("stop",addr)
});
server.on('stop', function (addr) {
  console.log("stop",addr)
});

// get info hashes for all torrents in the tracker server
// Object.keys(server.torrents);

/*
 // get the number of seeders for a particular torrent
 server.torrents[infoHash].complete;

 // get the number of leechers for a particular torrent
 server.torrents[infoHash].incomplete;

 // get the peers who are in a particular torrent swarm
 server.torrents[infoHash].peers;

 */