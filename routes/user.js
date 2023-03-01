const { Router } = require('express');
const { listUser } = require('../controllers/userController');

const router = Router();

router.get('/list', listUser);
/* router.put('/update', listUser);
router.delete('/delete', listUser); */


module.exports = router;