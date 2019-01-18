// user
const ERROR_USER_NAME = '用户名格式为6-16位的小写字母，包括-、_';
const ERROR_EMAIL = '请输入正确的邮箱地址';
const ERROR_PASSWORD = '密码长度应该为6-16';
const ERROR_PASSWORD_CONFORM = '两次密码不一致';

const FAIL_EMAIL_IS_EXIST = '邮箱已被注册';
const FAIL_USER_NAME_IS_EXIST = '用户名已被注册';
const FAIL_USER_NAME_OR_PASSWORD_ERROR = '用户名或登录密码错误';
const FAIL_USER_NO_LOGIN = '用户未登录';
const FAIL_USER_NO_EXIST = '用户不存在';

// code_table
const NODE_EXIST = '节点已存在';
const PARENT_ID_ERROR = '父节点不存在';

// articles
const ARTICLE_EXIST = '存在相同标题的文章，请修改后再新增';

// 增删改查
const ERROR_SYS = '系统错误';
const FAIL_ADD = '新增失败';
const FAIL_GET_DATA = '获取数据失败';
const FAIL_DELETE = '删除失败';
const FAIL_UPDATE = '更新失败';

module.exports = {
    ERROR_USER_NAME,
    ERROR_EMAIL,
    ERROR_PASSWORD,
    ERROR_PASSWORD_CONFORM,
    ERROR_SYS,
    FAIL_EMAIL_IS_EXIST,
    FAIL_USER_NAME_IS_EXIST,
    FAIL_USER_NAME_OR_PASSWORD_ERROR,
    FAIL_USER_NO_LOGIN,
    FAIL_USER_NO_EXIST,
    FAIL_GET_DATA,
    FAIL_DELETE,
    FAIL_UPDATE,
    FAIL_ADD,
    NODE_EXIST,
    PARENT_ID_ERROR,
    ARTICLE_EXIST
}