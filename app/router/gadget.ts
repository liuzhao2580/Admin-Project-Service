import { Application } from 'egg'
export default (app: Application) => {
    // 获取天气
    app.router.get('/gadget/weather', app.controller.gadget.get_Weather)
}