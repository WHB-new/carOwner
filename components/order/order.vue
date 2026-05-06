<template>
	<view class='order'>
		<view class='header'>
			<view class='left'>
				<view class="icon">
					<u-image
					:src="orderInfo.icon"
					width='100%'
					height="100%"></u-image>
				</view>
				<view class="info">
					<view class="carNumber">
						{{orderInfo.carNumber}}
					</view>
					<view class="address">
						{{orderInfo.address ? orderInfo.address : ''}}
					</view>
				</view>
			</view>
			<view class="right">
				<view class="sign">￥</view>
				<view class="price">
					{{orderInfo.price}}
				</view>
			</view>
		</view>
		<view class="content" v-if="Object.keys(orderInfo).length !== 0">
			<view class='intro'>
				<view class="intro-box"
				v-for="(item, index) in orderInfo.intro"
				:key="index">
					<view class='introName'>
						{{item.introName}}：
					</view>
					<view :class='orderMap[item.introName]'>
						{{item.introData}}
					</view>
				</view>
			</view>
			<view class="content-footer">
				<view class="time">
					开始时间：{{orderInfo.time.startTime ? orderInfo.time.startTime : 0}}
				</view>
				<view class="time">
					结束时间：{{orderInfo.time.endTime ? orderInfo.time.endTime : 0}}
				</view>
			</view>
		</view>
		<view class="footer">
			<view class='right'>
				<view>
					<u-button :custom-style="firstButton" size="medium">对账单有疑问</u-button>
				</view>
				<view>
					<u-button :custom-style="secondButton" size="medium">开发票</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"order",
		props:['info'],
		data() {
			return {
				firstButton: {
					fontFamily: "PingFang SC",
					fontSize: "13px",
					fontWeight: "normal",
					lineHeight: "18px",
					letterSpacing: "normal",
					color: "#9095A2"
				},
				secondButton: {
					marginLeft:'10px',
					border:'1px solid #4784FF',
					borderRadius: "6px",
					color:'#4784FF',
					fontFamily: "PingFang SC",
					fontSize: "13px",
					fontWeight: "normal",
					lineHeight: "18px",
					letterSpacing: "normal",
				},
			    orderInfo:this.info,
				orderMap: {
				  '订单类型': 'addCard',
				  '套餐时长': 'cutHour',
				  '通行车场': 'placeOrder',
				  '充电量': 'eletro'
				}
			};
		},
		onLoad() {
			console.log(orderInfo)
		}
	}
</script>

<style lang="scss">
.order {
	margin-bottom:10px;
	background-color: #FFFFFF;
	padding:12px;
	border-radius: 12px;
	.header {
		display:flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40px;
		.left{
			display:flex;
			.icon {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.info {
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				margin-left:12px;
				.carNumber {
					font-family: PingFang SC;
					font-size: 17px;
					font-weight: 500;
					line-height: 22px;
					letter-spacing: normal;
					color: #1F2938;
				}
				.address {
					font-family: PingFang SC;
					font-size: 13px;
					font-weight: normal;
					line-height: 18px;
					letter-spacing: normal;
					color: #585E6D;
				}
			}
		}
		.right {
			display:flex;
			justify-content: center;
			align-items: center;
			.sign {
				font-family: PingFang SC;
				font-size: 12px;
				font-weight: 500;
				line-height: 22px;
				letter-spacing: normal;
				color: #1F2938;
			}
			.price {
				font-family: PingFang SC;
				font-size: 20px;
				font-weight: 500;
				line-height: 26px;
				letter-spacing: normal;
				color: #1F2938;
			}
		}
	}
	.content {
		background-color: #F8F9FA;
		width: 100%;
		margin: 12px 0;
		border-radius: 8px;
		padding:10px 12px;
		box-sizing: border-box;
		.intro {
			border-bottom: 1px solid #EAECF0;
			padding-bottom: 6px;
			.intro-box {
				display:flex;
				 align-items: flex-start;
				.introName {
					white-space: nowrap;   // 关键：防止换行
					flex-shrink: 0; 
					font-family: PingFang SC;
					font-size: 13px;
					font-weight: normal;
					line-height: 18px;
					letter-spacing: normal;
					color: #585E6D;
				}
				// .txt {
				// 	font-family: PingFang SC;
				// 	font-size: 13px;
				// 	font-weight: normal;
				// 	line-height: 18px;
				// 	letter-spacing: normal;
				// 	color: #1F2938;
				// 	/* 50  */ 
				// 	font-family: PingFang SC; 
				// 	font-weight: 500; 
				// 	font-size: 13px;
				// 	font-variation-settings: "opsz" auto;
					
				// 	/* 小时 */ 
				// 	font-family: PingFang SC; 
				// 	font-weight: 400; 
				// 	font-size: 13px;
				// 	font-variation-settings: "opsz" auto;
				
				// }
			}
		}
		.content-footer {
			.time {
				font-family: PingFang SC;
				font-size: 13px;
				font-weight: normal;
				line-height: 18px;
				letter-spacing: normal;
				color: #585E6D;
				margin-top:5px;
			}
		}
	}
	.footer {
		display:flex;
		flex-direction: row-reverse;
		.right {
			display:flex;
		}
	}
}
.addCard {
	font-family: PingFang SC;
	font-size: 13px;
	font-weight: normal;
	line-height: 18px;
	letter-spacing: normal;
	color: #1F2938;
}
.cutHour {
	font-family: PingFang SC;
	font-size: 13px;
	font-weight: normal;
	line-height: 18px;
	letter-spacing: normal;
	color: #1F2938;
	/* 50  */ 
	font-family: PingFang SC; 
	font-weight: 500; 
	font-size: 13px;
	font-variation-settings: "opsz" auto;
	
	/* 小时 */ 
	font-family: PingFang SC; 
	font-weight: 400; 
	font-size: 13px;
	font-variation-settings: "opsz" auto;

}
.placeOrder {
	font-family: PingFang SC;
	font-size: 13px;
	font-weight: normal;
	line-height: 18px;
	letter-spacing: normal;
	color: #585E6D;
}
.eletro {
	font-family: PingFang SC;
	font-size: 13px;
	font-weight: normal;
	line-height: 18px;
	letter-spacing: normal;
	color: #1F2938;
}
</style>