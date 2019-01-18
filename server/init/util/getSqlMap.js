const fs = require('fs');
const path = require('path');
const walkFile = require('./walk-file');

function getSqlMap() {
    let basePath = __dirname;
    basePath = path.resolve(basePath.replace(/\\/g, '/'), '../sql/') + '/';
    
    let fileList = walkFile(basePath, 'sql');
    return fileList; 
}

module.exports = getSqlMap;