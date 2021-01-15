const express = require("express");
const Router = express.Router();

const { login, getMailCode } = require("../controller/login");

var codes;
/**
 * @api {post} /login  用户登录
 * @apiGroup 登录
 * @apiParam {String} account  用户名.
 * @apiParam {String} password 密码.
 * @apiSuccessExample {json} 返回实列:
 *     {
 *      code:0,
 *      msg :'登录成功',
 *      data:{
 *        token:'',
 *        username:'',
 *        role:''
 *        route:[]
 *      }
 *     }
 * @apiError {String} code 5000
 * @apiErrorExample {type} Error-Response:
{
    "code": 5000,
    "data": null,
    "msg": "参数缺失"
}
 * @apiSampleRequest /login
 */

Router.post("/login", login);

/**
* @api {post} /getMailCode  发送邮箱验证码
* @apiGroup 登录
*
* @apiParam {String} mail  邮箱
* @apiSuccessExample {json} 返回实列:
*     {
       code:0,
*       msg:'验证码发送成功'
*     }
*/
// 发送邮件验证码
Router.post("/getMailCode", getMailCode);
module.exports = Router;
