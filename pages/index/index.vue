<template>
<view class="page">
	<!-- <navBar title='首页'></navBar> -->
	<view class="main">
		<view class="img">
			<!-- <u-image
			:src="src"
			width='100%'
			mode="widthFix"
			border-radius="8"
			>
			</u-image> -->
			<u-swiper :list="adList"></u-swiper>
		</view>
		<view class="recommend">
			<view class="title">
				<view class='text'>
					推荐服务
				</view>
			</view>
			<view class="recommend-main">
				<view class="recommend-box" v-for="(item) in recommentList" :key="item.id">
					<view class="box-left">
						<view class="text">
							{{item.title}}
						</view>
						<view class="intro">
							{{item.intro}}
						</view>
					</view>
					<view class="box-right">
						<u-image
						:src="item.icon"
						width="44px"
						mode="widthFix">
						</u-image>
					</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue';
	//图片相关
	import adImg from '@/static/ad.png'
	import car from '@/static/icon-car.svg'
	import add from '@/static/icon-add.svg'
	export default {
		components: {
			navBar,
		},
		data() {
			return {
				src:adImg,// 首页图片
				recommentList:[
					{
						title:'临停缴费',
						intro:'快速缴费通道',
						icon:car,
						id:0
					},
					{
						title:'智慧充电',
						intro:'扫码快捷充电',
						icon:add,
						id:1
					},
					{
						title:'临停缴费',
						intro:'快速缴费通道',
						icon:car,
						id:2
					},
					{
						title:'智慧充电',
						intro:'扫码快捷充电',
						icon:add,
						id:3
					},
					{
						title:'临停缴费',
						intro:'快速缴费通道',
						icon:car,
						id:4
					},
					{
						title:'智慧充电',
						intro:'扫码快捷充电',
						icon:add,
						id:5
					},
				],
				adList:[
					adImg,
					adImg,
					adImg,
					adImg
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.page {
	display:flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	.main {
		flex:1;
		padding:12px 12px 50px 12px;
		display:flex;
		flex-direction: column;
		align-items: center;
		.img {
			width: 100%;
			margin-bottom: 20px;
		}
		.recommend {
			width: 100%;
			.title {
				width: 100%;
				height: 24px;
				.text {
					padding-left:4px;
					width: 64px;
					height: 24px;
					font-family: PingFang SC;
					font-size: 16px;
					font-weight: 500;
					line-height: 24px;
					text-align: center;
					letter-spacing: normal;
					color: #1F2938;
				}
			}
		
		    &-main {
				  display: flex;
				  flex-wrap: wrap;
				  column-gap: 12px;
				// display: grid;
				// grid-template-columns: repeat(auto-fill, minmax(35%, 169px));
				// justify-content: space-between;
				.recommend-box {
					display: flex;
					flex: 1 1;   // 允许拉伸和缩小，基础宽度 120px
					max-width: 169px;
					min-width: 110px;   // 可选，避免过窄
					padding: 12px 14px;
					justify-content: space-between;
					align-items: center;
					background-color: #E5F0FF;
					margin-top:12px;
					border-radius: 8px;
					.box-left {
						display:flex;
						justify-content: space-between;
						flex-direction: column;
						.text {
							font-family: PingFang SC;
							font-size: 14px;
							font-weight: 500;
							line-height: 22px;
							text-align: center;
							letter-spacing: normal;
							color: #1F2938;
						}
						.intro {
							display: -webkit-box;          
							-webkit-line-clamp: 1;         
							-webkit-box-orient: vertical;  
							overflow: hidden;               
							text-overflow: ellipsis;        
							word-break: break-word;    
							font-family: PingFang SC;
							font-size: 12px;
							font-weight: normal;
							line-height: 20px;
							text-align: center;
							letter-spacing: normal;
							color: #9095A2;
						}
					}
					.box-right {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
}
</style>
