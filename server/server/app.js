const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');

const config = require('../config');
const routers = require('./routers/index');

const app = new Koa();

const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
}

// 配置session中间件
app.use(session({
    key: 'USER_ID',
    store: new MysqlSession(sessionMysqlConfig),
    cookie: {
        httpOnly: false
    }
}));

// 配置日志中间件
app.use(logger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态文件中间件
app.use(static(
    path.join(__dirname, '../static')
));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 登录拦截
app.use(async (ctx, next) => {

    if (!ctx.cookies.get('USER_ID') && ctx.path !== '/api/user/login' && ctx.path !== '/api/user/signUp') {
        ctx.response.status = 401;
        ctx.body = {
            code: 401,
            message: '用户未登录'
        }
        return;
    } 
    await next();
})

// 配置路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port);

