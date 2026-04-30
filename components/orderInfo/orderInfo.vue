<template>
	<view class='orderInfo'>
		<view class='title'>
			{{orderInfoList.title}}
		</view>
			<view style='padding:12px 0;'>
				<view class="infoList" v-for="(item, index) in orderInfoList.infoList" :key="index">
						<view class='info-row'>
							<view class='label'>
								{{item.label}}
							</view>
							<view class='detail'>
								{{item.value}}
							</view>
						</view>
				</view>
			</view>
		<view class="infoImg" v-if='isImg'>
			<view class="record" v-for="(item,index) in orderInfoList.img" :key="index">
				<view class="title">
					{{item.label}}
				</view>
				<view class="img">
					<u-image
					:src="item.value"
					width="100%"
					mode="widthFix"
					border-radius="6px">
					</u-image>
				</view>
			</view>
		</view>
		<view v-if='isEletro' class='totalMoney'>
			<view class='intro'>
				累积金额
			</view>
			<view class='total'>
				{{this.total}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"orderInfo",
		props:['list'],
		data() {
			return {
				orderInfoList:this.list,
			};
		},
		computed: {
			// 判断有没有入场照片
			isImg() {
				return this.orderInfoList.img && this.orderInfoList.img.length !== 0
			},
			// 区分是电费还是停车费
			isEletro() {
				return this.orderInfoList.type && this.orderInfoList.type == 'eletro'
			},
			total() {
				return this.isEletro ? this.orderInfoList.infoList.reduce((sum, item) => sum + item.value, 0) : 0
			}
		},
		mounted(){
			console.log(this.isImg)
		}
	}
</script>

<style lang="scss" scoped>
.orderInfo {
	padding:0 12px;
	border-radius: 12px;
	background: #FFFFFF;
	box-sizing: border-box;
	border: 1px solid #FFFFFF;
	margin-bottom:10px;
	.title {
	  padding-top:12px;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: normal;
      color: #1F2938;
	}
	.infoList {
		height: 22px;
		margin-bottom:8px;
		&:last-child {
			margin-bottom:0;
		}
		.info-row {
			height: 22px;
			display:flex;
			align-items: center;
			justify-content: space-between;
			.label {
				font-family: PingFang SC;
				font-size: 14px;
				font-weight: normal;
				line-height: 22px;
				letter-spacing: normal;
				color: #585E6D;
			}
			.detail {
				font-family: PingFang SC;
				font-size: 14px;
				font-weight: normal;
				line-height: 22px;
				text-align: right;
				letter-spacing: normal;
				color: #1F2938;
			}
		}
	}
	.infoImg {
		border-top:1px solid #EAECF0;
		padding:12px 0;
		display:flex;
		align-items: center;
		gap:11px;
		.record {
			flex:1;
			.title {
				font-family: PingFang SC;
				font-size: 13px;
				font-weight: normal;
				line-height: 18px;
				letter-spacing: normal;
				color: #585E6D;
				margin-bottom: 8px;
				padding:0;
			}
			.img {
				width: 100%;
			}
		}
	}
	.totalMoney {
		padding:12px 0;
		border-top:1px solid #EAECF0;
		display:flex;
		align-items: center;
		justify-content: space-between;
		.intro {
			font-family: PingFang SC;
			font-size: 14px;
			font-weight: normal;
			line-height: 22px;
			letter-spacing: normal;
			color: #585E6D;
		}
		.total {
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: 500;
			line-height: 22px;
			letter-spacing: normal;
			color: #1F2938;
			/* ￥ */ 
			font-family: PingFang SC; 
			font-weight: 500; 
			font-size: 12px;
			font-variation-settings: "opsz" auto;
			
			/* 1 */ 
			font-family: PingFang SC; 
			font-weight: 500; 
			font-size: 16px;
			font-variation-settings: "opsz" auto;
			
			/* 7.25 */ 
			font-family: PingFang SC; 
			font-weight: 500; 
			font-size: 16px;
			font-variation-settings: "opsz" auto;

		}
	}
}
</style>