import { EggAppConfig, EggAppInfo, PowerPartial } from "egg"

export default (appInfo: EggAppInfo) => {
  const config = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: "127.0.0.1",
        // 端口号
        port: "3306",
        // 用户名
        user: "root",
        // 密码
        password: "root",
        // 数据库名
        database: "node_project",
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    // 安全配置 CSRF
    security: {
      csrf: {
        headerName: "x-csrf-token",
        bodyName: "x-csrf-token",
        // 忽略登录请求开启CSRF
        ignore: ctx => {
          const reg = /\/login$/
          if (reg.test(ctx.request.url)) return true
          else return false
        },
      },
    },
    // jwt 配置
    jwt: {
      secret: "9527",
      // 只要是 /api 开头的接口都需要校验 token 是否有效
      match: ctx => {
        // 登录和获取CSRF的接口不需要检验token
        const loginReg = /(\/login$)|(\/CSRFToken$)/
        const apiReg = /\/api/
        if (loginReg.test(ctx.request.url)) return false
        else if (apiReg.test(ctx.request.url)) return true
      },
    },
    // 文件上传 multipart 配置
    multipart: {
      fileSize: "5mb",
      mode: "file",
    },
  } as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1610973316527_8540"

  // 中间件添加
  config.middleware = ["jwt", "errorHandle"]

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  // the return config will combines to EggAppConfig
  return {
    ...(config as {}),
    ...bizConfig,
  }
}
