<template>
	<view>
		<u-navbar
		height="44"
		z-index='30' 
		back-icon-name='close'
		back-icon-size='24'
		:title="title"
		:background="background"
		:title-bold="true"
		title-size="17"
		:is-fixed="true"
		 >
		   <view
		   slot="right"
		   class="navRight">
			   <u-icon name="more-dot-fill" size="24"></u-icon>
		   </view>
		 </u-navbar>
	</view>
</template>

<script>
	export default {
		name:"navBar",
		props:['title'],
		data() {
			return {
				background: {
					backgroundColor: "#EDEDED"
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.navRight {
		display:flex;
		justify-content: center;
		align-items: center;
		width: 56rpx;
		height: 36rpx;
	}
</style>