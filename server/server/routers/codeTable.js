const router = require('koa-router')();
const codeTableController = require('../controllers/codeTableController');

router.get('/list', codeTableController.getDataByPage);
router.get('/detail/:id', codeTableController.findDataById);
router.delete('/delete/:id', codeTableController.deleteById);
router.post('/create', codeTableController.createData);
router.put('/update/:id', codeTableController.updateData);

module.exports = router;