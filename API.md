# 接口文档

## 接口说明

1. 开发环境的请求地址`127.0.0.1:7001`

2. 需要在请求头中添加`x-csrf-token`的标识为: `XCSRF:true`（大部分的`POST`请求都需要添加），从`cookies`中可以获取到

    使用`axios`发送请求为例

    ```javascript
    import axios from 'axios'
    const axiosConfig = axios.create({
        timeout: 1000,
        headers: {'x-csrf-token': "从cookies获取，cookies名称是csrfToken"}
    })
    ```

3. 需要在请求头中添加`Bearer Token`的标识为：`token: true`

    使用`axios`发送请求为例

    ```javascript
    import axios from 'axios'
    const axiosConfig = axios.create({
        timeout: 1000,
        headers: {'Bearer Token': "登录的时候会传递token"}
    })
    ```

4. 只要是`/api`开头的请求都需要校验`token`是否合法，如果返回的 `code`为50001 说明当前的 `token`不合法

5. 返回成功的数据`code = 0`

## 1. 用户相关的请求

### 1.1 用户登录

+ 请求方式： POST

+ 请求地址： `/login`

| 请求参数 | 类型   | 是否必须 |
| -------- | ------ | -------- |
| userName | string | 是       |
| password | any    | 是       |
| code     | string | 是       |

- 返回数据

    ```javascript
    {
        code: 0
    	data: {
            avatar: "127.0.0.1:7001/public/upload/avatar/1.png"
            createTime: "2020-09-29T09:35:23.000Z"
            email: "132@163.com"
            gender:
            data: [1]
            type: "Buffer"
            __proto__: Object
            is_delete: 0
            nickName: "小火车况且况且"
            phone: "13288888888"
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwNDA0MDY0MCwiZXhwIjoxNjA0MDQ0MjQwfQ.zPQ-2-h6_7bjugQW9Dgm1PheTF56YbsDaA_ladvHRNc"
            userId: 1
            userName: "liuzhao"
            user_role: 1
    	}
    	msg: "请求成功"
    }
    ```

    

    