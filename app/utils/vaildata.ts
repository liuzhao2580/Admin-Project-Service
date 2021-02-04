import { MockApplication } from 'egg-mock'
export default (app:MockApplication) => {
    let { validator } = app
    // 手机号
    validator.addRule('phone', (_rule, value) => {
        const regPhone = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
        if(!regPhone.test(value)) {
            return '电话号码格式不正确'
        }
    })
    // 用户名
    validator.addRule('userName', (_rule, value) => {
        const regUserName = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
        if(!regUserName.test(value)) {
            return '用户名格式不正确，字母数组下划线 允许5-16字节'
        }
    })
}