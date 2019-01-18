const fs = require('fs');
const getSqlMap = require('./getSqlMap');

function getSqlContentMap() {
    let sqlMap = getSqlMap();
    let sqlContentMap = {};

    for(let key in sqlMap) {
        sqlContentMap[key] = fs.readFileSync(sqlMap[key], 'binary');
    }

    return sqlContentMap;
}

module.exports = getSqlContentMap;