const shell = 'apidoc -i route/ -o static/apidoc/'
const process = require('child_process');
const {SERVER_PORT} = require('../config/config')
//生成文档
function gendoc(){
    
    process.exec(shell,function(err){
        if(err == null){
            console.log('create dochtml success to http://localhost:'+SERVER_PORT)
            return 'doc generate success'
        }else{
            console.log(err,'doc generate err')
            return 'doc generate err'
        }
    })
}
module.exports = gendoc();