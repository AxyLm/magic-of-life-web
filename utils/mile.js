"use strict";
const nodemailer = require("nodemailer");

// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",//发送方邮箱 qq 通过lib/well-know/service.json
    port: 587, //端口号
  secure: false, // true for 465, false for other ports
  requireTLS :true,
    auth: {
      user: '###', // 发送方的邮箱地址
      pass: '###' //  smtp 验证码
    },
  });


  function send(mail,code){
      // 邮件信息
      let  mailobj={
        from: '"验证码来了！"', // sender address
        to: mail, // list of receivers
        subject: "11admin", // Subject line
        text: `您的验证码是${code}，有效期五分钟`, // plain text body
        //html: "<b>Hello world?</b>" // html body
      }
      return new Promise((resolve,reject)=>{
        transporter.sendMail(mailobj,(err,data)=>{
          //  console.log(err)
          //  console.log(data)
            if(err){
              reject(err)
            }else{
              resolve()
            }
        });
      })
      
  }
  module.exports={send}




