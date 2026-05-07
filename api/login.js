import newRequest from "../utils/request";
export const getSmsCode = (phone) => {
	const options = {
		url:'/sms/sendSmsCode',
		data: {
			phone
		}
	}
	return newRequest(options);
}
export const loginOrRegister = ({phone,smsCode,bizId,appType = 30}) => {
	const options = {
		url:'/common/loginBySms',
		method:'POST',
		data: {
			phone,
			smsCode,
			bizId,
			appType
		}
	}
	return newRequest(options);
}

export const getUserInfo =  () => {
	const options = { 
		url:'/user/mobUserInfo',
	}
	return newRequest(options)
}