import order from './order.js';

export function apiOrder(pageNum, pageSize, type) {
	let isAborted = false;//是否取消
	let timer = null;
	const promise = new Promise((resolve, reject)=>{
		timer = setTimeout(()=>{
			if (isAborted) {
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
				// 先筛选出对应type的数据
				const typeList = order.filter(item => {
					return item.type == type
				})
				if (typeList.length === 0) {
					resolve(data)
					return;
				}
				// 根据pageSize和pageNum做分页处理
				for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
					if (i > typeList.length) break;
					data.list.push(typeList[i])
				}
				// 汇总数据
				data.totalCount = typeList.length;
				data.totalPage = Math.ceil(typeList.length/pageSize);
				data.hasNext = pageNum < data.totalPage;
				resolve(data);
			} catch(e){
				console.log(e);
			}

		}, 1000);

	})
	
	promise.abort = () => {
	   if (isAborted) return;
	   isAborted = true;
	   if (timer) {
	     clearTimeout(timer);
	     timer = null;
	   }
	 };
	return promise
}