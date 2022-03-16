const router = require('express').Router();
const{chooseSubject,findBooks} = require('../controllers/subjectController');
router.route('/chooseSubject').post(chooseSubject);
router.route('/findBooks').get(findBooks);
module.exports=router;