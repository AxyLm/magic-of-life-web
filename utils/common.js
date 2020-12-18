function getData(data){
    let key = Object.keys(data)
    let val = Object.values(data)
    let str = '?'
    for(let i=0;i<key.length;i++){
        if(i===0){
        str += key[i] + '=' + val[i]
        }else{
        str += '&' + key[i] + '=' + val[i]
        }
    }
    return str
}
function bytesToSize(bytes) { //字节转换
    if(bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + '' + sizes[i];
    // return parseFloat(bytes / Math.pow(k, i)).toFixed(2)  + sizes[i];
}
module.exports = {
    getData,
    bytesToSize
}