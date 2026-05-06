import order from './order.js';

export function apiOrder(pageNum, pageSize) {
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
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
		}, 1000);
	})
}