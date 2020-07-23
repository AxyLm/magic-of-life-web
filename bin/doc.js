const shell = 'apidoc -i router/ -o static/apidoc/'
const process = require('child_process');

//生成文档
function gendoc(){
    process.exec(shell,function(err){
        if(err == null){
            console.log('create dochtml success to http://localhost:1617')
            return 'doc generate success'
        }else{
            console.log('doc generate err')
            return 'doc generate err'
        }
    })
}
module.exports = gendoc();