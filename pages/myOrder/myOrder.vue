<template>
		<view class="page safe-bottom">
			<view class="main">
				<mescroll-body
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:up="upOption"
				:down="downOption">
					<view class='sticky-box'>
						<view class='back' @click='handleBackToUser'>
							<view class="icon">
								<u-icon
								name="arrow-left"
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
					</view>
				 
				<view class='orderMain'>
					<view class='orderTabs'>
						<u-subsection
						:list="order"
						:current="orderCurrent"
						@change="handleOrderChange"
						bg-color="#ffffff"
						mode="button"
						button-color="#EFF1F5"
						>
						</u-subsection>
					</view>
					<view class='orderList'>
						<order 
						v-for="item in orderList" 
						:key='item.id'
						:info='item'
						@click.native="handleClickOrder(item.id,tabCurrent,orderCurrent)"></order>
					</view>
				</view>
				</mescroll-body>
			</view>
		</view>
</template>

<script>
	import { apiOrder } from '../../api/mock'
	import navBar from '@/components/navBar/navBar.vue'
	import order from '@/components/order/order.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import emptyIcon from '@/static/1.png'
    import { checkNeedToLogin } from '../../utils/login'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// mescroll
				downOption: {
					offset: 50,
					inOffsetRate: 1,
					outOffsetRate: 0.2,
					bottomOffset: 20,
					minAngle: 45,
					textInOffset: '下拉刷新',
					textOutOffset: '松手刷新',
					textLoading: '刷新中 ...'
				},
				upOption: {
					page: {
						num: 0, 
						size: 10,
					},
					noMoreSize: 7,
					textLoading: '加载中 ...',
					textNoMore: '暂时没有更多数据，看看其他吧~',
					empty: {
						use: true,
						icon: emptyIcon,
						tip: '暂无订单数据',
					}
				},		
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
				// orderTabs
				orderCurrent:0,
				order:[
					{
						name:'全部订单'
					},
					{
						name:'当月订单'
					}
				],
				orderList:[],
			};
		},
		methods: {
			handleTabChange(index) {
				this.tabCurrent = index;
				// 发请求请求数据
			},
			handleOrderChange(index) {
				console.log('出发了吗')
				this.orderCurrent = index;
				if (index != 0) {
					this.orderList = [];
					this.mescroll.endByPage(0, 0);
				} else {
					this.mescroll.resetUpScroll();
				}
			},
			handleBackToUser() {
				this.$u.route({
					type:'navigateBack',
				})
			},
			handleClickOrder(orderId, tabCurrent, orderCurrent) {
				this.$u.route({
					url:'pages/orderDetail/orderDetail',
					params: {
						id: orderId,
						tabCurrent,
						orderCurrent
					}
				})
			},
			async upCallback(page){
				let result = await apiOrder(page.num, page.size);
				let totalPage = result.totalPage;
				let curPageLen = result.list.length ? result.list.length : 0;
				if (page.num == 1) {
					this.orderList = [];
				};
				this.orderList = [...this.orderList, ...result.list]
				// console.log(curPageLen, totalPage);
				this.mescroll.endByPage(curPageLen, totalPage);
			}
		},
		downCallback(){
			this.orderList = [];
			this.mescroll.resetUpScroll();
		},
		onLoad(params){
			checkNeedToLogin(params)
			this.tabCurrent = params.index;
			this.orderCurrent = params.orderIndex;
		}
	}
</script>

<style lang="scss" scoped>
	.safe-bottom {
	    padding-bottom: constant(safe-area-inset-bottom);
	    padding-bottom: env(safe-area-inset-bottom);
	}
.page {
	display:flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	// height: 100%;
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
			padding-top:7px;
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
				width: 300rpx;
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
.sticky-box {
	position:sticky;
	top:0;
	z-index:30;
}
</style>