// Vue Plangular Directive

var clientID = '0d33361983f16d2527b01fbf6408b7d7';

var data;

Vue.directive('plangular', {
  bind: function() {
    console.log('V U E');
    var elem = this.el,
        test,
        data;
    //var url = this.key;
    var url = 'http://soundcloud.com/mrsjxn/bbb';
    console.log(url);
    var api = '//api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID;

    // Define audio engine
    var audio = document.createElement('audio');
    // Define player
    var player = {
      track: false,
      playing: false,
      paused: false,
      tracks: null,
      i: null,
      play: function(tracks, i) {
        if (i == null) {
          tracks = new Array(tracks);
          i = 0;
        };
        player.tracks = tracks;
        player.track = tracks[i];
        player.i = i;
        if (player.paused != player.track) audio.src = player.track.stream_url + '?client_id=' + clientID;
        audio.play();
        player.playing = player.track;
        player.paused = false;
      },
      pause: function() {
        audio.pause();
        if (player.playing) {
          player.paused = player.playing;
          player.playing = false;
        };
      },
      // Functions for playlists (i.e. sets)
      playPlaylist: function(playlist) {
        if (player.tracks == playlist.tracks && player.paused) player.play(player.tracks, player.i);
        else player.play(playlist.tracks, 0);
      },
      next: function(playlist) {
        if (!playlist){
          if (player.i+1 < player.tracks.length) {
            player.i++;
            player.play(player.tracks, player.i);
          } else {
            player.pause();
          };
        } else if (playlist && playlist.tracks == player.tracks) {
          if (player.i + 1 < player.tracks.length) {
            player.i++;
            player.play(playlist.tracks, player.i);
          } else {
            player.pause();
          };
        };
      },
      previous: function(playlist) {
        if (playlist.tracks == player.tracks && player.i > 0) {
          player.i = player.i - 1;
          player.play(playlist.tracks, player.i);
        };
      }
    };

    // Get data from SoundCloud
    xhr(api, function(err, resp) {
      if (resp) {
        console.log(resp.response);
        this.vm = resp.response;
        this.data = resp.response;
        //elem.innerHTML = this.data;
      }
      if (err) console.log(err);
      // Add better error handling
    }, true);

    // Set scoped variables???
    this.player = player;
    this.audio = audio;
  },
  update: function(data) {
    // Not sure how this works yet
  }
});

var plangularApp = new Vue({
  el: '#plangular-app',
  data: {
    test: 'derpa derp'
  }
});


