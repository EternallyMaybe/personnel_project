const codeTableService = require('../services/codeTableService');
const constant = require('../utils/constant');

/**
 * 新增
 * @param  {obejct} ctx 上下文对象
 */
async function createData(ctx) {
	let formData = ctx.request.body;
	let result = {
		code: 200,
		message: '',
		data: null
	};

	let existOne  = await codeTableService.getExistOne({
        codeName: formData.codeName,
        codeLetter: formData.codeLetter
    });
	if (existOne) {
		result.code = 500;
		result.message = constant.NODE_EXIST;
		ctx.body = result;
		return;
	}

	let updateParentResult = await updateParent(formData.parentId, {
		isLeaf: false
	});
	if (updateParentResult.code !== 200) {
		ctx.body = updateParentResult;
		return;
	}

	let resultData = await codeTableService.create({
		codeName: formData.codeName,
		codeLetter: formData.codeLetter,
		category: formData.category,
		parent: formData.parent,
		isLeaf: formData.isLeaf,
		level: formData.level
	});

	if (resultData) {
		result.message = '新增成功';
	} else {
		result.code = 500;
		result.message = constant.FAIL_ADD;
	}

	ctx.body = result;
}

/**
 * 根据分页获取数据
 */
async function getDataByPage(ctx) {
	let page = parseInt(ctx.query.page) || 1;
	let pageSize = parseInt(ctx.query.pageSize) || 10;
	let params = ctx.query.category ? {category: ctx.query.category} : {};
	let result = {
		code: 200,
		message: '',
		data: null,
	};
    let resultData = await codeTableService.getDataByPage(params, (page - 1) * pageSize, pageSize);
	let totalObj = await codeTableService.getTotal(params);

	if (resultData) {
		result.data = {
			page: page,
			pageSize: pageSize,
			count: totalObj.count,
			list: resultData
		};
	} else {
		result.code = 500;
		result.message = constant.FAIL_GET_DATA;
	}

	ctx.response.status = result.code;
    ctx.body = result;
}

/**
 * 根据id获取数据
 */
async function findDataById(ctx) {
	let id = ctx.params.id;
	let result = {
		code: 200,
		message: '',
		data: null,
	};
	let resultData = await codeTableService.findDataById(id);

	if (resultData) {
		result.data = resultData;
	} else {
		result.code = 500;
		result.message = constant.FAIL_GET_DATA;
	}
	
	ctx.response.status = result.code;
    ctx.body = result;
}

/**
 * 根据codeLetter删除数据
 */
async function deleteById(ctx) {
	let id = ctx.params.id;
	let resultData = await codeTableService.deleteDataById(id);

	if (resultData) {
		ctx.response.status = 204;
	} else {
		let result = {
			code: 500,
			message: constant.FAIL_DELETE
		}
		ctx.body = result;
	}
}

/**
 * 根据id进行数据更新
 */
async function updateData(ctx) {
	let id = ctx.params.id;
	let formData = ctx.request.body;
	let result = {
		code: 200,
		message: '',
		data: null,
	};
	let resultData = await codeTableService.updateData(formData, id);

	if (resultData) {
		result.message = '更新成功';
	} else {
		result.code = 500;
		result.message = constant.FAIL_UPDATE;
	}
	
	ctx.response.status = result.code;
    ctx.body = result;
}

/**
 * 根据id更新父节点
 */
async function updateParent(id, params) {
	let result = {
		code: 200,
		message: ''
	};
	let resultData = null;
	if (id) {
		resultData = await codeTableService.updateData(params, id);
	}
	if (resultData && resultData.affectedRows === 0) {
		result.code = 500;
		result.message = constant.PARENT_ID_ERROR;
	}
	return result;
}

module.exports = {
	createData,
	getDataByPage,
    findDataById,
    deleteById,
    updateData
}