var tracker = require("node-bittorrent-tracker");

var t = tracker.Tracker();

tracker.udp.createServer(t, 8080);
tracker.http.createServer(t, 8080);