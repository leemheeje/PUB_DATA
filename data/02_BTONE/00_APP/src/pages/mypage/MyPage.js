import React, { useState } from 'react';
import { useHistory } from 'react-router';

//COMPONENTS
import UiProfile from 'components/UiProfile'
import UiLink from 'components/UiLink'
import UiButton from 'components/UiButton'

//STYLES
import 'assets/css/myPage.scss';

const MyPage = () => {
	const history = useHistory();
	const [loginCheck, setLoginCheck] = useState(false) // 로그인 체크

	const [defaultProfile, setDefaultProfile] = useState(false) //프로필 이미지 State
	const [appVersion, setAppVersion] = useState(true) // 현재 버전 표시 State

	const profileChange = () => {
		setDefaultProfile(!defaultProfile)
	}

	return (
		<div className="mypage main">
			<div className="mypageWrap">
				<button onClick={() => setLoginCheck(true)}>로그인</button>
				<button onClick={() => setLoginCheck(false)}>비로그인</button>
				{loginCheck ?
					<>
						{/* 임시버튼 */}
						<button onClick={() => profileChange()}>프로필 변경</button>
						<div className="myProfile">
							<UiLink className="shadowNone goMyModify" to="mypage/myModifyInfo">
								<div className="profileText">
									<div className="welcomeText">어서오세요</div>
									<div className="profileName">
										{
											defaultProfile ?
												<>
													<span className="userName">맛있어서냠냠</span><span className="nim">님</span>
												</>
												:
												<>
													<span className="userName default roboto">5524</span><span className="nim">님</span>
												</>
										}
									</div>
								</div>
								<div className="profileImgBox">
									<UiProfile loginCheck={loginCheck} defaultProfile={defaultProfile} />
								</div>
							</UiLink>
						</div>
						<div className="mypageList01">
							<ul className="list">
								<li className="myBenefit"><UiLink className="shadowNone" to="mypage/myBenefit"><img src={`${require('assets/images/common/icoMyBenefit.png')}`} alt="" /><span>나의 혜택</span></UiLink></li>
								<li className="myReview"><UiLink className="shadowNone" to="mypage/myReview"><img src={`${require('assets/images/common/icoMyReview.png')}`} alt="" /><span>나의 리뷰</span></UiLink></li>
							</ul>
						</div>
					</>
					:
					<div className="loginBox clearfix">
						<div className="profileArea">
							<div className="welcomeText">환영합니다!</div>
							<div className="sTxt">
								로그인하면 더 많은 서비스를 <br />
                            이용할 수 있습니다
                        </div>
							<div className="profileImgBox">
								<UiProfile loginCheck={loginCheck} />
							</div>
						</div>
						<div className="btnWrap">
							<div className="btnLeft">
								<UiLink className="red" to="/user/userLogin">로그인</UiLink>
							</div>
							<div className="btnRight">
								<UiLink text="회원가입" to="/user/userRegister/step1"></UiLink>
							</div>
						</div>
					</div>
				}
				<div className="mypageList02">
					<ul className="list">
						<li><UiLink className="shadowNone" to="mypage/myHistory/index">이용내역</UiLink></li>
						<li><UiLink className="shadowNone" to="mypage/myQuestion"><span className="roboto">1:1</span> 문의</UiLink></li>
						<li><UiLink className="shadowNone" to="notice/index">공지사항</UiLink></li>
						<li><UiLink className="shadowNone" to="mypage/mySetting">환경설정</UiLink></li>
					</ul>
				</div>
				<div className="mypageBottom">
					<ul className="list">
						<li className="version">
							현재 버전 <span className="ver roboto">v1.12.1</span>
							{
								appVersion ?
									<span className="verState">최신 버전</span>
									:
									<span className="verState">업데이트 필요</span>
							}

						</li>
						{
							loginCheck && <li className="btnLogout"><UiButton className="init" onClick={()=>setLoginCheck(false)}>로그아웃</UiButton></li>
						}
					</ul>
				</div>
			</div>
		</div>
	)
}
export default MyPage;