const fs = require('fs');
const getSqlContentMap = require('./util/getSqlContentMap');
const {query} = require('./util/db');

const eventLog = function(err, sqlFile, index) {
    if (err) {
        console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`);
    } else {
        console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`);
    }
}

let sqlContentMap = getSqlContentMap();
const createAllTables = async () => {
    for (let key in sqlContentMap) {
        let sqlShell = sqlContentMap[key];
        let sqlShellList = sqlShell.split(';');

        for (let [i, shell] of sqlShellList.entries()) {
            if (shell.trim()) {
                let result = await query(shell);
                if (result.serviceStatus === 2) {
                    eventLog(true, key, i);
                } else {
                    eventLog(null, key, i);
                }
            }
        }
    }
    console.log('sql脚本执行结束！');
    console.log('请按ctrl + c键退出！');
}
createAllTables();