<template>
	<view class="page">
		<!-- <navBar title="我的"></navBar> -->
		<view class="main">
			<view class='userInfo'>
			 <view style="margin-left: 8px;heigth:40rpx;display:flex;justify-content: center;align-items: center; margin-top:28px;">
				 <view class="userIcon">
				 	<u-image
				 	:src="userInfo.userIcon"
				 	width="100%"
				 	height="100%"
				 	></u-image>
				 </view>
				 <view class="userName">
				 	{{userInfo.userName}}
				 </view>
			 </view>
			</view>
			<view class="info">
				<view class="info-box" v-for="(item) in info" :key="item.id">
						<view class="amount">
							{{item.amount}}
						</view>
						<view class="intro">
							{{item.intro}}
						</view>
				</view>
			</view>
			<view class="payBill">
				<view class='intro'>
					<view class='txt'>我的订单</view>
					<view class='more'>
						<view class='txt'>查看更多</view>
						<view class="icon">
							<u-icon
							name='arrow-right'
							size="12px">
							</u-icon>
						</view>
					</view>
				</view>
				<view class="plan">
					<view class='plan-box' 
					v-for="(item, index) in planList" 
					:key="item.id"
					@click="handlePlan(index)">
						<view class='img'>
							<u-image
							:src="item.icon"
							width="100%"
							height="100%"></u-image>
						</view>
						<view class='name'>
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class='other'>
				<view class='list' 
				v-for="(item, index) in otherList" 
				:key="item.id"
				>
					<view class='left'>
						<view class='icon'>
							<u-image
							:src="item.icon"
							width="100%"
							height="100%">
							</u-image>
						</view>
						<view class='name'>
							{{item.name}}
						</view>
					</view>
					<view class="right">
						<u-icon
						name='arrow-right'
						size='14rpx'>
						
						</u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue'
	import userIcon from '@/static/userIcon.svg'
	import tempStop from '@/static/temp-stop.svg'
	import invoice from '@/static/Invoice.svg'
	export default {
		components: {
			navBar,
		},
		data() {
			return {
				userInfo: {
					userName: '15u40912u0941u',
					userIcon: userIcon
				},
				info: [
					{
						id:0,
						amount:0,
						intro:'我的车辆'
					},
					{
						id:1,
						amount:0.00,
						intro:'钱包'
					},
					{
						id:2,
						amount:2,
						intro:'我的月卡'
					}
				],
				planList:[
					{
						id:0,
						icon:tempStop,
						name:'临停订单'
					},
					{
						id:1,
						icon:tempStop,
						name:'我的月卡'
					},
					{
						id:2,
						icon:tempStop,
						name:'分时套餐'
					},
					{
						id:3,
						icon:tempStop,
						name:'区域套餐'
					},
					{
						id:4,
						icon:tempStop,
						name:'充电订单'
					},
				],
				otherList:[
					{
						id:0,
						icon:invoice,
						name:'电子发票'
					},
					{
						id:1,
						icon:invoice,
						name:'电子发票'
					},
					{
						id:2,
						icon:invoice,
						name:'电子发票'
					},
					{
						id:3,
						icon:invoice,
						name:'电子发票'
					},
					{
						id:4,
						icon:invoice,
						name:'电子发票'
					}
				]
			};
		},
		methods: {
			handlePlan(index) {
				this.$u.route({
								url: 'pages/myOrder/myOrder',
								params: {
									index
								}
							})
			}
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
		padding: 0 12px 50px 12px;
		flex:1;
		mix-blend-mode: color-burn;
		background: url(@/static/image.png);
		filter: opacity(0.699999988079071);
		.userInfo {
			display:flex;
			.userIcon {
				margin-right:8px;
				display:flex;
				justify-content: center;
				align-items: center;
				width: 40px;
				height: 40px;
			}
			.userName {
				font-family: PingFang SC;
				font-size: 16px;
				font-weight: 500;
				line-height: 24px;
				letter-spacing: normal;
				color: #1F2938;
			}
		}
	
	    .info {
			display:flex;
			margin-top:34rpx;
			&-box {
				display:flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex:1;
					.amount {
						font-family: PingFang SC;
						font-size: 16px;
						font-weight: 500;
						line-height: 24px;
						letter-spacing: normal;
						color: #1F2938;
					}
					.intro {
						font-family: PingFang SC;
						font-size: 13px;
						font-weight: normal;
						line-height: 21px;
						letter-spacing: normal;
						color: #585E6D;
					}
			}
		}
	    
		.payBill {
			border-radius: 12px;
			background: #FFFFFF;
			width: 100%;
			margin-top:15px;
			padding: 16px 15px 17px 16px;
			box-sizing:border-box;
			.intro {
				display:flex;
				justify-content: space-between;
				align-items: center;
				.txt {
					font-family: PingFang SC;
					font-size: 15px;
					font-weight: 500;
					line-height: normal;
					letter-spacing: normal;
					color: #3D3D3D;
				}
				.more {
					display:flex;
					justify-content: center;
					align-items: center;
					height: 17px;
					.txt {
						height: 17px;
						font-family: PingFang SC;
						font-size: 12px;
						font-weight: normal;
						line-height: 17px;
						letter-spacing: normal;
						color: #9095A2;
					}
					.icon {
						width: 12px;
						height: 12px;
						display:flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.plan {
				display:flex;
				justify-content: center;
				align-items: center;
				margin-top: 15px;
				&-box {
					flex:1;
					display:flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.img {
						width: 36px;
						height: 36px;
						display:flex;
						justify-content: center;
						align-items: center;
					}
					.name {
						display: -webkit-box;
						-webkit-line-clamp: 1;         
						-webkit-box-orient: vertical;  
						overflow: hidden;               
						text-overflow: ellipsis;        
						word-break: break-word;
						font-family: PingFang SC;
						font-size: 13rpx;
						font-weight: normal;
						line-height: 21px;
						letter-spacing: normal;
						color: #585E6D;
					}
				}
			}
		}
	
	    .other {
			margin-top:10px;
			background-color: #fff;
			border-radius: 12px;
			width: 100%;
			box-sizing: border-box;
			padding:0 12px;
				.list {
					display:flex;
					align-items: center;
					justify-content: space-between;
					.left {
						height: 50px;
						display:flex;
						align-items: center;
						.icon {
							width: 16px;
							height: 16px;
							display:flex;
							justify-content: center;
							align-items: center;
						}
						.name {
							margin-left:3px;
							height: 22px;
							font-family: PingFang SC;
							font-size: 14px;
							font-weight: normal;
							line-height: 22px;
							letter-spacing: normal;
							color: #1F2938;
						}
					}
					.right {
						display:flex;
						justify-content: center;
						align-items: center;
					}
				}
			
		}
	}
	}
</style>