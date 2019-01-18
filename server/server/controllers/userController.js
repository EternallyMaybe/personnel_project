const userService = require('../services/userService');
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

	let existOne  = await userService.getExistOne(formData);
	if (existOne && existOne.name === formData.userName) {
		result.code = 500;
		result.message = constant.FAIL_USER_NAME_IS_EXIST;
		ctx.body = result;
		return;
	}

	let resultData = await userService.create({
		email: formData.email,
		password: formData.password,
		name: formData.userName,
		phone: formData.phone,
		create_time: new Date().getTime(),
		level: 1,
	});

	if (resultData && resultData.insertId * 1 > 0) {
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
	let params = ctx.query.userName ? {name: ctx.query.userName} : {};
	let result = {
		code: 200,
		message: '',
		data: null,
	};
    let resultData = await userService.getDataByPage(params, (page - 1) * pageSize, pageSize);
	let totalObj = await userService.getTotal(params);

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
	let resultData = await userService.findDataById(id);

	if (resultData) {
		result.data = resultData;
	} else {
		result.code = 500;
		result.message = constant.FAIL_GET_DATA;
	}
	
    ctx.body = result;
}

/**
 * 根据id删除数据
 */
async function deleteById(ctx) {
	let id = ctx.params.id;
	let resultData = await userService.deleteDataById(id);

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
	let resultData = await userService.updateData({
		email: formData.email,
		password: formData.password,
		name: formData.userName,
		phone: formData.phone,
		modified_time: new Date().getTime(),
	}, id);

	if (resultData) {
		result.message = '更新成功';
	} else {
		result.code = 500;
		result.message = constant.FAIL_UPDATE;
	}
	
    ctx.body = result;
}

module.exports = {
	createData,
	getDataByPage,
    findDataById,
    deleteById,
    updateData
}