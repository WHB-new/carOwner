import order from './order.js';

export function apiOrder(pageNum, pageSize) {
	let isAborted = false;//是否取消 模拟
	let timer = null;
	const promise = new Promise((resolve, reject)=>{
		timer = setTimeout(()=>{
			if (isAborted) {
			  // 已经取消，不再 resolve，而是 reject 取消错误
			  reject({ name: 'AbortError', message: '请求已取消（模拟）' });
			  return;
			}
			try {
				let data = {
					list: [], // 数据列表
					totalCount: 0, // 总数量
					totalPage: 0, // 总页数
					hasNext: false // 是否有下一页
				}
				for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
					if (i > order.length) break;
					data.list.push(order[i])
				}
				// 汇总数据
				console.log(data, 'data数据');
				data.totalCount = data.list.length;
				data.totalPage = Math.ceil(100/pageSize);
				data.hasNext = pageNum < data.totalPage;
				resolve(data);
			} catch(e){
				console.log(e);
			}
			
			 promise.abort = () => {
			    if (isAborted) return;
			    isAborted = true;
			    if (timeoutId) {
			      clearTimeout(timeoutId);
			      timeoutId = null;
			    }
			  };
		}, 1000);
	})
	return promise
}