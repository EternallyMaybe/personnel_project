const validator = require('validator');
const userModel = require('../models/userModel');
const constant = require('../utils/constant');

/**
 * 创建用户
 * @param {object} user 用户信息
 * @returns {object} 
 */
async function create(user) {
    let result = await userModel.create(user);
    return result;
}

/**
 * 查找存在用户信息
 * @param {object} formData
 * @returns {object|null} 查找结果
 */
async function getExistOne(formData) {
    let resultData = await userModel.getExistOne({
        'email': formData.email,
        'name': formData.userName
    });
    return resultData;
}

/**
 * 登录业务操作
 * @param  {object} formData 登录表单信息
 * @return {object}          登录业务操作结果
 */
async function login(formData) {
    let resultData = await userModel.getOneByUserNameAndPassword({
        'password': formData.password,
        'name': formData.userName
    });
    return resultData;
}

/**
 * 根据用户名查找用户业务操作
 * @param  {string} userName 用户名
 * @return {object|null}     查找结果
 */
async function getUserInfoByUserName(userName) {

    let resultData = await userModel.getUserInfoByUserName(userName) || {};
    let userInfo = {
        // id: resultData.id,
        email: resultData.email,
        userName: resultData.name,
        detailInfo: resultData.detail_info,
        createTime: resultData.create_time
    };
    return userInfo;
}

/**
 * 根据分页获取数据
 * @param {number} page
 * @param {number} pageSize
 * @returns {object}
 */
async function getDataByPage(params, start, pageSize) {
    let resultData = await userModel.getDataByPage(['id', 'name', 'email', 'password', 'phone', 'create_time', 'level'], params, start, pageSize);
    return resultData;
}

/**
 * 获取数据总条数
 * @returns {number}
 */
async function getTotal(params) {
    let resultData = await userModel.getTotal(params);
    return resultData;
 }

/**
 * 根据id查找
 * @returns {number}
 */
async function findDataById(id) {
   let resultData = await userModel.findDataById(id);
   return resultData;
}

/**
 * 根据id删除数据
 * @param {number} id
 * @returns {object}
 */
async function deleteDataById(id) {
    let resultData = await userModel.deleteDataById(id);
    return resultData;
}

/**
 * 根据id进行数据更新
 * @param {object} values
 * @param {number} id
 * @returns {object}
 */
async function updateData(values, id) {
    let resultData = await userModel.updateData(values, id);
    return resultData;
}

/**
 * 检验用户注册数据
 * @param  {object} userInfo 用户注册数据
 * @return {object}          校验结果
 */
function validatorData(userInfo) {
    let result = {
        code: 500,
        message: '',
    }

    if (/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
        result.message = constant.ERROR_USER_NAME;
        return result;
    }
    if (!validator.isEmail(userInfo.email)) {
        result.message = constant.ERROR_EMAIL;
        return result;
    }
    if (!/[\w+]{6,16}/.test(userInfo.password)) {
        result.message = constant.ERROR_PASSWORD;
        return result;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
        result.message = constant.ERROR_PASSWORD_CONFORM;
        return result;
    }

    result.code = 200;
    result.message = '认证通过';

    return result;
}


module.exports = {
    create,
    getExistOne,
    login,
    getUserInfoByUserName,
    validatorData,
    getDataByPage,
    getTotal,
    findDataById,
    deleteDataById,
    updateData
}