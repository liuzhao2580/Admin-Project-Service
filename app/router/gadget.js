module.exports = app => {
    // 获取天气
    app.router.get('/gadget/weather', app.controller.gadget.get_Weather)
}