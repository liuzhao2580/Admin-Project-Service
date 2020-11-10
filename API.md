# 接口文档

## 接口说明

1. 开发环境的运行地址`127.0.0.1:7001`

2. 所有路由的前缀是`/v1`，完整的请求地址是`http://127.0.0.1/v1`

3. 需要在请求头中添加`x-csrf-token`的标识为: `XCSRF:true`（大部分的`POST`请求都需要添加），从`cookies`中可以获取到

    使用`axios`发送请求为例

    ```javascript
    import axios from 'axios'
    const axiosConfig = axios.create({
        timeout: 1000,
        headers: {'x-csrf-token': "从cookies获取，cookies名称是csrfToken"}
    })
    ```

4. 需要在请求头中添加`Bearer Token`的标识为：`token: true`

    使用`axios`发送请求为例

    ```javascript
    import axios from 'axios'
    const axiosConfig = axios.create({
        timeout: 1000,
        headers: {'Bearer Token': "登录的时候会传递token"}
    })
    ```

5. 只要是`/api`开头的请求都需要校验`token`是否合法，如果返回的 `code`为50001 说明当前的 `token`不合法

6. 返回成功的数据`code = 0`

7. 封装了返回的数据形式`utils/response_data.js`

    - 不用返回数据的成功响应：`{code: 0, msg: 默认是 请求成功}`
    - 不用返回数据的失败响应：`{code: 默认是100,code: 默认是 请求失败}`
    - 需要返回数据的成功响应：`{code: 0, data: 需要返回的数据,code: 默认是 请求成功}`
    - 需要返回数据的失败响应：`{code: 默认是100, data: 需要返回的数据,code: 默认是 请求失败}`

8. 发送请求之前需要发送一个`GET`请求，用来获取`eggjs`的`csrf-token`

    - 请求地址`/CSFRToken`，请求方式`GET`，返回的数据`{code: 0, msg: '请求成功'}`

    - 项目中重新设置了请求头的`csrf-token`的名称，并且忽略了`login`，在`config.defalut.js`文件中设置

    ```javascript
    module.exports = appInfo => {
        const config = (exports ={
            // 安全配置 CSRF
            security: {
                csrf: {
                    headerName: 'x-csrf-token',
                    bodyName: 'x-csrf-token',
                    // 忽略登录请求开启CSRF
                    ignore: ctx=> {
                        if(ctx.request.url == '/v1/login') return true
                        else return false
                    }
                }
            },
        })
        // add your user config here
        const userConfig = {
            // myAppName: 'egg',
        }
        return {
            ...config,
            ...userConfig
        }
    }
    ```

    

## 1. 用户相关的请求

### 1.1 用户登录

+ 请求方式： POST

+ 请求地址： `/login`

    | 请求参数   | 类型     | 是否必须 |
    | ---------- | -------- | :------- |
    | `userName` | `string` | 是       |
    | `password` | `any`    | 是       |

+ 返回数据

    ```javascript
    {
        "code": 0,
        "data": {
            "userId": 1,
            "userName": "liuzhao",
            "user_role": 1,
            "avatar": "127.0.0.1:7001/public/upload/avatar/1.png",
            "nickName": "小火车况且况且",
            "gender": 1,
            "phone": "13288888888",
            "email": "132@163.com",
            "createTime": "2020-09-29T09:35:23.000Z",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwNDk4Nzk5NywiZXhwIjoxNjA1MDc0Mzk3fQ.VMsZNrHCeyFN2UcDOMju_XmVJvL44uAtqhT3R2r-Uj0"
        },
        "msg": "请求成功"
    }
    ```

+ 返回参数说明

    | 返回参数     | 说明                           | 类型     |
    | ------------ | ------------------------------ | -------- |
    | `userId`     | 用户ID                         | `number` |
    | `userName`   | 用户名                         | `string` |
    | `user_role`  | 用户权限，用来设置侧边栏的访问 | `number` |
    | `avatar`     | 用户头像地址                   | `string` |
    | `nickName`   | 用户昵称                       | `string` |
    | `gender`     | 用户性别： 1 代表男 ，0 代表女 | `number` |
    | `phone`      | 用户电话号码                   | `string` |
    | `email`      | 用户邮箱                       | `string` |
    | `createTime` | 用户被创建时间                 | `string` |
    | `token`      | `登录时返回的token`            | `string` |

### 1.2 获取用户基本信息

+ 请求方式：`GET`

+ 请求地址：`/api/userInfo/:id` 用户id

+ 返回数据

    ```js
    {
        "code": 0,
        "data": {
            "userId": 1,
            "userName": "liuzhao",
            "user_role": 1,
            "avatar": "127.0.0.1:7001/public/upload/avatar/1.png",
            "nickName": "小火车况且况且",
            "gender": 1,
            "phone": "13288888888",
            "email": "132@163.com",
            "createTime": "2020-09-29T09:35:23.000Z"
        },
        "msg": "请求成功"
    }
    ```

+ 返回参数说明和登录的一样

### 1.3 更新用户信息

- 请求方式： `PATCH`

+ 请求地址：`/api/user/update`

+ 请求参数

    | 请求参数    | 类型     | 是否必须 |
    | ----------- | -------- | -------- |
    | `userId`    | `number` | 是       |
    | `user_role` | `number` | 是       |
    | `phone`     | `number` | 否       |
    | `nickName`  | `string` | 否       |
    | `gender`    | `number` | 否       |
    | `email`     | `email`  | 否       |

+ 返回数据

    ```js
    {
        "code": 0,
        "msg": "更新成功"
    }
    ```

### 1.4 检查用户名是否存在

+ 请求方式： `POST`

+ 请求地址：`/api/user/checkUserName`

+ 请求参数

    | 请求参数   | 类型     | 是否必须 |
    | ---------- | -------- | -------- |
    | `userName` | `string` | 是       |

+ 返回数据

    ```js
    {
        "code": 0,
        "msg": "该用户名已存在"
    }
    
    {
        "code": 0,
        "msg": "该用户名不存在"
    }
    ```

    

### 1.5 新增用户

- 请求方式：`POST`

- 请求地址：`/api/user/insert`

- 请求参数

    | 请求参数    | 类型     | 是否必须 |
    | ----------- | -------- | -------- |
    | `userName`  | `string` | 是       |
    | `password`  | `any`    | 是       |
    | `user_role` | `number` | 是       |
    | `phone`     | `number` | 否       |
    | `nickName`  | `string` | 否       |
    | `gender`    | `number` | 否       |
    | `email`     | `email`  | 否       |

- 返回数据

    ```js
    {
        "code": 0,
        "msg": "新增成功"
    }
    
    {
        "code": 101,
        "msg": "新增失败 该用户名已存在"
    }
    ```

    

### 1.6 用户上传头像

- 请求方式： `POST`

- 请求地址： `/api/user/upload`

- 请求头设置： `form-data`

- 请求参数

    | 请求参数 | 参数说明 | 类型     | 是否必须 |
    | -------- | -------- | -------- | -------- |
    | `userId` | 用户ID   | `number` | 是       |
    | `avatar` | 头像文件 | `file`   | 是       |

- 返回数据

    ```js
    {
        "code": 0,
        "msg": "头像上传成功"
    }
    ```

    