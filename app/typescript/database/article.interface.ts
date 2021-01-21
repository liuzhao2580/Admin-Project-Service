/** 存储在数据库中的 文章的基本格式 */
export interface IArticleBasic {
    /** 文章 id */
    id?: string
    /** 文章 名称 */
    article_title: string
    /** 内容 */
    article_content: string
    /** 创建时间 */
    article_time: Date
    /** 更新时间 */
    article_update_time: Date
    /** 创建者 id */
    creator_id: string
    /** 创建者 用户名 */
    /** 创建者 头像 */
    /** 文章分类 id */
    article_categoryId: number
    /** 分类名称 */
    category_name: string
    /** 父级分类的id */
    category_parentId: number
    /** 父级分类的名称 */
    category_parentName: string
}