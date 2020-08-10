/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {
        // 数据库的配置
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: '127.0.0.1',
                // 端口号
                port: '3309',
                // 用户名
                user: 'root',
                // 密码
                password: 'root',
                // 数据库名
                database: 'node_project',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
        // 安全配置 CSRF
        security: {
            csrf: {
                headerName: 'x-csrf-token',
                bodyName: 'x-csrf-token'
            }
        },
        // jwt 配置
        jwt: {
            secret: '9527'
        }
    })

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1597025430002_7949'

    // add your middleware config here
    config.middleware = []

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    }

    return {
        ...config,
        ...userConfig
    }
}
