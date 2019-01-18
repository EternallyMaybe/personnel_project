const router = require('koa-router')();
const articleController = require('../controllers/articleController');

router.get('/list', articleController.getDataByPage);
router.get('/detail/:id', articleController.findDataById);
router.delete('/delete/:id', articleController.deleteById);
router.post('/create', articleController.createData);
router.put('/update/:id', articleController.updateData);

module.exports = router;