'use strict'

/** @type Egg.EggPlugin */
module.exports = {
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    jwt: {
        enable: true,
        package: 'egg-jwt',
        ignore: [ '/login1111/', '/loginout/' ], // 哪些请求不需要认证
    }
}
