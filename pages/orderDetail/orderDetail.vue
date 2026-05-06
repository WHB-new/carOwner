<template>
	<view class='page safe-bottom'>
		<view class="main">
			<view class="back" @click="handleBack">
				<view class="icon">
					<u-icon 
					name='arrow-left' 
					size='20'
					color="#585E6D"></u-icon>
				</view>
				<view class="txt">
					返回
				</view>
			</view>
			<view class='detailList'>
				<orderInfo v-for="item in orderInfoList" :key="item.id" :list='item'></orderInfo>
			</view>
		</view>
	</view>
</template>

<script>
	import orderInfo from '@/components/orderInfo/orderInfo.vue'
	import adImg from '@/static/ad.png'
	export default {
		data() {
			return {
				orderInfoList:[
					{
						id:1,
						title:'电站信息',
						infoList:[
							{
								label:'设备厂商',
								value:'特来电股份'
							},
							{
								label:'电站名称',
								value:'深圳前海控股大厦充电站'
							},
							{
								label:'设备编号',
								value:1402086476487151617
							}
						]
					},
					{
						id:2,
						title:'充电信息',
						infoList:[
							{
								label:'充电枪头编号',
								value:'5A0010037oP5G000311'
							},
							{
								label:'充电量',
								value:9.67
							},
							{
								label:'开始时间',
								value:'2023-10-12 12:23:23'
							},
							{
								label:'结束时间',
								value:'2023-10-12 12:23:23'
							}
						]
					},
					{
						id:3,
						title:'支付信息',
						type:'eletro',
						infoList:[
							{
								label:'总电费',
								value:10.65
							},
							{
								label:'总服务费',
								value:7.25
							}
						]
					},
					{
						id:4,
						title:'停车信息',
						infoList:[
							{
								label:'车场名称',
								value:'前海大厦'
							},
							{
								label:'车牌号码',
								value:'粤B12321'
							},
							{
								label:'停车时长',
								value:'2小时30分'
							},
							{
								label:'进场时间',
								value:"2023-10-12 12:23:45"
							},
							{
								label:'出场时间',
								value:"2023-10-12 12:23:45"
							}
						],
						img:[
							{
								label:'入场记录',
								value:adImg,
							},
							{
								label:'出场记录',
								value:adImg
							}
						]
					}
				],
				currentIndex:0,// 点击返回保留tabs
				orderIndex:0,
			};
		},
		methods: {
			handleBack() {
				this.$u.route({
					type:'navigateBack',
					params: {
						index:this.currentIndex,
						orderIndex: this.orderIndex
					}
				})
			}
		},
		onLoad(params) {
			this.currentIndex = params.tabCurrent ? params.tabCurrent : 0;
			this.orderIndex = params.orderCurrent ? params.orderCurrent : 0
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
	.main {
		padding: 0 12px 50px 12px;
		flex:1;
		background-color: #F5F6F7;
		.back {
			display:flex;
			align-items: center;
			height: 36px;
			.icon {
				width: 14px;
				height: 22px;
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
				margin-bottom:3px;
			}
		}
		.detailList {
		}
	}
}
</style>