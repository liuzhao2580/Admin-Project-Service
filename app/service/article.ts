import {
  IArticleBasic,
  IArticleCategory,
} from "@/typescript/database/article.interface"
import { IUser } from "@/typescript/database/user.interface"
import { Service } from "egg"
import { createUUID } from "../utils/tool"

export default class ArticleService extends Service {
  // 文章列表 获取所有数据
  async findAllList() {
    const { app } = this
    const result = await app.mysql.select<IArticleBasic>("article", {
      where: { is_delete: 0 },
    })
    return result
  }
  // 查询该文章和该用户是否匹配，判断文章是否被该用户创建
  /**
   * @param {object} params 包含文章id和用户id
   */
  async article_confirm(params) {
    const { app } = this
    const options = {
      where: params,
    }
    const result = await app.mysql.select<IArticleBasic>("article", options)
    return result
  }
  // 查询文章
  async article_query(id) {
    const { app } = this
    const options = {
      where: { id, is_delete: 0 },
    }
    const result = await app.mysql.select<IArticleBasic>("article", options)
    return result
  }
  // 新增文章
  async article_insert(params) {
    const { app } = this
    const id = createUUID()
    const { category_parentId, article_categoryId, userId } = params
    // 一级分类的数据
    const getParentCategory = await app.mysql.select<IArticleCategory>(
      "article_first_category",
      {
        where: { id: category_parentId },
      },
    )
    // 二级分类的数据
    const getCategory = await app.mysql.select<IArticleCategory>(
      "article_sec_category",
      {
        where: { parent_id: category_parentId, id: article_categoryId },
      },
    )
    // 获取创建文章用户的数据
    const userResult = (await app.mysql.query<IUser>(
      `SELECT id as userId,userName,avatar,nickName from user WHERE id = ${userId}`,
    )) as IUser[]
    const insertParams: IArticleBasic = {
      id,
      ...params,
      article_categoryId,
      category_name: getCategory[0].category_name,
      category_parentId,
      category_parentName: getParentCategory[0].category_name,
      userId: userResult[0].id,
      userName: userResult[0].userName,
      userNick: userResult[0].nickName,
      userAvatar: userResult[0].avatar,
    }
    const result = await app.mysql.insert("article", insertParams)
    return result
  }
  // 更新文章
  async article_update(params) {
    const { app } = this
    const { id, creator_id, ...update_row } = params
    const options = {
      where: {
        id,
        creator_id,
      },
    }
    const result = await app.mysql.update("article", update_row, options)
    return result
  }
  // 删除文章
  async article_delete(id) {
    const { app } = this
    const options = {
      where: id,
    }
    const row = {
      is_delete: 1,
    }
    const result = await app.mysql.update("article", row, options)
    return result
  }
  // 添加文章评论
  async articleComment_insert(params) {
    const { app, service } = this
    let result
    const articleFlag = await this.article_query(params.comment_article_id)
    const userFlag = await service.user.userInfo(params.comment_userId)
    if (articleFlag.length === 0) result = { code: 104, msg: "该文章不存在" }
    else if (userFlag.length === 0) result = { code: 104, msg: "该用户不存在" }
    else {
      result = await app.mysql.insert("article_comment", params)
    }
    return result
  }

  //--------------------------------------------文章分类---------------------------------------
  // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
  async select_category() {
    const { app } = this
    const result = await app.mysql.select("article_category")
    return result
  }
  // 获取所有文章类别，按照树形结构 多表 不同级别的类别存放在不同的表中
  async select_moreTableCategory() {
    const { app } = this
    const querySql = `SELECT
        first_type.id AS first_id,
        first_type.category AS first_category,
        sec_type.id AS sec_id,
        sec_type.category AS sec_category
        FROM
            article_first_category AS first_type
        LEFT JOIN article_sec_category AS sec_type ON sec_type.parent_id = first_type.id
        ORDER BY
            first_type.id,
            sec_type.id`
    const result = await app.mysql.query<IArticleCategory>(querySql)
    return result
  }

  // 获取文章类别，按照懒加载的形式
  async select_lazy_category(params) {
    const { app } = this
    let result
    // id 传递的节点id  level 传递的级别， 默认为1 ，代表根节点 level == 2 代表二级节点
    const { id, level } = params
    // 设置 级别的范围 最大三级 最小一级
    const levelData = [1, 2, 3]
    const getLevel = levelData.find(item => item === level)
    const query_params = {
      where: getLevel && id ? { parent_id: id } : {},
    }
    // 说明 level 存在 但是不在范围中
    if (!getLevel) return result
    switch (Number(level)) {
      // 一级节点/根节点
      case 1:
        result = await app.mysql.select("article_first_category")
        break
      // 二级节点
      case 2:
        result = await app.mysql.select("article_sec_category", query_params)
        break
      // 三级节点
      case 3:
        result = await app.mysql.select("article_third_category", query_params)
        break
      default:
        break
    }
    return result
  }
  //--------------------------------------------文章分类---------------------------------------
}
