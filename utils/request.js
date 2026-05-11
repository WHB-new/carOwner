let baseUrl = 'http://120.24.79.108/parking-api/user-server';
// #ifdef H5
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/parking-api/user-server'; 
}
// #endif
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
					return;
				} 
				if (res.statusCode === 401) {
					if (!isRedirecting) {
						isRedirecting = true
						// 防止多个请求401导致反复跳转
						setTimeout(() => {
							isRedirecting = false
						},2000)
						uni.removeStorageSync('userToken')
						uni.navigateTo({ url: '/pages/login/login' })
						}
					reject({ code: 401, message: '登录已过期，请重新登录' })
					return;
				}
				
				reject(res.data)
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
		}
	}
	return promise
}
export default newRequest;