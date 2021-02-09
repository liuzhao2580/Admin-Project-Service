# 接口文档

## 接口说明

1. 开发环境的运行地址`127.0.0.1:7001`

2. 所有路由的前缀是`/v1/api`，完整的请求地址是`http://127.0.0.1/v1/api`

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

5. 只要是`/api`开头的请求都需要校验`token`是否合法，如果返回的 `code`为50001 说明当前的 `token`不合法，`config.default.js`设置`jwt`的匹配规则，如果匹配到`/login`和`/CSRFToken`结尾的请求，不需要校验`token`

    ```js
    module.exports = (appInfo) => {
        /**
         * built-in config
         * @type {Egg.EggAppConfig}
         **/
        const config = (exports = {
            ...
            // jwt 配置
            jwt: {
                secret: '9527',
                // 只要是 /api 开头的接口都需要校验 token 是否有效
                match: (ctx) => {
                    // 登录和获取CSRF的接口不需要检验token
                    const loginReg = /(\/login$)|(\/CSRFToken$)/
                    const apiReg = /\/api/
                    if (loginReg.test(ctx.request.url)) return false
                    else if (apiReg.test(ctx.request.url)) return true
                }
            }
            ...
        })
    
        // use for cookie sign key, should change to your own and keep security
        config.keys = appInfo.name + '_1597025430002_7949'
    
        // 中间件添加
        config.middleware = ['jwt', 'errorHandle']
    
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

    

6. 返回成功的数据`code = 0`

7. 封装了返回的数据形式`utils/response_data.js`

    - 不用返回数据的成功响应：`{code: 0, msg: 默认是 请求成功}`
    - 不用返回数据的失败响应：`{code: 默认是100,msg: 默认是 请求失败}`
    - 需要返回数据的成功响应：`{code: 0, data: 需要返回的数据,msg: 默认是 请求成功}`
    - 需要返回数据的失败响应：`{code: 默认是100, data: 需要返回的数据,msg: 默认是 请求失败}`

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
                        const reg = /\/login$/
                        if(reg.test(ctx.request.url)) return true
                        else return false
                    }
                }
                // csrf: { enable: false } 关闭 CSRF 安全设置
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
            "id": 2,
            "userName": "admin",
            "roleId": 2,
            "roleName": "管理员",
            "avatar": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/94e4c280-349a-11eb-8ff1-d5dcf8779628.png",
            "password": "admin",
            "nickName": "小飞机呼哧呼哧",
            "gender": 1,
            "phone": "",
            "email": null,
            "createTime": "2021-01-14T01:49:21.000Z",
            "is_delete": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjExMzAwNTY2LCJleHAiOjE2MTEzODY5NjZ9.0JgYor1efPBn9lDFZmG-tEClKYXpkQvpF-uCLSqYcls"
        },
        "msg": "请求成功"
    }
    ```

+ 返回参数说明

    | 返回参数     | 说明                               | 类型     |
    | ------------ | ---------------------------------- | -------- |
    | `id`         | 用户ID                             | `number` |
    | `userName`   | 用户名                             | `string` |
    | `roleId`     | 用户权限，用来设置侧边栏的访问     | `number` |
    | roleName     | 用户权限中文，用来设置侧边栏的访问 | string   |
    | `avatar`     | 用户头像地址                       | `string` |
    | `nickName`   | 用户昵称                           | `string` |
    | `gender`     | 用户性别： 1 代表男 ，0 代表女     | `number` |
    | `phone`      | 用户电话号码                       | `string` |
    | `email`      | 用户邮箱                           | `string` |
    | `createTime` | 用户被创建时间                     | `string` |
    | `token`      | `登录时返回的token`                | `string` |

### 1.2 获取用户基本信息

+ 请求方式：`GET`

+ 请求地址：`/userInfo/:id` 用户id

+ 返回数据

    ```js
    {
        "code": 0,
        "data": {
            "id": 1,
            "userName": "liuzhao",
            "roleId": 1,
            "roleName": "超级管理员",
            "avatar": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-minions/ec902db0-3497-11eb-b997-9918a5dda011.jpg",
            "password": "123456",
            "nickName": "小火车况且况且",
            "gender": 1,
            "phone": "13288888888",
            "email": "132@163.com",
            "createTime": "2021-01-14T01:49:36.000Z",
            "is_delete": 0
        },
        "msg": "请求成功"
    }
    ```

+ 返回参数说明和登录的一样

### 1.3 更新用户信息

- 请求方式： `PATCH`

+ 请求地址：`/user/update`

+ 请求参数

    | 请求参数    | 参数说明   | 类型     | 是否必须 |
    | ----------- | ---------- | -------- | -------- |
    | `id`        | 用户id     | `number` | 是       |
    | `user_role` | 用户权限id | `number` | 是       |
    | `phone`     | 电话       | `number` | 否       |
    | `nickName`  | 昵称       | `string` | 否       |
    | `gender`    |            | `number` | 否       |
    | `email`     |            | `email`  | 否       |

+ 返回数据

    ```js
    {
        "code": 0,
        "msg": "更新成功"
    }
    ```

### 1.4 检查用户名是否存在

+ 请求方式： `POST`

+ 请求地址：`/user/checkUserName`

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

- 请求地址：`/user/insert`

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

- 请求地址： `/user/upload`

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

    

## 2.文章相关的请求

### 2.1 文章列表

+ 请求方式：`GET`

+ 请求地址：`/article/list`

+ 请求参数:无

+ 返回数据

    ```js
    {
        "code": 0,
        "data": [
            {
                "id": 2,
                "article_title": "小飞机呼哧呼哧",
                "article_content": "小飞机呼哧呼哧",
                "article_time": "2020-08-28T02:23:22.000Z",
                "article_update_time": "2020-08-28T07:00:24.000Z",
                "creator_id": "1",
                "article_category": 1,
                "is_delete": 0
            },
            {
                "id": 3,
                "article_title": "小飞机呼哧呼哧",
                "article_content": "小飞机呼哧呼哧",
                "article_time": "2020-10-15T06:55:07.000Z",
                "article_update_time": "2020-10-15T06:55:07.000Z",
                "creator_id": "1",
                "article_category": 1,
                "is_delete": 0
            },
            {
                "id": 4,
                "article_title": "小火车况且况且",
                "article_content": "测试文章修改",
                "article_time": "2020-10-15T06:55:10.000Z",
                "article_update_time": "2020-10-15T06:55:10.000Z",
                "creator_id": "1",
                "article_category": 1,
                "is_delete": 0
            }
        ],
        "msg": "请求成功"
    }
    ```

### 2.2 新增文章

+ 请求方式：`POST`

+ 请求地址：`/article/insert`

+ 请求参数

    | 请求参数             | 参数说明      | 类型     | 是否必填 |
    | -------------------- | ------------- | -------- | -------- |
    | `creator_id`         | 用户id        | `string` | 是       |
    | `article_title`      | 文章标题      | `string` | 是       |
    | `article_content`    | 文章内容      | `string` | 是       |
    | `article_categoryId` | 文章类别 `id` | `number` | 是       |
    | category_parentId    | 父级节点的id  | number   | 是       |

+ 返回数据

    ```js
    // 失败的回调
    {
        code: 0,
        msg: '新增成功'
    }
    // 成功的回调
    {
        code: 101,
        msg: '新增失败'
    }
    ```

### 2.3 文章分类

+ 请求方式：`POST`

+ 请求地址：`/article/category`

+ 请求参数

    | 请求参数 | 参数说明           | 类型     | 是否必填                             |
    | -------- | ------------------ | -------- | ------------------------------------ |
    | `id`     | 用户传递的节点`id` | `string` | 否                                   |
    | `level`  | 传递的级别         | `number` | 是 一级节点/根节点 传1，二级节点2... |

+ 返回数据

    ```js
    // 默认一级
    {
        "code": 0,
        "data": [
            {
                "id": 1,
                "category": "生活娱乐"
            },
            {
                "id": 2,
                "category": "体育财经"
            },
            {
                "id": 3,
                "category": "科技文艺"
            },
            {
                "id": 4,
                "category": "影视动漫"
            },
            {
                "id": 5,
                "category": "其他"
            }
        ],
        "msg": "请求成功"
    }
    // 传入 id 和level
    {
        "code": 0,
        "data": [
            {
                "id": 1,
                "category": "穿搭",
                "parent_id": 1
            },
            {
                "id": 2,
                "category": "时尚",
                "parent_id": 1
            },
            {
                "id": 3,
                "category": "养生",
                "parent_id": 1
            },
            {
                "id": 4,
                "category": "旅游",
                "parent_id": 1
            },
            {
                "id": 5,
                "category": "宠物",
                "parent_id": 1
            },
            {
                "id": 6,
                "category": "游戏",
                "parent_id": 1
            }
        ],
        "msg": "请求成功"
    }
    ```

    