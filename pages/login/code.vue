<template>
	<view style='position:relative;'>
		<view class='back' @click='handleTest'>
			<u-icon
			name="arrow-left"
			color="#585E6D"></u-icon>
		</view>
		<view class="wrap">
			<view class="key-input">
				<view class="title">输入验证码</view>
				<view class="tips">验证码已发送至 +{{maskPhone}}</view>
				<u-message-input :focus="true" :value="smsCode" @finish="finish" @change="change" mode="bottomLine" :maxlength="maxlength"></u-message-input>
				<text :class="{ error: error }">验证码错误，请重新输入</text>
				<view class="captcha">
					<!-- :class="{ regain: !show }" -->
					<text  class='regain' @click='getSmsCodeAgain'>{{ second ? `${second}秒后可以重新获取验证码` : `重新获取验证码`}}</text>
			     <!--  <text :class="{ noCaptcha: !show }" @tap="noCaptcha">收不到验证码点这里</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { loginOrRegister } from '../../api/login';
export default {
	data() {
		return {
			maxlength: 4,
			second:60,
			// show: false,
			error: false,
			smsCode:'',
		};
	},
	computed: {},
	onLoad() {
		// 再次获取验证码倒计时
		let interval = setInterval(() => {
			this.second--;
			if (this.second <= 0) {
				clearInterval(interval);
			}
		}, 1000);
		
		
	},
	methods: {
		handleTest(){
		  uni.redirectTo({
		  	url:'/pages/login/login'
		  })
		},
		// 收不到验证码选择时的选择
		noCaptcha() {
			uni.showActionSheet({
				itemList: ['重新获取验证码', '接听语音验证码'],
				success: function(res) {
					
				},
				fail: function(res) {
					
				}
			});
		},
		getSmsCodeAgain(){
			if (this.second !== 0) return;
			this.$store.dispatch('user/getSmsCode')
			this.second = 60;
			let interval = setInterval(() => {
				this.second--;
				if (this.second <= 0) {
					clearInterval(interval);
				}
			}, 1000);
		},
		change(e){
			this.smsCode = e;
		},
		// 输入完验证码最后一位执行
		async finish() {
			let res = await loginOrRegister({
				phone:this.phone,
				smsCode:this.smsCode,
				bizId:this.bizId,
				appType:'30'
			})
			console.log(res.code, res.data, 'res')
			if(res.code === 0 && res.data){
				const tempPath = uni.getStorageSync('TEMP_PATH')
				uni.setStorageSync('userToken',res.data.accessToken)
				if (tempPath) {
					uni.redirectTo({
						url:tempPath,
						success:()=>{
							uni.removeStorageSync('TEMP_PATH')
						},
						fail:(err)=>{
							uni.reLaunch({
								url:tempPath
							})
						}
					})
				}else {
					uni.switchTab({
						url:'/pages/user/user'
					})
				}

			}else {
				this.error = true;
			}
		}
	},
	computed:{
		phone(){
			return this.$store.state.user.userPhone
		},
		bizId(){
			return this.$store.state.user.bizId
		},
		maskPhone(){
			if (!this.phone || this.phone.length !== 11) return this.phone
			return this.phone.substring(0, 3) + '****' + this.phone.substring(7)
		}
	}
};
</script>

<style lang="scss" scoped>
.back {
	position:absolute;
	left:20rpx;
	top:20rpx
}
.wrap {
	padding: 80rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
