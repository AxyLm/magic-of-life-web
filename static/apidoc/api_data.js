define({ "api": [
  {
    "type": "post",
    "url": "/file/upload",
    "title": "文件上传",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>file.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/File/file.js",
    "groupTitle": "File",
    "name": "PostFileUpload"
  },
  {
    "type": "post",
    "url": "/user/getMailCode",
    "title": "发送邮箱验证码",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "返回实列:",
          "content": "{\n    code:0,\n  msg:'验证码发送成功'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/login.js",
    "groupTitle": "User",
    "name": "PostUserGetmailcode"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "用户登录",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "返回实列:",
          "content": "{\n code:0,\n msg :'登录成功',\n data:{\n   token:'',\n   username:'',\n   role:''\n   route:[]\n }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/user/login"
      }
    ],
    "version": "0.0.0",
    "filename": "route/login.js",
    "groupTitle": "User",
    "name": "PostUserLogin"
  },
  {
    "type": "post",
    "url": "/user/reg",
    "title": "用户注册",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "返回实列:",
          "content": "{\n    code:0,\n    msg:'注册成功',\n    data:{\n      username:username,\n      password:password,\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/user/reg"
      }
    ],
    "version": "0.0.0",
    "filename": "route/login.js",
    "groupTitle": "User",
    "name": "PostUserReg"
  },
  {
    "type": "post",
    "url": "/monit/frpMonit",
    "title": "获取frp服务端状态",
    "group": "monit",
    "version": "0.0.0",
    "filename": "route/monit.js",
    "groupTitle": "monit",
    "name": "PostMonitFrpmonit"
  },
  {
    "type": "post",
    "url": "/monit/rpiMonit",
    "title": "获取树莓派运行状态",
    "group": "monit",
    "version": "0.0.0",
    "filename": "route/monit.js",
    "groupTitle": "monit",
    "name": "PostMonitRpimonit"
  },
  {
    "type": "post",
    "url": "/api/v1/qrcode",
    "title": "title",
    "group": "public",
    "version": "0.0.0",
    "filename": "route/publicApi.js",
    "groupTitle": "public",
    "name": "PostApiV1Qrcode"
  },
  {
    "type": "post",
    "url": "/user/getrole",
    "title": "获取所有角色",
    "group": "userInfo",
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUserGetrole"
  },
  {
    "type": "post",
    "url": "/users/addrole",
    "title": "添加角色",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roles",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUsersAddrole"
  },
  {
    "type": "post",
    "url": "/users/addroute",
    "title": "添加路由",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "visibleRoles",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUsersAddroute"
  },
  {
    "type": "post",
    "url": "/users/addroute",
    "title": "删除路由",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "routerId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUsersAddroute"
  },
  {
    "type": "post",
    "url": "/users/getAuthRouter",
    "title": "根据权限获取相应路由",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUsersGetauthrouter"
  },
  {
    "type": "post",
    "url": "/users/updataRouote",
    "title": "更新路由信息",
    "group": "userInfo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "route/users.js",
    "groupTitle": "userInfo",
    "name": "PostUsersUpdatarouote"
  }
] });
