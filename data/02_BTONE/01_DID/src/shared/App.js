import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	Splash,
	Login,
	Main,
	Order,
	Order11,
	Order12,
	Order22,
	Order44,
	Order55,
	Payment,
	Payment_saving,
	Payment_option,
	Payment_option_case,
	Payment_option_case_ant,
	Payment_coupon,
	Payment_point,
	Payment_face,
	Payment_face_ant,
	Payment_face_kakao,
	Payment_pay_ant,
	Payment_pay,
	Payment_kakaopay,
	Payment_receipt,
	Payment_completion,
	Payment_fail,
	Disable,
} from 'pages';
import 'assets/js/common.js';
import 'assets/css/common.scss';
import Menu from 'components/Menu';



const App = () => {

	return (
		<>
			<Menu />
			<Route exact path="/" component={Login} />
			<Route path="/splash" component={Splash} />
			<Route path="/main" component={Main} />
			<Route path="/order" component={Order} />
			<Route path="/order11" component={Order11} />
			<Route path="/order12" component={Order12} />
			<Route path="/order22" component={Order22} />
			<Route path="/order44" component={Order44} />
			<Route path="/order55" component={Order55} />
			<Switch>
				<Route exact path="/payment" component={Payment} />
				<Route path="/payment/payment_saving" component={Payment_saving} />
				<Route path="/payment/payment_option" component={Payment_option} />
				<Route path="/payment/payment_option_case" component={Payment_option_case} />
				<Route path="/payment/payment_option_case_ant" component={Payment_option_case_ant} />
				<Route path="/payment/payment_coupon" component={Payment_coupon} />
				<Route path="/payment/payment_point" component={Payment_point} />
				<Route path="/payment/payment_face" component={Payment_face} />
				<Route path="/payment/payment_face_ant" component={Payment_face_ant} />
				<Route path="/payment/Payment_face_kakao" component={Payment_face_kakao} />
				<Route path="/payment/payment_pay_ant" component={Payment_pay_ant} />
				<Route path="/payment/payment_pay" component={Payment_pay} />
				<Route path="/payment/payment_kakaopay" component={Payment_kakaopay} />
				<Route path="/payment/payment_receipt" component={Payment_receipt} />
				<Route path="/payment/payment_completion" component={Payment_completion} />
				<Route path="/payment/payment_fail" component={Payment_fail} />
			</Switch>
			<Route path="/disable" component={Disable} />
		</>
	)
}

export default App;
