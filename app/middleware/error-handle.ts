export default ()=> {
    return async function ErrorHandle(_ctx:any,next){
        try {
            await next()
        } catch (error) {
            console.log(error, 1111)
        }
    }
}