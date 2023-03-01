const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, reValidateToker } = require('../controllers/authController');
const validJWT = require('../middlewares/validJWT');

const router = Router();

router.post('/new', [
    check('name', 'error, need name').not().isEmpty(),
    check('email', 'error, need email').isEmail(),
    check('password', 'error, need password min 6 characters').isLength({ min: 6 }),
], createUser);
router.post('/', [
    check('email', 'error, need email').isEmail(),
    check('password', 'error, need password min 6 characters').isLength({ min: 6 }),
], login);
router.get('/reLogin', validJWT, reValidateToker);


module.exports = router;