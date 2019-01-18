const mysql = require('mysql');

const pool = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: '111111',
    database: 'koa'
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