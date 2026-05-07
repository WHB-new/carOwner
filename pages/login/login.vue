<template>
	<view class='page safe-bottom'>
		<u-toast ref="uToast" />
		<view class='main'>
			<view class='input'>
				<u-input
				type='number'
				v-model='phone'
				placeholder="请输入手机号"
				:border="true"
				:trim='true'
				maxlength="13"
				:focus="true"
				:clearable='false'></u-input>
			</view>
			<view class='smsCode'>
				<u-input
				type='number'
				v-model="smsCode"
				:border='true'
				placeholder="请输入验证码"
				maxlength="7"
				:trim='true'
				:clearable='false'>
					
				</u-input>
				<u-button
				:custom-style="codeButtonStyle"
				@click.native="handleGetCode"
				size="mini"
				:type="canGetCode && !smsCodeLoading? 'primary' :'default'"
				:disabled='!canGetCode || smsCodeLoading'
				>
					{{!smsCodeLoading? '获取验证码' : `剩余${codeTime}`}}
				</u-button>
			</view>
			<view class='submit'>
				<u-button @click='throttleSubmit'
				size='default'
				type='primary'
				:disabled="!canSubmit">提交</u-button>
			</view>

		</view>
	</view>
</template>

<script>
	import { getSmsCode, loginOrRegister } from '@/api/login.js'
	import { throttle } from '@/utils/common.js'
	export default {
		data() {
			return {
				phone:'',
				smsCode:'',
				codeTime:60,//获取验证码倒计时
				smsCodeLoading:false,
				codeButtonStyle: {
					height:'72rpx',
					marginLeft:'8rpx'
				}
			};
		},
		computed: {
			canGetCode(){
				return this.phone && this.phone.length >10
			},
			canSubmit(){
				return (this.phone && this.phone.length >10) && (this.smsCode && this.smsCode.length >3);
			}
		},
		created(){
			this.throttleSubmit = throttle(this.handleSubmit, 2000)
		},
		methods: {
			async handleGetCode() {
				let timer
				if (!this.canGetCode) {
					this.$refs.uToast.show({
						title:'请先输入手机号',
						type:'warning'
					})
					return;
				};
			  try {
				  let result = await getSmsCode(this.phone);
				  if (result.code !== 0) {
				  	this.$refs.uToast.show({
						title:'获取验证码失败，请重新尝试',
						type:'error'
					});
				  } else {
					  timer = setInterval(()=>{
					  		if (this.codeTime <= 0) {
					  		clearTimeout(timer);
					  		this.smsCodeLoading = false;
					  	    this.codeTime = 60;
					  		return;
					  		}
					  		this.smsCodeLoading = true;
					  		this.codeTime = this.codeTime - 1;
					  }, 1000)
					  if (this.codeTime !== 60) {
					  	this.$refs.uToast.show({
					  		title:`请等待${this.codeTime}秒后再获取`,
					  		type:'warning'
					  	})
					  	return;
					  }
					if (result.data && result.data.bizId) {
						uni.setStorageSync('bizId', result.data.bizId);
					}
				  }
			  } catch (err){
				  this.$refs.uToast.show({
				  	title:'获取验证码失败，请重新尝试',
				  	type:'error'
				  })
			  }
			},

		    async handleSubmit() {
				if (!this.canSubmit) return;
				const bizId = uni.getStorageSync('bizId')
				const options = {
					phone:this.phone,
					smsCode:this.smsCode,
					bizId,
					appType:'30'
				}
				let result = await loginOrRegister(options)
				if (result.code === 0) {
					if (result.data && result.data.accessToken) {
						uni.setStorageSync('userToken',result.data.accessToken)
						const tempPath = uni.getStorageSync('TEMP_PATH');
						this.$refs.uToast.show({
							title:result.data.msg,
							type:'success',
						})
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
						} else {
							uni.switchTab({
							  url: '/pages/index/index'
							})
						}
					} 
				} else {
					this.$refs.uToast.show({
						title:result.data?.msg || result.msg,
						type:'error'
					})
				}
			}
		
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
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	.main {
		width: 200px;
		height: 200px;
		.input {
			width: 100%;
			margin-bottom:15px
		}
		.smsCode {
			width:100%;
			margin-bottom:15px;
			display:flex;
			justify-content: center;
			align-items: center;
		}
		.submit {
			width: 100%;
			display:flex;
			justify-content: center;
			align-items: center;
		}
	}
	}
</style>