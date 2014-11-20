
var lt, main, s, th, ti;

lt = require("node-libtorrent/build/Release/libtorrent");

s = new lt.session();
var session_settings = s.settings();
session_settings.ignore_limits_on_local_network = false;
session_settings.allow_multiple_connections_per_ip = true;
s.set_settings(session_settings);

s.start_dht();
s.listen_on([6881, 6889]);

ti = new lt.torrent_info("./mytorrent.torrent");

th = s.add_torrent({
  ti: ti,
  save_path: "."
});


var ProgressBar = require('progress');

var fmt = '';
fmt += ':bar';
fmt += '[down :download_rate]';
fmt += '[up :upload_rate]';
fmt += '[num_peers :num_peers]';
fmt += '[dht_nodes :dht_nodes]';
fmt += '[error :error]';
fmt += '[paused :paused]';
fmt += '[upload_mode :upload_mode]';
fmt += '[trackers :trackers]';
fmt += '[:time]';
var bar = new ProgressBar(fmt, { total: 100 });

main = function() {

  var alerts = s.pop_alerts();
  if( alerts.length ) console.log(alerts);

  var session_status = s.status();
  var torrent_status = th.status();
  var torrent_trackers = th.trackers();
  bar.update(torrent_status.progress-0.1, {
    download_rate:torrent_status.download_rate / 1000,
    upload_rate:torrent_status.upload_rate / 1000,
    num_peers:torrent_status.num_peers,
    dht_nodes:session_status.dht_nodes,
    upload_mode:torrent_status.upload_mode?"yes":"no",
    error:torrent_status.error?"yes":"no",
    paused:torrent_status.paused?"yes":"no",
    trackers:torrent_trackers.length,
    time:(new Date()).toLocaleTimeString()
  });
  return setTimeout(main, 500);
};
main();