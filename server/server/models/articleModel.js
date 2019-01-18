const dbUtils = require('../utils/db');

async function create(model) {
    let result = await dbUtils.insertData('articles', model);
    return result;
}

async function getExistOne(options) {
    let sql = `SELECT * FROM articles WHERE title="${options.title}" limit 1`;
    let result = await dbUtils.query(sql);

    if (Array.isArray(result) && result.length > 0) {
        result = result[0];
    } else {
        result = null;
    }
    return result;
}

async function getDataByPage(keys, params, start, pageSize) {
    let result = await dbUtils.findDataByPage('articles', keys, params, start, pageSize);
    return result;
}

async function getTotal(params) {
    let result = await dbUtils.count('articles', params);

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
    let result = await dbUtils.findDataById('articles', id);
    
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = null
    }

   return result;
}

async function deleteDataById(id) {
    let result = dbUtils.deleteDataById('articles', id);
    return result;
}

async function updateData(values, id) {
    let result = dbUtils.updateData('articles', values, id);
    return result;
}

module.exports = {
    create,
    getExistOne,
    getDataByPage,
    getTotal,
    findDataById,
    deleteDataById,
    updateData
}