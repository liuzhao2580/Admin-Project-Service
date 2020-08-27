const Service = require('egg').Service

class ArticleService extends Service {
    // 文章列表 获取所有数据
    async findAllList() {
        const {app} = this
        const result = app.mysql.select('article')
        return result
    }
}

module.exports = ArticleService