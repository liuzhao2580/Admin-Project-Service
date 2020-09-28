const { data_success, no_data_failed, data_failed, no_data_success } = require('../utils/reponse_data')
const {nowTimeMinutes} = require("../utils/timeFormat")
const Controller = require('egg').Controller

const path = require("path")
const fs = require("fs")

class UserController extends Controller {
    // 用户登录
    async post_userLogin() {
        const { ctx, service } = this
        const params = ctx.request.body
        try {
            const data = await service.user.userLogin(params)
            // 如果查询到数据就生成 token
            if (data.length > 0) {
                const token = ctx.helper.setToken({ userId: data[0].userId })
                data[0].token = `${token}`
                ctx.body = data_success(data[0])
            } else ctx.body = no_data_failed(100, '用户名或密码错误')
        } catch (error) {
            ctx.body = data_failed(100, error)
        }
    }
    // 获取用户基本信息
    async get_userInfo() {
        const { ctx, service } = this
        const params = {
            userId: ctx.params.id
        }
        try {
            const data = await service.user.userInfo(params)
            if (data.length > 0) ctx.body = data_success(data[0])
            else ctx.body = no_data_failed(100, '没有该用户')
        } catch (error) {
            ctx.body = data_failed(100, error)
        }
    }
    // 更新用户信息
    async patch_updateUser() {
        const { ctx, service } = this
        try {
            ctx.validate({
                userId: {
                    required: true,
                    type: 'string'
                },
                phone: {
                    type: 'number',
                    convertType: 'number'
                },
                nickName: {
                    type: 'string',
                    convertType: 'string'
                },
                gender: {
                    type: 'number',
                    convertType: 'number'
                },
                email: 'email'
            })
            const params = {
                userId: ctx.request.body.userId
            }
            const data = await service.user.userInfo(params)
            // 说明该用户存在
            if (data.length > 0) {
                const updateParams = ctx.request.body
                const updateStatus = await service.user.updateUserInfo(updateParams)
                if (updateStatus == 1) ctx.body = no_data_success('更新成功')
                else ctx.body = no_data_failed(101, '更新失败')
            }
            // 说明该用户不存在
            else ctx.body = no_data_failed(101, '该用户不存在')
        } catch (error) {
            ctx.body = data_failed(100, error.errors)
        }
    }
    // 用户上传头像
    async post_upload() {
        const { ctx, service } = this
        // 获取用户 id
        const {userId} = ctx.request.body
        if (!userId) return ctx.body = no_data_failed(100, '用户id不能为空')
        // 获取上传的文件
        const getFile = ctx.request.files[0]
        const arr = getFile.filename.split(".")
        const suffix = arr[arr.length - 1]
        const setFileName = `${userId}_${nowTimeMinutes()}.${suffix}`
        const readFileData = fs.readFileSync(getFile.filepath)
        fs.writeFileSync(path.join(__dirname, `../public/upload/avatar/${setFileName}`),readFileData)
        ctx.body = no_data_success('文件上传成功')
        // 清除上传的文件缓存
        ctx.cleanupRequestFiles()
    }
}

module.exports = UserController
