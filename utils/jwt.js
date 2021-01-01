const jwt = require('jsonwebtoken')
const scrict = '0p9UD'

function creatToken(data = {}, ) {
	// 产生token
	let palyload = {}
	palyload.data = data
	// palyload.ctime=Date.now()//创建时间
	// palyload.exp=exp||1000*60*24*7
	return jwt.sign(palyload, scrict, {
		expiresIn: 1000 * 60
	})
}

function checkToken(token) {
	return new Promise((resovle, reject) => {
		jwt.verify(token, scrict, (err, data) => {
			if(err) {
				console.log(err,data,token)
				reject(
					{
						code:9999,
						msg:'token验证失败'
					}
				)
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