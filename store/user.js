import { getUserInfo as apiUserInfo, getSmsCode as apiSmsCode } from "../api/login"
const state = () => ({
  userInfo: {
	  
  },
  bizId:'',
  userPhone:'',
})
const actions = {
	// 获取用户信息
	getUserInfo({commit,state}){
		// 防止userInfo存在时重复发送请求
		if (Object.keys(state.userInfo).length !== 0) return;
		apiUserInfo().then((res)=>{
			if (res.code === 0 && res.data) {
				commit('GET_USERINFO', res.data)
			}
		}).catch(err=>{
			console.log(err)
		})
	},
	// 获取验证码
	async getSmsCode({commit, state}) {
		let res = await apiSmsCode(state.userPhone);
		console.log(state.userPhone, res)
		if (res.code === 0 && res.data) {
			commit('GET_SMSCODE', res.data.bizId)
		}
	},
	// 当点击获取验证码时保存用户手机方便出错后重新发送验证码
	saveUserPhone({commit}, userPhone) {
		commit('SAVE_USERPHONE', userPhone)
	}
}

const mutations = {
    GET_USERINFO(state, item) {
		state.userInfo = item
	},
	GET_SMSCODE(state, item) {
		state.bizId = item
	},
	SAVE_USERPHONE(state, item) {
		state.userPhone = item
	}
}

export default {
	state,
	actions,
	mutations,
	namespaced:true,
}