const { Router } = require('express');
const { listUser, updateUser, deleteUser } = require('../controllers/userController');

const router = Router();

router.get('/list', listUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);


module.exports = router;