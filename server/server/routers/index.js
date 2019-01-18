const router = require('koa-router')();
const home = require('./home');
const users = require('./users');
const login = require('./login');
const codeTable = require('./codeTable');
const article = require('./article');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api/user', login.routes(), login.allowedMethods());
router.use('/api/users', users.routes(), users.allowedMethods());
router.use('/api/categories', codeTable.routes(), codeTable.allowedMethods());
router.use('/api/articles', article.routes(), article.allowedMethods());

module.exports = router;