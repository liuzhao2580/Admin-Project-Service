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

## 1. 用户相关的请求

### 1.1 用户登录

请求方式： POST

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

