<template>
	<view class="page">
		<!-- <navBar title='我的订单'></navBar> -->
		<view class="main">
			<view class='back' @click='handleBackToUser'>
				<view class="icon">
					<u-icon
					name="arrow-left"
					size="14"
					color="#585E6D"></u-icon>
				</view>
				<view class="txt">返回</view>
			</view>
			<u-tabs 
			 :list="tabList" 
			 :current="tabCurrent"
			 @change="handleTabChange"
			 name='name'
			 active-color="#408FFF"
			 gutter="24"
			 ></u-tabs>
			 
			<view class='orderMain'>
				<view class='orderTabs'>
					<u-tabs
					class='tabs'
					:list="order"
					name='name'
					:is-scroll='false'
					@change="handleOrderChange"
					item-width="78"
					:show-bar='false'
					
					>
					</u-tabs>
				</view>
				<view class='orderList'>
					<order 
					v-for="item in orderList" 
					:key='item.id'
					:info='item'></order>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue'
	import order from '@/components/order/order.vue'
	export default {
		data() {
			return {
				tabList:[
					{
						name:'临停月卡'
					},
					{
						name:'普通月卡'
					},
					{
						name:'分时套餐'
					},
					{
						name:'区域套餐'
					},
					{
						name:'充电订单'
					},
				],
				tabCurrent:0,
				orderCurrent:0,
				order:[
					{
						name:'全部订单'
					},
					{
						name:'当月订单'
					}
				],
			    orderList:[
					// {
					// 	icon:'',
					// 	carNumber:'粤B12345',
					// 	address:'前海大厦停车场',
					// 	price:'79',
					// 	time: {
					// 		startTime:'2023-10-12 12:23',
					// 		endTime:'2023-10-12 12:23'
					// 	},
					// 	type:1,
					// 	intro: [
					// 		{
					// 			introName:'通行车场',
					// 			introData:'鲤鱼门西街停车场、桂湾公园公共停车场、前海运动公园公共停车场'
					// 		}
					// 	],
					// 	id:'001'
					// }
					{
						icon:'',
						carNumber:'粤B12345',
						address:'前海大厦停车场',
						price:'79',
						time: {
							startTime:'2023-10-12 12:23',
							endTime:'2023-10-12 12:23'
						},
						type:1,
						intro: [
							{
								introName:'套餐时长',
								introData:'50小时',
								}
						],
						id:'001'
					}
				]
			};
		},
		methods: {
			handleTabChange(index){
				this.tabCurrent = index;
				// 发请求请求数据
			},
			handleOrderChange(index){
				this.orderCurrent = index;
			},
			handleBackToUser(){
				this.$u.route({
					type:'navigateBack',
				})
			}
		},
		onLoad(params){
			console.log(params);
			this.orderCurrent = params.index;
		}
	}
</script>

<style lang="scss">
.page {
	display:flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	.main {
		display:flex;
		background-color: #EFF1F5;
		flex-direction: column;
		padding:0 0 50px 0;
		flex:1;
		position:relative;
		.back {
			// position:absolute;
			// top:0;
			// left:0;
			background-color: #ffffff;
			padding-left:12rpx;
			height: 36px;
			display:flex;
			align-items: center;
			.icon {
				width: 14px;
				height: 14px;
				display:flex;
				justify-content: center;
				align-items: center;
			}
			.txt {
				height: 22px;
				font-family: PingFang SC;
				font-size: 14px;
				font-weight: normal;
				line-height: 22px;
				text-align: center;
				letter-spacing: normal;
				color: #585E6D;
			}
		}
	    
		.orderMain {
			padding: 10px 12px 0 12px;
			flex:1;
			.orderTabs {
				width: 152px;
				// height: 32px;
			}
			.orderList {
				margin-top:12px;
			}
		}
	}
}
.tabs {
	
}
</style>