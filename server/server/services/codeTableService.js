const codeTableModel = require('../models/codeTableModel');

/**
 * 创建新数据
 * @param {object} data
 * @returns {object} 
 */
async function create(data) {
    let result = await codeTableModel.create(data);
    return result;
}

/**
 * 查找是否存在某条数据
 * @param {object} formData
 * @returns {object|null} 查找结果
 */
async function getExistOne(formData) {
    let resultData = await codeTableModel.getExistOne(formData);
    return resultData;
}

/**
 * 根据分页获取数据
 * @param {number} page
 * @param {number} pageSize
 * @returns {object}
 */
async function getDataByPage(params, start, pageSize) {
    let resultData = await codeTableModel.getDataByPage(['id', 'codeName', 'codeLetter', 'category', 'parent', 'isLeaf', 'level'], params, start, pageSize);
    return resultData;
}

/**
 * 获取数据总条数
 * @returns {number}
 */
async function getTotal(params) {
    let resultData = await codeTableModel.getTotal(params);
    return resultData;
 }

/**
 * 根据id查找
 * @returns {number}
 */
async function findDataById(id) {
   let resultData = await codeTableModel.findDataById(id);
   return resultData;
}

/**
 * 根据id删除数据
 * @param {number} id
 * @returns {object}
 */
async function deleteDataById(id) {
    let resultData = await codeTableModel.deleteDataById(id);
    return resultData;
}

/**
 * 根据id进行数据更新
 * @param {object} values
 * @param {number} id
 * @returns {object}
 */
async function updateData(values, id) {
    let resultData = await codeTableModel.updateData(values, id);
    return resultData;
}

/**
 * 根据id进行数据更新isLeaf字段
 * @param {number} id
 * @returns {object}
 */
async function updateLeaf(parent) {
    let resultData = await codeTableModel.updateLeaf(parent);
    return resultData;
}


module.exports = {
    create,
    getExistOne,
    getDataByPage,
    getTotal,
    findDataById,
    deleteDataById,
    updateData,
    updateLeaf
}