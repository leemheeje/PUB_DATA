/**
 * 핸드폰번호 데이타:{values.phoneNumber}
 * 인원수 데이타:{values.numPeopleCheck}
 * 현재 웨이팅 번호:{values.currentWaitingNumber}
 * 앞에 대기중인 팀 수:{values.currentWaitingTeamCount}
 * 앞에 대기중인 팀 수:{values.currentWaitingTeamMinute}
*/
import React, { useState, useEffect } from 'react';
import './assets/css/common.scss';
import './assets/css/landing.scss';
import './assets/css/info.scss';
import './assets/css/disable.scss';
import 'react-custom-scrollbar/lib/react-custom-scrollbar.css';
import { CustomScrollBar } from 'react-custom-scrollbar';
import { RegExpFormat } from './regexp';

/* COMPONENTS */
import UiButton from './components/UiButton';
import UiModal from './components/UiModal';

/* 약관 */
import PolicyPersonal from './components/PolicyPersonal';
import PolicyService from './components/PolicyService';

const initialState = {
	phoneNumber: [],
	landingPageVisible: true,		//랜딩페이지 Show&Hide
	stepPhoneNumber: true,
	numPeopleCheck: 1,				//웨이팅 인원체크시 초기 값
	stepNumPeopleCheck: false,
	numPeopleMinCheck: 1,			//웨이팅 인원체크시 최소 값
	numPeopleMaxCheck: 10,		//웨이팅 인원체크시 최대 값(null이면 무제한)
	modalWaitingResult: false,
	currentWaitingNumber: 0,		//현재 웨이팅번호 (실제 웨이팅신청하면 받게되는 번호)
	currentWaitingTeamCount: 0,		//현재 웨이팅 수
	currentWaitingTeamMinute: 26,	//현재 웨이팅 수에 따른 대기시간(분)
	landingPageType: 'image' 		//image || video 랜딩페이지의 배경을 이미지로쓰는지 비디오로 사용하는지 체크
}
const copyrightState = {
	modalCopyright: false,
	modalCopyrightGubun: true
}
let timer = null;


//마스킹 처리 컴포넌트
const PhoneSpan = ({ value }) => {
	return (
		<span>{value}</span>
	)
}

function App() {

	const [values, setValues] = useState(initialState); // 기본값 세팅
	const [copyright, setCopyright] = useState(copyrightState); //약관 노출
	const [originalNumber, setOriginalNumber] = useState([0]); //원본 번호 배열
	const [phoneResult, setPhoneResult] = useState(''); //원본 번호 배열 합침
	const [phoneMask, setPhoneMask] = useState([0]); //마스킹 처리 번호
	const [submitAble, setSubmitAble] = useState(false); // 약관체크 + 번호 10자리 이상 체크
	const [timeCount, setTimeCount] = useState(5); // 5초 타이머
	const [loading, setLoading] = useState(''); // 로딩모션 노출 
	const [tableDisabled, setTableDisabled] = useState(''); // 사용불가 페이지 노출 
	const [service, setService] = useState(''); // 사용불가 페이지 노출 

	//번호입력
	const numberInput = (e) => {
		if (originalNumber.length < 9) {
			let num = e.target.value;
			setOriginalNumber(originalNumber => ([...originalNumber, num]))
		}
	};

	//번호 10자리 이상 입력시 입력버튼 활성화
	useEffect(() => {
		//agreePhoneCheck();
		if (originalNumber.length >= 8) {
			setSubmitAble(true);
		} else {
			setSubmitAble(false);
		}
	}, [originalNumber]);

	//번호 마스킹 처리 ( 앞번호 01은 고정 )
	useEffect(() => {
		setValues({ ...values, phoneNumber: '01' + originalNumber.join("") }); //원본번호 저장 

		let mask = originalNumber.map((value, i) => {
			if (originalNumber.length - 1 === i) {
				return value;
			} else {
				return value = '*';
			};
		})

		mask[0] = originalNumber[0]; // 마스킹 미처리

		setPhoneMask(mask)
	}, [originalNumber]);


	// 5초후 팝업 닫힘
	useEffect(() => {
		if (timeCount === 0) {
			setValues({
				...values,
				modalWaitingResult: false,
			});
		}
	}, [timeCount]);

	//번호지우기
	const numberDel = (e) => {
		setOriginalNumber(originalNumber.slice(0, originalNumber.length - 1))
	};

	// 번호 전체 지우기
	const numberClear = (e) => {
		setOriginalNumber([])
	};

	//입력 버튼
	const handleKeyNumSubmit = (event) => {
		setValues({
			...values,
			stepPhoneNumber: false,
			modalWaitingResult: false,
			stepNumPeopleCheck: true,
		});
	}

	//인원수 체크
	const handleNumPeopleCheck = ins => {
		let ins_v = values.numPeopleCheck + ins;
		if (ins_v < values.numPeopleMinCheck) {
			alert(`최저 인원수 ${values.numPeopleMinCheck}명이 안됩니다.`);
			return;
		}
		if (values.numPeopleMaxCheck && ins_v > values.numPeopleMaxCheck) {
			alert(`최대 인원수 ${values.numPeopleMaxCheck}명이 넘습니다.`);
			return;
		}
		setValues({
			...values,
			modalWaitingResult: false,
			numPeopleCheck: ins_v
		});
	}

	//웨이팅 번호 확인
	const handleNumPeopleComplete = () => {
		setValues({
			...values,
			modalWaitingResult: true,
			currentWaitingNumber: values.currentWaitingNumber + 1
		});

		setLoading('');
	}



	//약관 제거
	const removePolicy = () => {
		setService('');
	}

	//이용약관, 개인정보 처리방침 노출
	const handleModalCopyright = gubun => {
		setValues({
			...values,
			modalWaitingResult: false
		});
		setCopyright({
			...copyright,
			modalCopyright: true,
		});

		if (gubun) {
			setService(
				<>
					<div className="multiLogin copyrightWrap">
						<div className="tit">서비스 이용약관</div>

						<CustomScrollBar
							allowOuterScroll={false}
							heightRelativeToParent="19.5rem"
							onScroll={() => { }}
							addScrolledClass={true}
							freezePosition={false}
							handleClass="inner-handle"
							minScrollHandleHeight={38}
						>
							<PolicyService></PolicyService>
						</CustomScrollBar>

					</div>
					<button onClick={() => { setCopyright(copyrightState); removePolicy() }}>확인</button>
				</>
			)
		} else {
			setService(
				<>
					<div className="multiLogin copyrightWrap">
						<div className="tit">개인정보처리방침</div>

						<CustomScrollBar
							allowOuterScroll={false}
							heightRelativeToParent="19.5rem"
							onScroll={() => { }}
							addScrolledClass={true}
							freezePosition={false}
							handleClass="inner-handle"
							minScrollHandleHeight={38}
						>
							<PolicyPersonal></PolicyPersonal>
						</CustomScrollBar>

					</div>
					<button onClick={() => { setCopyright(copyrightState); removePolicy() }}>확인</button>
				</>
			)
		}
	}


	//메인 광고영상 비율적용
	const fullVideo = () => {
		let width = window.innerWidth;
		let pWidth = null;
		let height = window.innerHeight;
		let pHeight = null;
		let styles = {};
		if (width / (16 / 9) < height) {
			pWidth = Math.ceil(height * (16 / 9));
			styles = {
				width: `${pWidth}px`,
				height: `${height}px`,
				left: `${(width - pWidth) / 2}px`,
				top: 0
			};
		} else {
			pHeight = Math.ceil(width / (16 / 9));
			styles = {
				width: `${width}px`,
				height: `${pHeight}px`,
				left: 0,
				top: `${(height - pHeight) / 2}px`
			};
		}
		return styles;
	}


	//로딩 모션 노출
	const loadingMotion = () => {
		setLoading(true);
	};

	useEffect(() => {
		if (loading) {
			var circle01 = document.getElementById('circle01');
			var circle02 = document.getElementById('circle02');
			var circle03 = document.getElementById('circle03');
			var circle04 = document.getElementById('circle04');
			var myTimer = document.getElementById('myTimer');
			var interval = 7;
			var angle01 = 0;
			var angle02 = 0;
			var angle03 = 0;
			var angle04 = 0;
			var circleStart2 = true;
			var circleStart3 = true;
			var circleStart4 = true;
			var angle_increment = 6;

			var timer01 = setInterval(function () {
				circle01.setAttribute("stroke-dasharray", angle01 + ", 10000");
				myTimer.innerHTML = parseInt(angle01 / 1080 * 100);
				if (angle01 >= 1080) {
					clearInterval(timer01);
					document.querySelector('.loadingCircle').classList.add("end");
					setTimeout(function () {
						handleNumPeopleComplete();
					}, 1000)
				}
				if (angle01 >= 200 && circleStart2) {
					circleStart2 = false;
					circleStep2()
				}
				angle01 += angle_increment;
			}, interval)

			function circleStep2() {
				var timer02 = setInterval(function () {
					circle02.setAttribute("stroke-dasharray", angle02 + ", 10000");
					if (angle02 >= 360) {
						clearInterval(timer02);
					}
					if (angle02 >= 200 && circleStart3) {
						circleStart3 = false;
						circleStep3()
					}
					angle02 += angle_increment;
				}, interval)
			}

			function circleStep3() {
				var timer03 = setInterval(function () {
					circle03.setAttribute("stroke-dasharray", angle03 + ", 10000");
					if (angle03 >= 360) {
						clearInterval(timer03);
					}
					if (angle03 >= 200 && circleStart4) {
						circleStart4 = false;
						circleStep4()
					}
					angle03 += angle_increment;
				}, interval)
			}
			function circleStep4() {
				var timer04 = setInterval(function () {
					circle04.setAttribute("stroke-dasharray", angle04 + ", 10000");
					if (angle04 >= 360) {
						clearInterval(timer04);
					}
					if (angle04 >= 330) {
						document.querySelector('.loadingCircle').classList.add("checkVisible");
					}

					angle04 += angle_increment;
				}, interval)
			}
		}
	}, [loading])

	return (
		<div className="App">
			{/* <div className="">STEP01 - 핸드폰번호 데이타:{values.phoneNumber}</div>
			<div className="">STEP02 - 인원수 데이타:{values.numPeopleCheck}</div>
			<div className="">STEP03 - 현재 웨이팅 번호:{values.currentWaitingNumber}</div> */}
			{/* 랜딩페이지:S */}
			{
				values.landingPageVisible
				&&
				<div id="main">
					<div className="in">
						{
							values.landingPageType === 'image'
								?
								<div className="adBox image" style={{
									backgroundImage: `url(${require('./assets/images/landingSample.jpg')})`
								}}> </div>
								: values.landingPageType === 'video'
									?
									<div className="fullBox video">
										<video style={fullVideo()} className="mainFullVideo" autoPlay loop muted> <source src={require('./assets/images/videoSample.mp4')} type="video/mp4" /> </video>
									</div>
									: ''
						}
						<div className="btnMain">
							<button onClick={() => setValues({
								...values,
								landingPageType: 'image'
							})}>이미지넣은 랜딩</button><br />
							<button onClick={() => setValues({
								...values,
								landingPageType: 'video'
							})}>영상넣은 랜딩</button><br />
							<button onClick={() => setTableDisabled(true)}
							>사용불가 노출</button>
							<div className="inner">
								<UiButton className="btns shadow red bold lg" onClick={() => setValues({
									...values,
									landingPageVisible: false,
								})}>시작하기</UiButton>
							</div>
						</div>
					</div>
				</div>
			}

			{/* 랜딩페이지:E */}
			<div className="contents">
				<div className="layoutLeft">
					<div className="informationArea">
						<UiButton className="infoLinkBtn" title="메인" onClick={() => {
							//랜딩페이지 활성화 제외&현재웨이팅번호, 모든값 초기화
							setValues({
								...initialState,
								currentWaitingNumber: values.currentWaitingNumber,
							});
							setOriginalNumber([0]);
							setPhoneResult('');
							setPhoneMask([0]);
							setSubmitAble(false);
							setTimeCount(5);
						}} />
						<div className="infoInner">
							<div className="infHd">
								<div className="tit">화포식당 학동점</div>
								<div className="stit">휴대폰 번호를 입력하시면 웨이팅 알림을 보내드립니다.</div>
							</div>
							<div className="infMd">
								<ul className="lst">
									<li className="tp tp0">
										<span className="lb">현재 웨이팅</span>
										<div className="vl"><span className="roboto">{RegExpFormat(values.currentWaitingTeamCount, 'comma')}</span>팀</div>
									</li>
									<li className="tp tp1">
										<span className="lb">예상 대기시간</span>
										<div className="vl"><span className="roboto">{values.currentWaitingTeamMinute}</span>분</div>
									</li>
								</ul>
							</div>
							<div className="infFt">
								<div className="cp">
									예상 대기시간은 매장 상황에 따라 변동될 수 있습니다.<br />입장 안내 3분 이내에 방문하지 않으면 자동 취소됩니다.
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="layoutRight">
					<div className="rightArea">

						<div className="rightTab">
							<div className={`no1 ${values.stepPhoneNumber ? 'active' : ''}`}>
								{values.stepPhoneNumber ?
									<img src={`${require('./assets/images/icoPhone.png')}`} alt="" />
									:
									<img src={`${require('./assets/images/icoPhoneOff.png')}`} alt="" />
								}
							</div>
							<div className={`no2 ${values.stepNumPeopleCheck ? 'active' : ''}`}>
								{values.stepNumPeopleCheck ?
									<img src={`${require('./assets/images/icoPersonnel.png')}`} alt="" />
									:
									<img src={`${require('./assets/images/icoPersonnelOff.png')}`} alt="" />
								}
							</div>
						</div>

						<div className="rightContents">

							{/* stepPhoneNumber */}
							<div className={`stepPhoneNumber ${values.stepPhoneNumber ? 'active' : 'hide'}`}>
								<div className="inner">

									<div className="numberForm">
										<div className="numberScreen roboto">
											<span>0</span>
											<span>1</span>
											{phoneMask.map((value, idx) => {
												return <PhoneSpan value={value} key={idx} />
											})}
										</div>
										<div className="hiddenNumber">
											<input type="hidden" value={phoneResult} maxLength="11" disabled />
										</div>

										<div className="agreeWrap">
											{/* <label htmlFor="chk"></label>
											<input type="checkbox" id="chk" defaultChecked={values.checkCopyright} onChange={event => handleCheckbox(event)} /> */}
											<div className="agreeBox">
												<a href="#;" className="" onClick={() => handleModalCopyright(true)}>이용약관</a>
												<span>과 </span>
												<a href="#;" className="" onClick={() => handleModalCopyright(false)}>개인정보처리방침</a>
												<span>에 동의합니다.</span>
											</div>
										</div>

										<div className="numberList">
											<ul>
												<li><button value="1" onClick={numberInput}>1</button></li>
												<li><button value="2" onClick={numberInput}>2</button></li>
												<li><button value="3" onClick={numberInput}>3</button></li>
												<li><button value="4" onClick={numberInput}>4</button></li>
												<li><button value="5" onClick={numberInput}>5</button></li>
												<li><button value="6" onClick={numberInput}>6</button></li>
												<li><button value="7" onClick={numberInput}>7</button></li>
												<li><button value="8" onClick={numberInput}>8</button></li>
												<li><button value="9" onClick={numberInput}>9</button></li>
												<li className="btnClear"><button value="C" onClick={numberClear}>전체 지우기</button></li>
												<li><button value="0" onClick={numberInput}>0</button></li>
												<li className="btnDelete"><button value="D" onClick={numberDel}><img src={`${require('./assets/images/icoDelete.png')}`} alt="" /></button></li>
											</ul>
										</div>

										<div className={`btnSubmit ${submitAble}`}>
											<button value="D" onClick={submitAble ? handleKeyNumSubmit : undefined}>입력</button>
										</div>
									</div>
								</div>
							</div>


							{/* stepNumPeopleCheck */}
							<div className={`stepNumPeopleCheck ${values.stepNumPeopleCheck ? 'acitve' : 'hide'}`}>
								<div className="inner">

									<div className="peopleWrap">
										<div className="title">총 인원</div>
										<div className="peopleBox">
											<UiButton onClick={() => handleNumPeopleCheck(-1)} className="btnNum btnMinus" disabled={values.numPeopleCheck === values.numPeopleMinCheck}>-</UiButton>
											<input type="hidden" value={values.numPeopleCheck} />
											<span className="nm">{values.numPeopleCheck}</span>
											<UiButton onClick={() => handleNumPeopleCheck(1)} className="btnNum btnPlus" disabled={values.numPeopleCheck === values.numPeopleMaxCheck}>+</UiButton>
										</div>

										<div className="btnWrap">
											<UiButton onClick={() => setValues({
												...values,
												stepPhoneNumber: true,
												stepNumPeopleCheck: false,
												numPeopleCheck: 1,
											})} className="btn white btnPrev">이전</UiButton>
											<UiButton onClick={loadingMotion} className="btn red bold btnOk">완료</UiButton>
										</div>
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<UiModal isOpen={values.modalWaitingResult} modalWaiting onAfterCallback={() => {
				if (timer) clearInterval(timer);

				timer = setInterval(() => {
					setTimeCount(timeCount => timeCount - 1);
				}, 1000);

			}} offAfterCallback={() => {
				setValues({
					...initialState,
					currentWaitingNumber: values.currentWaitingNumber
				});
				setTimeCount(5);
				clearInterval(timer);
				setPhoneMask([0]);
				setOriginalNumber([0]);

			}}>
				<div className="waitingTit">웨이팅 번호</div>
				<div className="waitingNum roboto">{values.currentWaitingNumber}</div>
				<div className="waitingTxt">
					웨이팅 현황을 휴대폰 알림으로 알려드립니다. <br />
					해당 화면은 <span><span className="time">{timeCount}</span>초</span> 뒤 자동으로 닫힙니다.
				</div>
			</UiModal>
			<UiModal isOpen={copyright.modalCopyright}>
				{
					<>
						{service}
					</>
				}

			</UiModal>

			{/* 사용불가안내페이지:S */}
			{tableDisabled &&
				<div id="disable">
					<div className="in">
						<div className="disableBox">
							<div className="icon"><img src={`${require('./assets/images/icoDisable.png')}`} alt="" /></div>
							<div className="title">사용 불가</div>
							<div className="text txt2">현재 일시적으로 사용 할 수 없습니다</div>
						</div>
					</div>
				</div>
			}
			{/* 사용불가안내페이지:E */}

			{/* 완료 모션:S */}
			{loading &&
				<div className="loadingCircle">
					<div className="cont">
						<div className="in">
							<div className="lineBox no1">
								<svg className="circle01" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="56" id="circle01" fill="none" stroke="#ffd02a" strokeWidth="0.8" strokeDasharray="0,50000" />
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="56" fill="none" stroke="#f4f4f4" strokeWidth="0.75" strokeDasharray="360,50000" />
								</svg>
							</div>
							<div className="lineBox no2">
								<svg className="circle02" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="56" id="circle02" fill="none" stroke="#ffd02a" strokeWidth="1.1" strokeDasharray="0,50000" />
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" version="1.5" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="56" fill="none" stroke="#f4f4f4" strokeWidth="1.5" strokeDasharray="360,50000" />
								</svg>
							</div>
							<div className="lineBox no3">
								<svg className="circle03" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="55" id="circle03" fill="none" stroke="#ffd02a" strokeWidth="3" strokeDasharray="0,50000" />
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="55" fill="none" stroke="#f4f4f4" strokeWidth="3" strokeDasharray="360,50000" />
								</svg>
							</div>
							<div className="lineBox no4">
								<svg className="circle04" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 114 114" preserveAspectRatio="none">
									<circle cx="57" cy="57" r="55" id="circle04" fill="none" stroke="#ffd02a" strokeWidth="3" strokeDasharray="0,50000" />
								</svg>
							</div>
							<div className="icoCheck">
								<div className="circle">
									<div className="ico"></div>
								</div>
							</div>
							<div className="borderLine">
								<span className="border01"></span>
								<span className="border02"></span>
								<span className="border03"></span>
							</div>
						</div>
						<div className="text">
							<p>웨이팅 접수 중입니다.</p>
							<div><em id="myTimer">0</em><span className="percent">%</span></div>
						</div>
					</div>
				</div>
			}
			{/* 완료 모션:E */}


		</div>
	);
}

export default App;
