const dbUtils = require('../utils/db');

async function create(model) {
    let result = await dbUtils.insertData('user_info', model);
    return result;
}

async function getExistOne(options) {
    let sql = `SELECT * FROM user_info 
        WHERE email="${options.email}" or name="${options.name}"
        limit 1`;
    let result = await dbUtils.query(sql);

    if (Array.isArray(result) && result.length > 0) {
        result = result[0];
    } else {
        result = null;
    }
    return result;
}

async function getOneByUserNameAndPassword(options) {
    let sql = `SELECT * FROM user_info
        WHERE password="${options.password}" and name="${options.name}"
        limit 1`;
    let result = await dbUtils.query(sql);
    if (Array.isArray(result) && result.length > 0) {
        result = result[0];
    } else {
        result = null;
    }
    return result;
}

async function getUserInfoByUserName(userName) {
    let sql = `SELECT * FROM user_info
        WHERE name="${userName}"
        limit 1`;
    let result = await dbUtils.query(sql)
    
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
}

async function getDataByPage(keys, params, start, pageSize) {
    let result = await dbUtils.findDataByPage('user_info', keys, params, start, pageSize);
    return result;
}

async function getTotal(params) {
    let result = await dbUtils.count('user_info', params);

    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = {
            count: 0
        }
    }

    return result;
 }

async function findDataById(id) {
    let result = await dbUtils.findDataById('user_info', id);
    
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = null
    }

   return result;
}

async function deleteDataById(id) {
    let result = dbUtils.deleteDataById('user_info', id);
    return result;
}

async function updateData(values, id) {
    let result = dbUtils.updateData('user_info', values, id);
    return result;
}

module.exports = {
    create,
    getExistOne,
    getOneByUserNameAndPassword,
    getUserInfoByUserName,
    getDataByPage,
    getTotal,
    findDataById,
    deleteDataById,
    updateData
}