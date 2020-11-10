const validate = require('./app/utils/vaildata')
class AppBootHook {
    constructor(app) {
        this.app = app
    }
    async didReady() {
        validate(this.app)
    }
}
module.exports = AppBootHook