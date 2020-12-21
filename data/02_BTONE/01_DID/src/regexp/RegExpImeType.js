/**
 * @params event = DOM onChagne 함수의 이벤트를 전달
 * @params options 객체리터럴 ime 선언 
 * 					ime 기본값 number (ko,en,etc특수문자(공란X,엔터X))
 * 					ime 기본값외에 추가선언은 dom에서 직접
					<input type="text" onChange={event => {RegExpImeType(event, ime:/[0-9]/g);}} />
 * 					
 */
export const RegExpImeType = (event = null, options = { ime: 'number' }) => {
	if (!event) return false;
	let regexp = '';
	switch (options.ime) {
		case 'number':
			regexp = /\D/g
			break;
		case 'ko':
			regexp = /[^ㄱ-ㅎㅏ-ㅣ가-힣]/g
			break;
		case 'en':
			regexp = /[^a-zA-Z]/g
			break;
		case 'etc':
			regexp = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s\n]/g
			break;
		default:
			regexp = options.ime;
			break;
	}

	let val = '';
	if (typeof event === 'string' || typeof event === 'number') {
		val = event.val.replace(regexp, '');
	} else {
		val = event.target.value;
		event.target.value = val.replace(regexp, '');
	}
	return val ? val : false;
}