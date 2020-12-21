/**
 * @params event = DOM onChagne 함수의 이벤트를 전달
 * 			min 초기값 0 
 * 			max 선언안할시 min ~ 문자열끝까지 slice 
 */
export const RegExpLimitLength = (event = null, min = 0, max = null) => {
	if (!event) return false;
	let val = typeof event === 'string' || typeof event === 'number' ? event : event.target.value;
	let returnValue = false;
	if (max === null) {
		event.target.value = val.slice(min);
		returnValue = event.target.value;
	}
	if (min < max) {
		event.target.value = val.slice(min, max);
		returnValue = event.target.value;
	}
	return returnValue;
}