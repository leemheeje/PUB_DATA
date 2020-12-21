import React, { useState, useEffect } from 'react';

//COMPONENTS
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/myOrderWaiting.scss';
let timer;
const MyOrderWaitingState = ({
	history,
	...props
}) => {
	const [limitSecond, setLimitSecond] = useState(180);
	const handlerCancelWaiting = () => {
		history.push('/payment/paymentcompletion/waiting');
	}
	const handlerWaitingReload = () => {
	}
	if (timer) clearInterval(timer);
	timer = setInterval(() => {
		setLimitSecond(limitSecond - 1);
		if (limitSecond - 1 === 0) {
			handlerLimitSecond();
			clearInterval(timer);
			return;
		}
	}, 1000);
	const handlerLimitSecond = () => {
		alert('시간초과');
	}

	return (
		<div className="container">
			<div className="myOrderWaiting">
				<div className="innerWrap">
					<div className="mywsCnt">
						<div className="gtit">
							빈체로 파스타 안산 중앙점
							<div className="pint">
								입장해주세요
								<span className="sinf">
									<img src={require(`assets/images/common/icoCircleError.png`)} alt=""/>
									{Math.floor(limitSecond / 60)} : {
									limitSecond % 60 == 0
										? `00`
										: limitSecond % 60 < 10
											? `0${limitSecond % 60}`
											: limitSecond % 60
								} 후 자동 취소됩니다
								</span>
							</div>
						</div>
						<div className="mrcont MT85">
							<div className="mrt MB20" onClick={() => handlerWaitingReload()}>
								<img src={require(`assets/images/common/icoReload_26.png`)} alt=""/>
								새로고침
							</div>
							<div className="inner">
								<div className="lst">
									<div className="ltp">
										<div className="lb">내 앞 대기팀</div>
										<div className="vl">
											<span className="roboto">00</span>팀
										</div>
									</div>
									<div className="ltp">
										<div className="lb">예상 대기시간</div>
										<div className="vl">
											<span className="roboto">00</span>분
										</div>
									</div>
								</div>

							</div>
						</div>
						<div className="mylst">
							<div className="mytp lg">
								<span className="lb">고객님의<br /> 줄서기 번호</span>
								<div className="vl roboto strong">13</div>
							</div>
							<div className="mytp">
								<span className="lb">방문 인원</span>
								<div className="vl">2명</div>
							</div>
							<div className="mytp">
								<span className="lb">접수 시간</span>
								<div className="vl">2020. 04. 18 토요일   오후 12 : 30</div>
							</div>
						</div>
						<div className="inf">
							입력하신 <span className="strong">휴대폰 번호</span>로 줄서기 안내 메시지를 보내드립니다<br />
								입장 안내 <span className="strong">3</span>분 이내에 방문하지 않으면 줄서기 접수가 자동 취소됩니다
						</div>
					</div>
					<div className="mywsFot MT135">
						
						<div className="btnWrap">
							<UiButton disabled={false} className="outline shadowNone" onClick={() => handlerCancelWaiting()}>줄서기 취소</UiButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default MyOrderWaitingState;