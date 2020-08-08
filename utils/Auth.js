const {routers,authRoules,roles,users} =require('../db/model/users')


function roleGetRouter(role){
    return new Promise((res,rej)=>{
        try {
            if(!role){
                rej('缺少参数')
            }
            routers.find({})
            .then((data)=>{
                let routerList = data
                // authRoules.find({})
                roles.findOne({roles:role})
                .then((data)=>{
                    console.log(data)
                    let {name,roles} = data
                    authRoules.find({visibleRoles:{$regex:data.code}})
                    .then((auth)=>{
                        // let list = getAuthRoute(auth,data.code) // 过滤角色权限
                        let tree = getTree(auth,routerList) // 合并树状路由
                        res({tree,role:{name,roles}})
                    })
                    .catch((err)=>{
                        rej('查找角色权限失败')
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    rej('查找用户角色失败')
                })
            })
        } catch (error) {
            console.log(error)
            rej('运行异常')
        }
    })
}
// 合成路由树tree
function getTree(data = [],routerList, sid, parent = null) {
    const children = [];
    for (const i in data) {
        const node = data[i];
        if ( ( (!parent && !node.parent) || node.parent === parent) && node.routerId !== sid ) {
            let {title,route,path,icon,component} = getRouter(routerList,node.routerId,'_id')
            let id = node.routerId
            let parent = node.parent
            children.push({
                title,route,path,icon,component,slots:({parent,id}),scopedSlots:({title:'change'}),
                children: getTree(data,routerList, sid, node.routerId)
            });
        }
    }
    return children.length ? children : null;
}
// 查出相应路由
function getRouter(arr,id,key){
    for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        if(item[key] == id){
            return item
        }
    }
}
// 根据角色过滤authRoute表
function getAuthRoute(authRoute,rule){
    let arr = []
    for (let i = 0; i < authRoute.length; i++) {
        const item = authRoute[i]
        if( item.visibleRoles.indexOf(rule) !== -1 ){
            arr.push(item)
        }
    }
    return arr
}

function getAuth(){

}
module.exports = {
    roleGetRouter,
}