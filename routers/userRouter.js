const router = require('express').Router();
const{signUp ,login} = require('../controllers/userController');
router.route('/signup').post(signUp);
router.route('/login').post(login);

module.exports=router;
