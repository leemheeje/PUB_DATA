/**
 * 오토하이픈
 * default 값은 010-1234-1234 
 * case는 작업하면서 추가적으로 선언
 * 함수형으로 불러와야하면 이벤트바인딩은 onChange 이벤트객체 전달
 * 기본적으로 -,숫자 만 입력가능
 */
export const RegExpFormat = (event = null, format = null) => {
	if (typeof event === 'undefined') return false;
	let regexp = '';
	let replaceValue = '';
	switch (format) {
		case 'comma':
			//30,000,000
			regexp = /\B(?=(\d{3})+(?!\d))/g;
			replaceValue = ',';
			break;
		case 'date':
			//2017-11-10
			regexp = /([0-9]{4})([0-9]{2})([0-9]{2})/;
			replaceValue = '$1-$2-$3';
			break;
		default:
			//010-1234-1234
			regexp = /^(01[0|1|6|8|9]{1})([0-9]{3,4})([0-9]{4})/;
			replaceValue = '$1-$2-$3';
			break;
	}
	let val = '';
	if (typeof event === 'string' || typeof event === 'number') {
		if (typeof event === 'number') {
			val = String(event).replace(regexp, replaceValue);
		}else{
			val = event.replace(/[-\D]/g, '').replace(regexp, replaceValue);
		}
	} else {
		val = event.target.value;
		event.target.value = val.replace(/[-\D]/g, '').replace(regexp, replaceValue)
	}
	return val ? val : false;
};
