## 基于`egg.js`实现的`react-antd-admim`的后台管理系统的服务端

## **注意** 使用`typescript`之后,使用`npm start`或者`yarn start`之前需要先使用`npm run tsc`或者`yarn tsc`编译一次`ts`文件用来生成`js`文件,因为在生产环境中不会引入`ts-loader` [issues 地址](https://github.com/eggjs/egg/issues/3926#issuecomment-528155822)

- 开发过程中使用`npm run clean`或者`yarn clean`可以清除之前的`js`文件

1. `npm run dev` 项目启动

## [校验 egg-validate](https://eggjs.org/zh-cn/basics/controller.html#%E5%8F%82%E6%95%B0%E6%A0%A1%E9%AA%8C)

1. 使用的插件是`egg-validata`,安装`npm i egg-validate`
2. 使用方法，首先在`plugin.js`中引入

```js
module.exports = {
  validate: {
    enable: true,
    package: "egg-validate",
  },
}
```

3. 使用的方法，在`controller`控制器中，使用`try catch`可以捕获异常信息，返回自定义的错误信息

```js
async validateFunc() {
    const {ctx} = this
    try {
        ctx.validate({
            id: {required: true, type: 'int'}
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

1. 使用 `@ts-ignore: Unreachable code error` 可以移除 `TS`的告警
2. `TS`中`interface`的高级使用

- 可以指定继承字段,使用`Pick`

```ts
interface IUser {
  userName: string
  password: string
  id: string
}
export interface IUserLoginParams extends Pick<IUser, "userName" | "password"> {}
```

`VSCode`使用`yarn`的过程中出现 `yarn.ps1，因为在此系统中禁止执行脚本。有关详细信息，请参阅 "get-help about_signing"。`错误解决方法
在终端输入`get-ExecutionPolicy`显示的是`Restricted`
再输入`set-ExecutionPolicy RemoteSigned`回车
最后再次输入`get-ExecutionPolicy`显示的是`RemoteSigned`即可
如果有问题可以通过管理员身份运行`VSCode`

`VSCode`使用`TSLlint`校验`TS`代码

- 下载`TSLint`插件
- 可以在项目的根目录下新建`tslint.json`的文件,用来自定义规则
- 在`VSCode`的设置`setting.json`中添加,可以在保存的时候自动格式化代码

```json
// 设置为true时，每次保存的时候自动格式化；值设置为 false 时，代码格式化请按shift+alt+F
"editor.formatOnSave": true,
// 每次保存的时候将代码按eslint和tslint格式进行修复
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
```

### 数据库知识

1. 设置创建时间,新增数据的时候自动设置为当前的时间,字段类型`datetime`并且默认值为`CURRENT_TIMESTAMP`
2. 设置更新时间,修改数据的时候自动更新为当前的时间,字段类型`timestamp`并且默认值为`CURRENT_TIMESTAMP`
3. 设置随机的 id,使用到的第三方模块 [`uuid`](https://www.npmjs.com/package/uuid),首先安装`npm i uuid`

```js
import { v1 as uuidv1 } from "uuid"
// a8bc3ca0773611ebb2a49d7360a3bd03
export const createUUID = () => {
  const getUUID = uuidv1().replace(/-/g, "")
  return getUUID
}
```
