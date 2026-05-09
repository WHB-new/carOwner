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
	let requestTask = null;       // 存放任务对象
	let isAborted = false;        // 标记请求是否被手动取消
	const promise = new Promise((resolve, reject)=> {
		requestTask = uni.request({
			...reqOptions,
			success:(res) => {
				if (isAborted) return;
				if (res.statusCode === 200) {
					resolve(res.data);
				} else if (res.statusCode === 401) {
					reject({ code: 401, message: '登录已过期，请重新登录' })
					if (!isRedirecting) {
						isRedirecting = true
						// 防止多个请求401导致反复跳转
						setTimeout(() => {
							isRedirecting = false
						},2000)
						uni.removeStorageSync('userToken')
						uni.navigateTo({ url: '/pages/login/login' })
					}

				} else {
					reject(res.data)
				}
			},
			fail:() => {
				if (isAborted) {
					reject({
						name: 'AbortError',
						message:'主动取消请求'
					})
					return;
				}
				reject({ code: -1, message: '网络请求失败，请检查网络设置' })
			}
		})
	})
	promise.abort =  () => {
		if (requestTask && !isAborted) {
			isAborted = true;
			requestTask.abort()
			console.log('触发了主动取消abort',requestTask, isAborted)
		}
	}
	return promise
}
export default newRequest;