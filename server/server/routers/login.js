const router = require('koa-router')();
const userController = require('../controllers/loginController');

router.get('/info', userController.getLoginUserInfo);
router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.post('/signOut', userController.signOut);

module.exports = router;