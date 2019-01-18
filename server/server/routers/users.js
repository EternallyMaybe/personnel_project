const router = require('koa-router')();
const userController = require('../controllers/userController');

router.get('/list', userController.getDataByPage);
router.get('/detail/:id', userController.findDataById);
router.delete('/delete/:id', userController.deleteById);
router.post('/create', userController.createData);
router.put('/update/:id', userController.updateData);

module.exports = router;