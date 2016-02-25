angular
  .module('emotions')
  .controller('MomentsController', MomentsController);

MomentsController.$inject = ["$scope" , "Moment", "User", "$state", "CurrentUser"];
function MomentsController($scope, Moment, User, $state, CurrentUser){
  var self = this;

  self.all      = [];
  self.users    = [];
  self.moment  = {};
  self.currentUser = CurrentUser.getUser();

  var lat;
  var lng;
  
  self.getMoments = function(){
    Moment.query(function(data){
      // filter an array and make a new array from any of the elements in the original array. Show moments for the current user
      var newArray = data.filter(function(moment) {
        if (moment.user && moment.user._id == self.currentUser._id) {
          return true;
        }
      })
      self.all = newArray;
    });
  };

  self.getUsers = function(){
    User.query(function(data){
       self.users = data;
    });
  };
//define latitude and longitude
  self.add = function(){
    self.moment.user = self.currentUser._id;
    self.moment.latitude = lat;
    self.moment.longitude = lng;

    var moment = { moment: self.moment };
    // console.log(moment)
    Moment.save(moment, function(data){
      console.log(data);
      self.all.push(data);
      self.moment = {};
      $state.go('moments');
    });
  };

  self.delete = function(moment){
    console.log('deleting');
    moment.$delete();
    var index = self.all.indexOf(moment);
    self.all.splice(index, 1);
  }

  self.update = function(moment){
    moment.$update(function(){
      console.log('saved');
    }
    );
  }


  function getLocation() {
  // console.log('getting location');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // var location = navigator.geolocation.getCurrentPosition();
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
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    latlon = lat + "," + lng;
    // console.log(latlon)
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
