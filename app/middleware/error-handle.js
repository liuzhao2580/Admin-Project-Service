module.exports = ()=> {
    return async function ErrorHandle(ctx,next){
        try {
            await next()
        } catch (error) {
            console.log(error, 1111)
        }
    }
}