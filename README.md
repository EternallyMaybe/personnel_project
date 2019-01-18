## personnel_project
### 技术栈
+ public：react+react-router-dom+axios+mobx+antd+webapck4,同时集成editormd编辑器
+ server: node+koa2+mysql
### 创建数据库
```
$ mysql -u root -p
$ create database personnel_manager;
$ use personnel_manager;
```
所有表结构见personnel_manager.sql
### 运行项目
```
public
$ cd public
$ cnpm install
$ npm run dev
server
$ cd server
$ cnpm install
$ node server/app.js
```
### 项目结构
```
|   .gitignore
|   personnel_manager.sql 
|   README.md
|   
+---public
|   |   .babelrc 
|   |   index.html
|   |   package.json
|   |   
|   +---build
|   |       paths.js
|   |       server.js
|   |       webpack.base.conf.js
|   |       webpack.dev.conf.js
|   |       webpack.prod.conf.js
|   |       
|   +---src
|   |   |   index.js
|   |   |   
|   |   +---assets
|   |   |   +---css
|   |   |   |       style.scss
|   |   |   |       
|   |   |   +---fonts
|   |   |   |       1.ttf
|   |   |   |       
|   |   |   \---img
|   |   |           404.png
|   |   |           bg.jpg
|   |   |           header.jpg
|   |   |           
|   |   +---components
|   |   |   +---categoryTreeSelect
|   |   |   |       index.js
|   |   |   |       
|   |   |   \---tags
|   |   |           index.js
|   |   |           
|   |   +---routes
|   |   |       index.js
|   |   |       
|   |   +---services
|   |   |       index.js
|   |   |       
|   |   +---store
|   |   |       index.js
|   |   |       
|   |   +---utils
|   |   |       sourceOperation.js
|   |   |       utils.js
|   |   |       
|   |   \---views
|   |       +---articleManager 文章管理
|   |       |       articleDetail.js
|   |       |       index.js
|   |       |       
|   |       +---base
|   |       |       404.js 404页面
|   |       |       home.js 主页
|   |       |       login.js 登录页面
|   |       |       register.js 注册页面
|   |       |       
|   |       +---categoryManager 分类管理
|   |       |       categoryModal.js
|   |       |       index.js
|   |       |       
|   |       \---userManager 用户管理
|   |               index.js
|   |               userModal.js
|   |               
|   \---static
|       +---fonts
|       |       1.ttf
|       |       
|       \---plugins
|           \---editor.md  editormd插件
|                           
\---server
    |   config.js 数据连接配置
    |   package.json
    |   
    +---init
    |           
    +---server
    |   |   app.js 入口
    |   |   
    |   +---controllers 
    |   |       articleController.js
    |   |       codeTableController.js
    |   |       index.js
    |   |       loginController.js
    |   |       userController.js
    |   |       
    |   +---models
    |   |       articleModel.js
    |   |       codeTableModel.js
    |   |       userModel.js
    |   |       
    |   +---routers
    |   |       article.js 文章路由
    |   |       codeTable.js 分类路由
    |   |       home.js 主页路由
    |   |       index.js 根路由
    |   |       login.js 登录路由
    |   |       users.js 用户路由
    |   |       
    |   +---services
    |   |       articleService.js
    |   |       codeTableService.js
    |   |       userService.js
    |   |       
    |   +---utils
    |   |       constant.js
    |   |       db.js
    |   |       
    |   \---views
    |           
    \---static

```