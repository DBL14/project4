angular
  .module('emotions')
  .controller('UsersController', UsersController);

// Here we inject the currentUser service to access the current user
UsersController.$inject = ['User', 'TokenService', '$state', 'CurrentUser'];
function UsersController(User, TokenService, $state, CurrentUser){

  var self = this;

  self.all           = [];
  self.user          = {};
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  // self.deleteUser    = deleteUser;
  // self.userUpdate    = userUpdate;


  // function deleteUser(user){
  //   User.delete({id: user._id});
  //   var index = self.users.indexOf(user);
  //   self.users.splice(index, 1);
  // }

//   function userUpdate(req, res){

//   console.log(req.body.email);
//   User.findByIdAndUpdate({ _id: req.params.id }, {'local.email': req.body.email}, {new: true}, function(err, user){
//     if (err) return res.status(500).send(err);
//     if (!user) return res.status(404).send(err);

//     res.status(200).send(user);
//   });  
// }

  function getUsers() {
    User.query(function(data){
      // console.log(data)
      self.all = data;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home');
    }
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user);
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    self.error = null;
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    self.error = null;
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }

  if (!!CurrentUser.getUser()) {
    self.user = CurrentUser.getUser();
    self.getUsers();
  }

  return self;
}
