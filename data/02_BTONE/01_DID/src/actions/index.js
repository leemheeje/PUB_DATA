export const LOGIN ='LOGIN';

export function login(idValue,pwValue) {
	return {
		type : LOGIN,
		userId : idValue,
		userPw : pwValue,
	};
}
