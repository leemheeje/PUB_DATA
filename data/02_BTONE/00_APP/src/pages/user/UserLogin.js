import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/userLogin.scss';

const UserLogin = () => {
	const [userPhoneNumber, setUserPhoneNumber] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userNumberPasswordConfirm, setUserNumberPasswordConfirm] = useState('');
	const [snsLoginLength, setSnsLoginLength] = useState(3);
	return (
		<>
			<div className={`container userLoginWrap snslogin${snsLoginLength}`}>
				<button onClick={() => setUserNumberPasswordConfirm(true)}>로그인버튼 클릭시 휴대폰번호&비밀번호가 맞지않을때</button><br />
				<button onClick={() => setSnsLoginLength(4)}>소셜계정4개</button>
				<div className="userLogin">
					<div className="innerWrap">
						<div className="logo">
							<img src={require('assets/images/common/logo.png')} alt="" />
						</div>
						<div className="logInputArea">
							<div className="uiRow">
								<div className="uiCol12">
									<div className="icoInput phone">
										<img src={require(`assets/images/common/icoPhone.png`)} className="icos" alt=""/>
										<UiInput
											type="tel"
											pattern="[0-9]{3}-[*0-9]{4}-[*0-9]{4}"
											placeholder="휴대폰 번호 (  -  없이 번호만 입력해주세요)"
											onChange={event => setUserPhoneNumber(event.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="uiRow MT45">
								<div className="uiCol12">
									<div className="icoInput lock">
									<img src={require(`assets/images/common/icoLock.png`)} className="icos" alt=""/>
										<UiInput type="password"
											placeholder="비밀번호"
											pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,16}$"
											onFailureMessage={userNumberPasswordConfirm} //로그인버튼 클릭시 아이디&비밀번호가 맞지않다면 true : false
											failureMessage="휴대폰 번호 또는 비밀번호를 다시 확인하세요"
											onChange={event => setUserPassword(event.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="uiRow MT75">
								<div className="uiCol5">
									<UiInput type="checkbox" id="check1" label="자동 로그인" />
								</div>
								<div className="uiCol7">
									<UiInput type="checkbox" id="check2" label="아이디 저장" />
								</div>
							</div>

							<div className="uiRow MT45">
								<div className="uiCol12">
									<UiButton disabled={userPhoneNumber && userPassword ? false : true}>로그인</UiButton>
									<div className="infText">
										<UiLink className="init textLink" to="/user/userIdentity/password"><span className="colorGray">비밀번호를 잊으셨나요?</span></UiLink>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div className="relativeBottom">
				<div className="userLoginSns">
					<div className="innerWrap">
						<div className="uiRow">
							<div className="uiCol12">
								{
									snsLoginLength === 3
										?
										<ul className="antLoginList">
											<li className="tp">
												<UiButton className="init antLogin">
													<span className="icos kakao"><img src={require(`assets/images/common/icoSnsKakao.png`)} alt=""/></span>
													<div className="txts">카카오 계정 로그인</div>
												</UiButton>
											</li>
											<li className="tp">
												<UiButton className="init antLogin">
													<span className="icos naver"><img src={require(`assets/images/common/icoSnsNaver.png`)} alt=""/></span>
													<div className="txts">네이버 계정 로그인</div>
												</UiButton>
											</li>
											<li className="tp">
												<UiButton className="init antLogin">
													<span className="icos google"><img src={require(`assets/images/common/icoSnsGoogle.png`)} alt=""/></span>
													<div className="txts">구글 계정 로그인</div>
												</UiButton>
											</li>
										</ul>
										: snsLoginLength === 4
											?
											<ul className="antLoginList">
												<li className="tp">
													<UiButton className="init antLogin">
														<span className="icos kakao"><img src={require(`assets/images/common/icoSnsKakao.png`)} alt=""/></span>
														<div className="txts">카카오 계정 로그인</div>
													</UiButton>
												</li>
												<li className="tp">
													<UiButton className="init antLogin">
														<span className="icos naver"><img src={require(`assets/images/common/icoSnsNaver.png`)} alt=""/></span>
														<div className="txts">네이버 계정 로그인</div>
													</UiButton>
												</li>
												<li className="tp">
													<UiButton className="init antLogin">
														<span className="icos google"><img src={require(`assets/images/common/icoSnsGoogle.png`)} alt=""/></span>
														<div className="txts">구글 계정 로그인</div>
													</UiButton>
												</li>
												<li className="tp">
													<UiButton className="init antLogin">
														<span className="icos apple"><img src={require(`assets/images/common/icoSnsApple.png`)} alt=""/></span>
														<div className="txts">Apple 계정 로그인</div>
													</UiButton>
												</li>
											</ul>
											: ''
								}

								<div className="infText">
									<UiLink className="init textLink" to="/user/userRegister/step1">
										<span className="colorBlack">아직 회원이 아닌신가요?</span> <span className="colorRed">회원가입</span>
									</UiLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default UserLogin;