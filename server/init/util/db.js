const mysql = require('mysql');

const pool = mysql.createPool({
    host    : '127.0.0.1',
    user    : 'root',
    password: '111111',
    database: 'koa_demo'
});

let query = function(sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    console.log(rows);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                })
            }
        });
    });
}

module.exports = {
    query
}