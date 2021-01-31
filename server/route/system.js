const express = require("express");
const Router = express.Router();

const { getDataCode, addDataCode, delDataCode, getDataCodeByPage } = require("../controller/system");
/**
* @api {post} /getDataCode  数据字典查询
* @apiGroup 数据字典
*
* @apiParam {String} code  代码
* @apiParam {String} data  名称
* @apiParam {String} vested  归属
* @apiParam {String} remark  备注
*/

Router.post("/getDataCode", getDataCode);

/**
* @api {post} /getDataCodeByPage  数据字典查询
* @apiGroup 数据字典
*
* @apiParam {String} code  代码
* @apiParam {String} data  名称
* @apiParam {String} vested  归属
* @apiParam {String} remark  备注
* @apiParam {String} pageSize  每页条数
* @apiParam {String} pageIndex  页码
*/

Router.post("/getDataCodeByPage", getDataCodeByPage);

/**
* @api {post} /addDataCode  数据字典新增
* @apiGroup 数据字典
*
* @apiParam {String} code  代码
* @apiParam {String} data  名称
* @apiParam {String} vested  归属
* @apiParam {String} remark  备注
*/
Router.post("/addDataCode", addDataCode);

/**
* @api {post} /delDataCode  数据字典新增
* @apiGroup 数据字典
*
* @apiParam {String} code  代码
* @apiParam {String} data  名称
* @apiParam {String} vested  归属
* @apiParam {String} remark  备注
*/
Router.post("/delDataCode", delDataCode);
module.exports = Router;
