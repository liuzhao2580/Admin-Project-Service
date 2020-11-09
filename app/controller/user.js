const { data_success, no_data_failed, data_failed, no_data_success } = require('../utils/reponse_data')
const Controller = require('egg').Controller

const path = require("path")
const fs = require("fs")

class UserController extends Controller {
    // 获取 csrf-token 发送一条随机请求
    async CSRFToken() {
        const {ctx} = this
        ctx.body = await no_data_success()
    }
    // 用户登录
    async post_userLogin() {
        const { ctx, service } = this
        const params = ctx.request.body
        const {userName, password} = params
        try {
            ctx.validate({
                userName: {
                    required: true,
                    type: 'string'
                },
                password: {
                    required: true,
                    type: 'string',
                    convertType: 'string'
                },
                code: {
                    required:true,
                    type: 'string',
                    convertType: 'string'
                }
            })
            const data = await service.user.userLogin({userName, password})
            // 如果查询到数据就生成 token
            if (data.length > 0) {
                const token = ctx.helper.setToken({ userId: data[0].userId })
                data[0].token = `${token}`
                // 调用 rotateCsrfSecret 刷新用户的 CSRF token
                ctx.rotateCsrfSecret()
                ctx.body = data_success(data[0])
            }
            else ctx.body = no_data_failed(100, '用户名或密码错误')
        } catch (error) {
            ctx.body = data_failed(100, error)
        }
    }
    // 获取用户基本信息
    async get_userInfo() {
        const { ctx, service } = this
        const userId = ctx.params.id
        try {
            const data = await service.user.userInfo(userId)
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
    async post_upload_avatar() {
        const { ctx, service, app } = this
        // 获取用户 id
        const {userId} = ctx.request.body
        if (!userId) return ctx.body = no_data_failed(100, '用户id不能为空')
        // 获取上传的文件
        const getFile = ctx.request.files[0]
        const arr = getFile.filename.split(".")
        const suffix = arr[arr.length - 1]
        const setFileName = `${userId}.${suffix}`
        // 文件路径
        const taskFileUrl = path.join(__dirname, `../public/upload/avatar/`, setFileName)
        // const getReadStream = fs.createReadStream(getFile.filepath)
        // const getWriteStream = fs.createWriteStream(path.join(__dirname, `../public/upload/avatar/`, setFileName))
        // getReadStream.pipe(getWriteStream)
        // 1. 首先获取avatar目录下的所有图片
        const getAllAvatar = fs.readdirSync(path.join(__dirname, `../public/upload/avatar/`))
        // 2. 找到当前的用户之前上传过的头像
        const getUserIdAvatar = getAllAvatar.find(item => item.split(".")[0] == userId)
        // 3. 如果存在图片就删除
        if(getUserIdAvatar) fs.unlinkSync(path.join(__dirname, `../public/upload/avatar/`, getUserIdAvatar))
        // 4. 不然就说明没有，存入新的图片
        try {
            const readFileData = fs.readFileSync(getFile.filepath)
            fs.writeFileSync(taskFileUrl,readFileData)
            const getAvatarUrl = `${ctx.host}/public/upload/avatar/${setFileName}`
            const params = {
                userId,
                avatar: getAvatarUrl
            }
            const result = await service.user.uploadUserAvatar(params)
            if(result.affectedRows == 1) ctx.body = no_data_success('头像上传成功')
            else ctx.body = no_data_failed(100, '头像上传失败')
        } catch (error) {
           console.log(error, 'error') 
        }
        // 清除上传的文件缓存
        ctx.cleanupRequestFiles()
    }
}

module.exports = UserController
