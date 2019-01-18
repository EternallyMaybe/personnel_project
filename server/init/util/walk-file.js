const fs = require('fs');

const walkFile = function(pathResolve, mime) {
    let files = fs.readdirSync(pathResolve);
    let fileList = {};

    for (let [i, item] of files.entries()) {
        if (item.indexOf(mime) !== -1) {
            fileList[item] = pathResolve + item;
        }
    }

    return fileList;
}


module.exports = walkFile;
