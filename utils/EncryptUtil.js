
const crypto = require("crypto");
const CryptoJS = require("crypto-js/crypto-js");

/**
 * 加密工具类
 * @type {string}
 */
const SECRET = 'soulfree'
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
module.exports={
  md5Get:function(aesValue){
    console.log(aesValue)
    let encrypted = CryptoJS.AES.encrypt(aesValue.toString(), SECRET);
    return encrypted
  },
  md5Set:function(encrypted){
    return CryptoJS.MD5(encrypted).toString();
  },
  aesDecrypt: function(val) {
    let srcs = CryptoJS.enc.Utf8.parse(val);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  Decrypt:function(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}

