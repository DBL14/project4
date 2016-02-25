var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var momentsController = require('../controllers/momentsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
router.route('/users')
  .get(usersController.usersIndex)
//   .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/moments')
  .get(momentsController.momentsIndex)
  .post(momentsController.momentsCreate)

router.route('/moments/:id') 
  .get(momentsController.momentsShow)
  .put(momentsController.momentsUpdate)
  .delete(momentsController.momentsDelete)

module.exports = router;