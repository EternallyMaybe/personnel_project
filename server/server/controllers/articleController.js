const articleService = require('../services/articleService');
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

	let existOne  = await articleService.getExistOne({
        title: formData.title
    });
	if (existOne) {
		result.code = 500;
		result.message = constant.ARTICLE_EXIST;
		ctx.body = result;
		return;
	}

	let resultData = await articleService.create({
		title: formData.title,
		content: formData.content,
		publisher: formData.publisher,
		publishTime: new Date(),
		category: formData.category,
		tags: formData.tags,
		greatNum: 0,
		viewNum: 0
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
	let params = {
        title: ctx.query.title || '',
        category: ctx.query.category || ''
    };
	let result = {
		code: 200,
		message: '',
		data: null,
	};
    let resultData = await articleService.getDataByPage(params, (page - 1) * pageSize, pageSize);
	let totalObj = await articleService.getTotal(params);

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
	let resultData = await articleService.findDataById(id);

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
	let resultData = await articleService.deleteDataById(id);

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
	let resultData = await articleService.updateData(formData, id);

	if (resultData) {
		result.message = '更新成功';
	} else {
		result.code = 500;
		result.message = constant.FAIL_UPDATE;
	}
	
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
		resultData = await articleService.updateData(params, id);
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