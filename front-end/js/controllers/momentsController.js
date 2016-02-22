angular
  .module('emotions')
  .controller('MomentsController', MomentsController);

MomentsController.$inject = ["Moment", "User", "$state", "CurrentUser"];
function MomentsController(Moment, User, $state, CurrentUser){
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

  self.getMoments();
  self.getUsers();
}
