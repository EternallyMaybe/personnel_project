const userService = require('../services/userService');
const constant = require('../utils/constant');

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
async function login(ctx) {
    let formData = ctx.request.body;
    let result = {
        message: '',
        data: null,
        code: 200
	};
    let userResult = await userService.login(formData);

	if (userResult) {
        if (formData.userName === userResult.name) {    
			let session = ctx.session;
			session.isLogin = true;
			session.userName = userResult.name;
			session.userId = userResult.id;

            result.message = '登录成功';
        } else {
            result.code = 500;
            result.message = constant.FAIL_USER_NAME_OR_PASSWORD_ERROR;
        }
    } else {
        result.code = 500;
        result.message = constant.FAIL_USER_NO_EXIST;
	}

	// ctx.response.status = result.code;
	ctx.body = result;
}

/**
 * 注册操作
 * @param   {obejct} ctx 上下文对象
 */
async function signUp(ctx) {
	let formData = ctx.request.body;
	let result = {
		code: 200,
		message: '',
		data: null
	};

	let validateResult = userService.validatorData(formData)
	if (validateResult.code !== 200) {
		result = validateResult;
		ctx.body = result;
		return;
	}

	let existOne  = await userService.getExistOne(formData);
	if (existOne && existOne.name === formData.userName) {
		result.code = 500;
		result.message = constant.FAIL_USER_NAME_IS_EXIST;
		ctx.body = result;
		return;
	}

	let userResult = await userService.create({
		email: formData.email,
		password: formData.password,
		name: formData.userName,
		phone: formData.phone,
		create_time: new Date().getTime(),
		level: 1,
	});

	if (userResult && userResult.insertId * 1 > 0) {
		result.message = '注册成功';
	} else {
		result.code = 500;
		result.message = constant.ERROR_SYS;
	}

	ctx.response.status = result.code;
	ctx.body = result;
}

/**
 * 退出登录
 * @param {object} ctx
 */
async function signOut(ctx) {
	let result = {
		code: 200,
		message: '登出成功'
	}

	delete ctx.session;
	ctx.body = result;
}

/**
 * 获取用户信息
 * @param {obejct} ctx 上下文对象
 */
async function getLoginUserInfo(ctx) {
	let userName = ctx.session.userName;
	let result = {
		code: 200,
		message: '',
		data: null,
	};
	let userInfo = await userService.getUserInfoByUserName(userName)
	
	if (userInfo) {
		result.data = userInfo;
	} else {
		result.code = 500;
		result.message = constant.FAIL_USER_NO_LOGIN;
	}

	ctx.response.status = result.code;
    ctx.body = result;
}

module.exports = {
	login,
	signUp,
	getLoginUserInfo,
	signOut
}