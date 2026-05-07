const baseUrl = 'http://120.24.79.108/parking-api/user-server';//后面分环境
let isRedirecting = false // 防止多次跳转
const newRequest = (options = {}) => {
	const reqOptions = {
		url: baseUrl + options.url,
		method:options.method || 'GET',
		timeout: 10000,
		data:options.data || {},
		header: {
			'Content-Type':'application/json',
			...options.header
		},
	}
	if (uni.getStorageSync('userToken')) {
	    reqOptions.header.token = uni.getStorageSync('userToken')
	  }
	return new Promise ((resolve, reject)=> {
		uni.request({
			...reqOptions,
			success:(res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else if (res.statusCode === 401) {
					if (!isRedirecting) {
						isRedirecting = true
						// 防止多个请求401导致反复跳转
						setTimeout(() => {
							isRedirecting = false
						},2000)
						uni.removeStorageSync('userToken')
						uni.removeStorageSync('userInfo')
						uni.navigateTo({ url: '/pages/login/login' })
						reject({ code: 401, message: '登录已过期，请重新登录' })
					}

				} else {
					reject(res.data)
				}
			},
			fail:() => {
				reject({ code: -1, message: '网络请求失败，请检查网络设置' })
			}
		})
	})
}
export default newRequest;