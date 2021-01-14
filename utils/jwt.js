const jwt = require('jsonwebtoken')
const scrict = process.env.TOKEN_KEY
const EncryptUtil = require('./EncryptUtil')
function creatToken(data = {}, ) {
	// 产生token
	let palyload = {}
	palyload.data = data
	// palyload.ctime=Date.now()//创建时间
	// palyload.exp=exp||1000*60*24*7
	let token = jwt.sign(palyload, scrict, {
		expiresIn: 1000 * 60
	})
	return token;
}

function checkToken(token) {
	return new Promise((resovle, reject) => {
		if (!token) {
			reject({
				code:9998,
				msg:'token验证失败'
			})
		}
		jwt.verify(token, scrict, (err, data) => {
			if(err) {
				reject({
					code:9999,
					msg:'token验证失败'
				})
			} else {
				resovle(data)
			}
		})
	})

}
module.exports = {
	creatToken,
	checkToken
}