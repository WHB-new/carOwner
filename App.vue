<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import '@/uni_modules/uview-ui/theme.scss';
    uni-page-body {
      display: flex;
      flex: 1;     /* 让body自动填满page剩余空间 */
    }
	page {
		display: flex;
		flex-direction: column;
		height: 100%; /* 使页面占满视口 */
	}
</style>
