var lt, main, s, th, ti;

lt = require("node-libtorrent/build/Release/libtorrent");

s = new lt.session();

s.start_dht();
s.listen_on([6881, 6889]);

ti = new lt.torrent_info("./FreeBSD-10.1-RELEASE-i386-dvd1.iso.torrent");

th = s.add_torrent({
  ti: ti,
  save_path: "./FreeBSD"
});

main = function() {
  var st;
  st = th.status();
  console.log("" + (st.progress * 100) + " complete (down: " + (st.download_rate / 1000) + " kb/s | up: " + (st.upload_rate / 1000) + " kB/s | peers: " + st.num_peers + ")");
  var alerts = s.pop_alerts();
  if( alerts.length ) console.log(alerts);
  return setTimeout(main, 500);
};

main();
