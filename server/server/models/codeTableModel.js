const dbUtils = require('../utils/db');

async function create(model) {
    let result = await dbUtils.insertData('code_table', model);
    return result;
}

async function getExistOne(options) {
    let sql = `SELECT * FROM code_table 
        WHERE codeName="${options.codeName}" or codeLetter="${options.codeLetter}"
        limit 1`;
    let result = await dbUtils.query(sql);

    if (Array.isArray(result) && result.length > 0) {
        result = result[0];
    } else {
        result = null;
    }
    return result;
}

async function getDataByPage(keys, params, start, pageSize) {
    let partSql = '';
    let values = [keys, start, pageSize];
    Object.keys(params).forEach((key, index) => {
        if (index === 0) {
            partSql += `WHERE ${key} like ?`;
        } else {
            partSql += ` AND ${key} like ?`;
        }
        values.splice(index + 1, 0, `%${params[key]}%`);
    })

    let sql = `select ?? from code_table where category in (
                    select * from (
                        select category from code_table ${partSql} group by category limit ?,?
                    ) as t
                );`;
    let result = await dbUtils.query(sql, values);
    return result;
}

async function getTotal(params) {
    let partSql = 'WHERE parent=""';
    let values = [];
    Object.keys(params).forEach((key, index) => {
        partSql += `AND ${key} like ?`;
        values.push(`%${params[key]}%`);
    })

    let sql = `select count(*) as count from code_table ${partSql}`;
    let result = await dbUtils.query(sql, values);

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
    let result = await dbUtils.findDataById('code_table', id);
    
    if (Array.isArray(result) && result.length > 0) {
        result = result[0]
    } else {
        result = null
    }

   return result;
}

async function deleteDataById(id) {
    let sql = `delete from code_table where FIND_IN_SET(parent, getChildList("${id}")) || codeLetter="${id}"`;
    let result = dbUtils.query(sql);

    return result;
}

async function updateData(values, id) {
    let result = dbUtils.updateData('code_table', values, id);
    return result;
}

async function updateLeaf(parent) {
    let sql = `update code_table set isLeaf=1 
            where codeLetter='${parent}' 
            and not exists(
                select * from (select id from code_table where parent='${parent}') as t
            );`;
    let result = dbUtils.query(sql); 
    
    return result;
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