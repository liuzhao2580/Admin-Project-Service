const Service = require('egg').Service

class CategoryService extends Service {
    // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
    async select_category() {
        const {app} = this
        const result = await app.mysql.select('article_category')
        return result
    }
    // 获取所有文章类别，按照树形结构 多表 不同级别的类别存放在不同的表中
    async select_moreTableCategory() {
        const {app} = this
        const querySql = `SELECT
            first_type.id AS first_id,
            first_type.category AS first_category,
            sec_type.id AS sec_id,
            sec_type.category AS sec_category,
            third_type.id AS third_id,
            third_type.category AS third_category
        FROM
            article_first_category AS first_type
        LEFT JOIN article_sec_category AS sec_type ON sec_type.parent_id = first_type.id
        LEFT JOIN article_third_category AS third_type ON third_type.parent_id = sec_type.id
        ORDER BY first_type.id, sec_type.id,third_id`
        const result = await app.mysql.query(querySql)
        return result
    }
}

module.exports = CategoryService