// Vue Plangular Directive

var clientID = '0d33361983f16d2527b01fbf6408b7d7';

Vue.directive('plangular', {
  bind: function() {
    console.log('V U E');
    this.el.style.color = '#f00';
    this.el.innerHTML = this.arg + ' : ' + this.key;
      console.log('derp');
      var url = this.key;
      $.ajax({
        type: 'GET',
        url: '//api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID + '&callback=?',
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
          console.log(json);
        },
        error: function(e) {
          console.log(e);
        }
      });


  }
});

var plangularApp = new Vue({
  el: '#plangular-app'
});


