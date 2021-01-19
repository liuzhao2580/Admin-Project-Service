import { Application } from 'egg';
import  userRouter from './router/user'
import  dashboardRouter from './router/dashboard'
import  articleRouter from './router/article'
import  gadgetRouter from './router/gadget'

export default  (app:Application) => {
    const { router } = app
    router.prefix('/v1/api')
    // 用户
    userRouter(app)
    // 首页
    dashboardRouter(app)
    // 文章
    articleRouter(app)
    // gadget 小工具接口
    gadgetRouter(app)
}
