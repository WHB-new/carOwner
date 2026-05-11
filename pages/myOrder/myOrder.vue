<template>
			<view class="page-warp">

				<view class="top-warp">

					<view class='sticky-box'>
					 <u-navbar
					 back-text="返回"
					 back-icon-size="28"
					 :custom-back="handleBackToUser"
					 height='36'>
						 
					 </u-navbar>
                     <u-tabs
                      :list="tabList" 
                      :current="tabCurrent"
                      @change="handleTabChange"
                      name='name'
                      active-color="#408FFF"
                      gutter="24"
                      ></u-tabs>
					</view>
				</view>
				
				<view class="center-warp">
					<view class="right-warp">
						<mescroll-uni 
						:fixed="false"
						@init="mescrollInit" 
						@down="downCallback" 
						@up="upCallback"
						:up='upOption'
						:down='downOption'>
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
						</mescroll-uni>
					</view>
				</view>
				
			</view>

</template>

<script>
	import { apiOrder } from '../../api/mock'
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
				requestTask:new Set(),// 维护发送的请求
			};
		},
		methods: {
			abortAllRequest(){
				this.requestTask.forEach(abort => {
					abort();
				})
				this.requestTask.clear()
			},
			handleTabChange(index) {
				this.tabCurrent = index;
				this.orderList = []
				this.mescroll.resetUpScroll()
				// 发请求请求数据
			},
			handleOrderChange(index) {
				this.orderCurrent = index;
				this.orderList = []
				this.mescroll.resetUpScroll();
			},
			handleBackToUser() {
				uni.switchTab({
					url:'/pages/user/user'
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
				// 删除前面的请求，防止tabs切换出现数据不对的问题
				const task = apiOrder(page.num, page.size, this.tabCurrent)
				try {
					// 最开始的第一轮发送的所有请求不用触发取消
					if (this.requestTask.size !== 0) {
						this.abortAllRequest();
					}
					this.requestTask.add(task.abort)
					let result = await task;
					let totalPage = result.totalPage;
					let curPageLen = result.list.length
					if (page.num == 1) {
						this.orderList = [];
					};
					this.orderList = [...this.orderList, ...result.list]
					this.mescroll.endByPage(curPageLen, totalPage);
				}catch(err){
					console.log(err)
				}finally{
					this.requestTask.delete(task.abort);
				}
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
	// 不允许换行 否则uView的导航栏设置back-text超过两个字会出现问题
	::v-deep .u-navbar {
		.u-back-text {
			white-space: nowrap;
		}
		.u-back-wrap {
			padding-left:9px;
		}
	}
	// 不知道什么原因 直接使用的时候会出现背景上下不对称不均匀，强行让其居中
	::v-deep .u-subsection {
		.u-item-bg {
			top: 50% !important;
			bottom: auto !important;
			transform: translateY(-50%) !important;
		}
	}
	/*根元素需要有固定的高度*/
	page{
		height: 100%;
		// 支付宝小程序,钉钉小程序需添加绝对定位,否则height:100%失效: https://opendocs.alipay.com/mini/framework/acss#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98
		/* #ifdef MP-ALIPAY || MP-DINGTALK*/
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		/* #endif */
		
		/*需给父元素设置height:100%*/
		.page-warp{
			height: 100%;
			display: flex;
			flex-direction: column;
			background-color: #F5F6F7;
			/* 顶部区域 */
			.top-warp{
				font-size: 28rpx;
				// padding: 20rpx;
				text-align: center;
			}
			
			/* 中间 */
			.center-warp{
				flex: 1;
				min-width: 0;
				min-height: 0;/* 需给flex:1的元素加上最小高,否则内容超过会溢出容器 (如:小程序Android真机) */
				display: flex;
				.right-warp{
					flex: 1;
					min-width: 0;
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
		}
	}
</style>