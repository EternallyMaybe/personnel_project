const articleModel = require('../models/articleModel');

/**
 * 创建新数据
 * @param {object} data
 * @returns {object} 
 */
async function create(data) {
    let result = await articleModel.create(data);
    return result;
}

/**
 * 查找是否存在某条数据
 * @param {object} formData
 * @returns {object|null} 查找结果
 */
async function getExistOne(formData) {
    let resultData = await articleModel.getExistOne(formData);
    return resultData;
}

/**
 * 根据分页获取数据
 * @param {number} page
 * @param {number} pageSize
 * @returns {object}
 */
async function getDataByPage(params, start, pageSize) {
    let resultData = await articleModel.getDataByPage(['id', 'title', 'content', 'publisher', 'publishTime', 'category', 'tags', 'greatNum', 'viewNum'], params, start, pageSize);
    return resultData;
}

/**
 * 获取数据总条数
 * @returns {number}
 */
async function getTotal(params) {
    let resultData = await articleModel.getTotal(params);
    return resultData;
 }

/**
 * 根据id查找
 * @returns {number}
 */
async function findDataById(id) {
   let resultData = await articleModel.findDataById(id);
   return resultData;
}

/**
 * 根据id删除数据
 * @param {number} id
 * @returns {object}
 */
async function deleteDataById(id) {
    let resultData = await articleModel.deleteDataById(id);
    return resultData;
}

/**
 * 根据id进行数据更新
 * @param {object} values
 * @param {number} id
 * @returns {object}
 */
async function updateData(values, id) {
    let resultData = await articleModel.updateData(values, id);
    return resultData;
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