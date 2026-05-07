const WHITE_LIST = ['/pages/login/login',
                    '/pages/index/index',
                    '/pages/user/user'];
const LOGIN_PAGE = '/pages/login/login';
const apis = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
const tempPath = 'TEMP_PATH'
function isLogin() {
	return !!uni.getStorageSync('userToken')
}
function getCurrentPagePath() {
  const pages = getCurrentPages()
  if (!pages.length) return ''
  const currentPage = pages[pages.length - 1]
  let pagePath = currentPage.route
  if (!pagePath) return ''
  // 确保以 '/' 开头
  return '/' + pagePath
}
export function invokeRoute() {
	apis.forEach(api => {
		uni.addInterceptor(api, {
			invoke(e) {
				const pagePath = e.url.split('?')[0]
				if (WHITE_LIST.includes(pagePath)) return e;
				if (!isLogin()) {
					uni.setStorageSync(tempPath, e.url);
					uni.reLaunch({
						url:LOGIN_PAGE,
					})
					return false;
				}
				return e
			}
		})
	})
}

export function checkNeedToLogin(query) {
	const currentPagePath = getCurrentPagePath();
	if (WHITE_LIST.includes(currentPagePath)) return true;
	if (isLogin()) return true;
	let queryString
	const queryList = Object.keys(query)
	if (queryList.length !== 0) {
		 queryString = queryList.map(item => {
			return `${item}=${query[item]}`
		}).join('&')
	}
	console.log('登录失败')
	const fullPath = queryString ? `${currentPagePath}?${queryString}` : currentPagePath
	uni.setStorageSync(tempPath, fullPath)
	uni.reLaunch({
		url:LOGIN_PAGE
	})
	return false;
}