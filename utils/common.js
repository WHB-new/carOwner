export const throttle = (fn, delay) => {
	let last = 0;//上一次时间
	return function(...args) {
		const now = Date.now();
		if (now - last > delay) {
			last = now;
			return fn.apply(this, args)
		}
	}
}