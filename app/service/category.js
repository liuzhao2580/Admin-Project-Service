const Service = require('egg').Service

class CategoryService extends Service {
    async select_category() {
        const {app} = this
        const result = await app.mysql.select('article_category')
        return result
    }
}

module.exports = CategoryService