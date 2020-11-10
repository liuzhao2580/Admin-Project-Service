const { app } = require("egg-mock");

module.exports = app => {
    let { validator } = app
    validator.addRule('phone', (rule, value) => {
        const regPhone = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
        if(!regPhone.test(value)) {
            return '电话号码格式不正确'
        }
    })
}