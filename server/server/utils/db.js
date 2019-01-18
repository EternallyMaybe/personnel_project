const databaseConfig = require('../../config').database;
const mysql = require('mysql');

const pool = mysql.createPool({
    host: databaseConfig.HOST,
    user: databaseConfig.USERNAME,
    password: databaseConfig.PASSWORD,
    database: databaseConfig.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log('sql:' + sql.replace(/[\r\n]/g, ""));
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                })
            }
        })
    });
}


let createTable = function(sql) {
    return query(sql, []);
}

let findDataById = function(table, id) {
    let sql = "SELECT * FROM ?? WHERE id = ?";
    return query(sql, [table, id]);
}

let findDataByPage = function(table, keys, params, start, pageSize) {
    let partSql = '';
    let values = [keys, table, start, pageSize];
    Object.keys(params).forEach((key, index) => {
        if (index === 0) {
            partSql += `WHERE ${key} like ?`;
        } else {
            partSql += ` AND ${key} like ?`;
        }
        values.splice(index + 2, 0, `%${params[key]}%`);
    })

    let sql = `SELECT ?? FROM ?? ${partSql} LIMIT ?, ?`;
    return query(sql, values);
}

let insertData = function(table, values) {
    let sql = "INSERT INTO ?? SET ?";
    return query(sql, [table, values]);
}

let updateData = function(table, values, id) {
    let sql = "UPDATE ?? SET ? WHERE id = ?";
    return query(sql, [table, values, id]);
}

let deleteDataById = function(table, id) {
    let sql = "DELETE FROM ?? WHERE id = ?";
    return query(sql, [table, id]);
}

let select = function(table, keys) {
    let sql = "SELECT ?? FROM ??";
    return query(sql, [keys, table]);
}

let count = function(table, params) {
    let partSql = '';
    let values = [table];
    Object.keys(params).forEach((key, index) => {
        if (index === 0) {
            partSql += `WHERE ${key} like ?`;
        } else {
            partSql += ` AND ${key} like ?`;
        }
        values.splice(index + 2, 0, `%${params[key]}%`);
    })

    let sql = `SELECT COUNT(*) AS count FROM ?? ${partSql}`;
    return query(sql, values);
}

module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    insertData,
    updateData,
    deleteDataById,
    select,
    count
}
// select('user_info', ['id', 'email', 'password'])
// .then((result) => {
//     console.log(result);
// })
// .catch((err) => {
//     console.log(err);
// })