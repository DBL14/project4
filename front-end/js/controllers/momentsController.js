angular
  .module('emotions')
  .controller('MomentsController', MomentsController);

MomentsController.$inject = ["$scope" , "Moment", "User", "$state", "CurrentUser"];
function MomentsController($scope, Moment, User, $state, CurrentUser){
  var self = this;

  self.all      = [];
  self.users    = [];
  self.moment  = {};

  self.getMoments = function(){
    Moment.query(function(data){
      self.all = data;
    });
  };

  self.getUsers = function(){
    User.query(function(data){
       self.users = data;
    });
  };

  self.add = function(){
    var moment = { moment: self.moment };
    console.log(moment);
    Moment.save(moment, function(data){
      self.all.push(data);
      self.moment = {};
      $state.go('moments');
    });
  };

  function getLocation() {
  console.log('getting location');
    if (navigator.geolocation) {
        var location = navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300";
    console.log(img_url);

    self.mapsrc = img_url;
    $scope.$apply();
   // document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";
}

  self.getMoments();
  self.getUsers();
  getLocation();
}
