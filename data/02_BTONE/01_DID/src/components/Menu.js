import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

//임시 메뉴
const Menu = () => {
	const [menuVisible, setMenuVisible] = useState('')

	const menuToggle = () => {
		if(menuVisible){
			setMenuVisible('')
		}else{
			setMenuVisible('active')
		}
	}

	return (
		<div id="menu" className={menuVisible}>
			<ul>
				<li><NavLink exact to="/splash" activeClassName="active">스플래시</NavLink></li>
				<li><NavLink exact to="/" activeClassName="active">로그인</NavLink></li>
				<li><NavLink to="/main" activeClassName="active">메인</NavLink></li>
				<li><NavLink to="/order" activeClassName="active">주문</NavLink></li>
				<li><NavLink to="/order11" activeClassName="active">주문리스트 그리드 1*1</NavLink></li>
				<li><NavLink to="/order12" activeClassName="active">주문리스트 그리드 1*2</NavLink></li>
				<li><NavLink to="/order22" activeClassName="active">주문리스트 그리드 2*2</NavLink></li>
				<li><NavLink to="/order44" activeClassName="active">주문리스트 그리드 4*4</NavLink></li>
				<li><NavLink to="/order55" activeClassName="active">주문리스트 그리드 5*5</NavLink></li>
				<li>
					<ul>
						<li><NavLink to="/payment/payment_saving" activeClassName="active">주문알림/포인트적립</NavLink></li>
						<li><NavLink to="/payment/payment_option" activeClassName="active">결제방법</NavLink></li>
						<li><NavLink to="/payment/payment_option_case" activeClassName="active">결제방법-포인트없을때</NavLink></li>
						<li><NavLink to="/payment/payment_option_case_ant" activeClassName="active">주문완료</NavLink></li>
						<li><NavLink to="/payment/payment_coupon" activeClassName="active">쿠폰사용</NavLink></li>
						<li><NavLink to="/payment/payment_point" activeClassName="active">포인트사용</NavLink></li>
						<li><NavLink to="/payment/payment_face" activeClassName="active">안면인식 등록</NavLink></li>
						<li><NavLink to="/payment/payment_pay" activeClassName="active">신용카드 결제</NavLink></li>
						<li><NavLink to="/payment/payment_pay_ant" activeClassName="active">삼성/LG페이 결제</NavLink></li>
						<li><NavLink to="/payment/payment_kakaopay" activeClassName="active">카카오페이 결제</NavLink></li>
						<li><NavLink to="/payment/payment_receipt" activeClassName="active">결제완료 영수증</NavLink></li>
						<li><NavLink to="/payment/payment_completion" activeClassName="active">결제완료 메인이동</NavLink></li>
						<li><NavLink to="/payment/payment_fail" activeClassName="active">결제실패</NavLink></li>
					</ul>
				</li>
				<li><NavLink to="/disable" activeClassName="active">사용불가 페이지</NavLink></li>
			</ul>
			<button className="btnToggle" onClick={menuToggle}>메뉴</button>
		</div>
	);
};

export default Menu;