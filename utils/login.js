const WHITE_LIST = ['/pages/login/login',
                    '/pages/index/index',
					'/pages/login/code'];
const LOGIN_PAGE = '/pages/login/login';
const apis = ['navigateTo', 'redirectTo', 'reLaunch'];
const tempPath = 'TEMP_PATH'
// 根据token判断是否登录 + 发请求时401判断是否过期
function isLogin() {
	return !!uni.getStorageSync('userToken')
}
// 获取当前的路由
function getCurrentPagePath() {
  const pages = getCurrentPages()
  if (!pages.length) return ''
  const currentPage = pages[pages.length - 1]
  let pagePath = currentPage.route
  if (!pagePath) return ''
  // 确保以 '/' 开头
  return '/' + pagePath
}
// 拦截跳转操作判断是否登录，无法判断首次加载页面
export function invokeRoute() {
	apis.forEach(api => {
		uni.addInterceptor(api, {
			invoke(e) {
				const pagePath = e.url.split('?')[0]
				// 白名单不用验证
				if (WHITE_LIST.includes(pagePath)) return e;
				// 登录了
				if (isLogin()) return e
				// 没登录拦截
				uni.setStorageSync(tempPath, e.url);
				uni.reLaunch({
					url:LOGIN_PAGE,
				})
				return false;
			}
		})
	})
}
// 首次加载时是否登录，没登录拦截回注册登录
export function checkNeedToLogin(query) {
	const currentPagePath = getCurrentPagePath();
	// 是否在白名单或者已经登录了
	if (WHITE_LIST.includes(currentPagePath)) return true;
	if (isLogin()) return true;
	let queryString
	const queryList = Object.keys(query)
	// 如果有参数需要拼凑参数url
	if (queryList.length !== 0) {
		 queryString = queryList.map(item => {
			return `${item}=${query[item]}`
		}).join('&')
	}
	const fullPath = queryString ? `${currentPagePath}?${queryString}` : currentPagePath
	uni.setStorageSync(tempPath, fullPath)
	uni.reLaunch({
		url:LOGIN_PAGE
	})
	return false;
}