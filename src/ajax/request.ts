type params = {
    name: string,
    data: any 
}
export default ({ name, data = {} }: params) => {
    return new Promise((reslove, reject) => {
        uni.showLoading({})
        uniCloud.callFunction({
            name,
            data,
            success: ({ result }) => {
                if (result.code === 0) {
                    reslove(result.data)
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: result.msg
                    })
                }
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}