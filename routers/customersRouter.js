const router = require('express').Router();
const{register ,findCustomer,updated} = require('../controllers/customersController');
router.route('/register').post(register);
router.route('/findCustomer').get(findCustomer);
router.route('/updated/:id').put(updated);
module.exports=router;
