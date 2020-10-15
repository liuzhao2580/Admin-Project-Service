## 基于`egg.js`实现的`react-antd-admim`的后台管理系统的服务端

1. `npm run dev` 项目启动

## [校验 egg-validate](https://eggjs.org/zh-cn/basics/controller.html#%E5%8F%82%E6%95%B0%E6%A0%A1%E9%AA%8C)
1. 使用的插件是`egg-validata`,安装`npm i egg-validate`
2. 使用方法，首先在`plugin.js`中引入
```js
module.exports = {
    validate:{
        enable: true,
        package: 'egg-validate'
    }
}
```
3. 使用的方法，在`controller`控制器中，使用`try catch`可以捕获异常信息，返回自定义的错误信息
```js
async validateFunc() {
    const {ctx} = this
    try {
        ctx.validate({
            id: {required: true}
        })
    }
    catch(err) {
        ctx.body = {
            code: 100,
            error: err.errors
        }
    }
}
```


## 约定
#### token
1. `code === 50001` 说明 `token` 失效或者错误，需要重新登录

## 注意 
#### [关于安全的措施](https://eggjs.org/zh-cn/core/security.html)
1. 在使用`eggJS`发送请求的时候，除了`GET`请求之外，其他的请求在发送之前都需要携带`x-csrf-token`,获取的方式是在发送请求之前在`cookies`中获取
2. 设置当登录的时候不需要携带`x-csrf-token` ，在`config/config.default.js`文件中
```js
security: {
    csrf: {
        headerName: 'x-csrf-token',
        bodyName: 'x-csrf-token',
        // 忽略登录请求开启CSRF
        ignore: ctx=> {
            if(ctx.request.url == '/login') return true
            else return false
        }
    }
}
```