import { IArticleBasic } from "../../database/article.interface"

/** 用户新增/编辑文章需要传递的数据 */
export interface IArticleInsert {
  /** 文章id */
  id?: string
  /** 用户id */
  userId: IArticleBasic["userId"]
  /** 文章标题 */
  article_title: IArticleBasic["article_title"]
  /** 文章内容 */
  article_content: IArticleBasic["article_content"]
  /** 文章类别 id */
  article_categoryId: IArticleBasic["article_categoryId"]
  /** 类别的父级 id */
  category_parentId: IArticleBasic["category_parentId"]
}
