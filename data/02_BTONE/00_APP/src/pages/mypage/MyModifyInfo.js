import React, { useState, useEffect } from 'react';
import { RegExpFormat } from 'regexp';
import { useHistory } from 'react-router';

//COMPONENTS
import UiProfile from 'components/UiProfile'
import UiInput from 'components/UiInput'
import UiSelect from 'components/UiSelect'
import UiButton from 'components/UiButton'
import UiLink from 'components/UiLink'

//STYLES
import 'assets/css/myPage.scss';
import 'assets/css/userIdentity.scss';

const MyModifyInfo = () => {

	const history = useHistory();
	const [loginCheck, setLoginCheck] = useState(true) // 로그인 체크
	const [defaultProfile, setDefaultProfile] = useState(false) //프로필 이미지 State
	const [profileThumbnailSource, setProfileThumbnailSource] = useState('') //프로필 이미지 State


	const phoneNumber = '01044****87'
	const [myPhoneNumber, setMyPhoneNumber] = useState(phoneNumber)

	const [nicnameCheck, setNicnameCheck] = useState('') // 닉네임
	const [userPassword, setUserPassword] = useState(''); // 새 비밀번호 체크
	const [userPasswordConfirm, setUserPasswordConfirm] = useState(false); // 새 비밀번호 확인 체크
	const [userPasswordConfirmValidityCheck, setUserPasswordConfirmValidityCheck] = useState(''); // 새 비밀번호 일치할때 State
	const [userNewPasswordCheck, setUserNewPasswordCheck] = useState(''); // 일치한 새 비밀번호 내용 State
	const [genderCheck, setGenderCheck] = useState(''); // 성별 선택
	const [ageCheck, setAgeCheck] = useState(0); // 연령 선택
	const [areaCheck, setAreaCheck] = useState(0); // 시/도 선택
	const [areaCheck2, setAreaCheck2] = useState(0); // 시/군/구 선택
	const [areaCheck3, setAreaCheck3] = useState(0); // 읍/면/동 선택

	useEffect(() => {
		var nicNameInit = document.querySelector('input[name=nicname]').value;
		setNicnameCheck(nicNameInit)
	}, [nicnameCheck])

	return (
		<div className="container mypage">
			<div className="myModifyWrap">
				<div className="profileBox">
					<div className="profileBoxInner">
						<div className="profileImgArea">
							<div className="profileImgBox">
								<UiProfile thumbnail={profileThumbnailSource} loginCheck={loginCheck} defaultProfile={defaultProfile} />
							</div>
							{
								profileThumbnailSource ?
									<img src={`${require('assets/images/common/icoCircleClose_35.png')}`} alt="" className="profileDelete" onClick={() => setProfileThumbnailSource('')} />
									: undefined
							}
						</div>

						<div className="btnChange">
							<UiButton className="init" onClick={() => { }}>프로필 사진 변경</UiButton>
						</div>
						<UiInput type="file" id="asdf" onChange={(filename, filepath) => {
							setProfileThumbnailSource(filepath);
						}} />
					</div>
				</div>
				<div className="nicknameBox">
					<div className="topTxts">
						<div className="tit">닉네임</div>
					</div>
					<UiInput type="text" name="nicname" defaultValue="5524" onChange={(event) => { setNicnameCheck(event.target.value) }} />
				</div>
				<div className="phoneNumberBox">
					<div className="topTxts">
						<div className="tit">휴대폰 번호</div>

						<div className="btnChange">
							<UiLink to="/user/userModifyPhone" className="init">
							휴대폰 번호 변경
							<img src={require(`assets/images/common/icoArrowGray_22.png`)} alt=""/>
							</UiLink>
						</div>
					</div>
					<UiInput type="text" defaultValue={RegExpFormat(myPhoneNumber)} className="roboto" readOnly />
				</div>
				<div className="newPasswordBox">
					<div className="topTxts">
						<div className="tit">새 비밀번호</div>
						<div className="stit">8 - 16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요</div>
					</div>
					<div className="passwordBox">
						<div className="list">
							<UiInput
								type="password"
								placeholder="새 비밀번호 (8-16자 영문+숫자, 영문+특수문자)"
								maxlength="16"
								pattern="\S{8,16}"
								onChange={(event) => { setUserPassword(event.target.value); }}
							/>
						</div>
						<div className="list">
							<UiInput
								type="password"
								placeholder="새 비밀번호 확인"
								maxlength="16"
								pattern={`${userPassword}`}
								onFailureMessage={userPasswordConfirmValidityCheck === false}
								failureMessage="일치하지 않습니다. 다시 입력해주세요"
								onChange={event => {
									let { value } = event.target;
									if (!value) {
										setUserPasswordConfirmValidityCheck('');
										setUserPasswordConfirm(false);
										setUserNewPasswordCheck('')
										return;
									}
									if (userPassword === value) {
										setUserPasswordConfirmValidityCheck(true);
										setUserPasswordConfirm(true);
										setUserNewPasswordCheck(value)
									} else {
										setUserPasswordConfirmValidityCheck(false);
										setUserPasswordConfirm(false);
										setUserNewPasswordCheck('')
									}
								}}
							/>
						</div>
					</div>
				</div>
				<div className="genderBox">
					<div className="topTxts">
						<div className="tit">성별</div>
					</div>
					<div className="genderRadio">
						<div className="list">
							<UiInput type="radio" name="gender" id="m" label="남자" onChange={e => { setGenderCheck(e.target.id); }} />
						</div>
						<div className="list">
							<UiInput type="radio" name="gender" id="w" label="여자" onChange={e => { setGenderCheck(e.target.id); }} checked />
						</div>
					</div>
				</div>
				<div className="ageBox">
					<div className="topTxts">
						<div className="tit">연령대</div>
					</div>
					<UiSelect onChange={e => { setAgeCheck(e.target.value); }}>
						<option value="">연령대 선택</option>
						<option value="1">10대</option>
						<option value="2">20대</option>
						<option value="3">30대</option>
						<option value="4">40대</option>
						<option value="5">50대</option>
						<option value="6">60대</option>
						<option value="7">70대 이상</option>
					</UiSelect>
				</div>
				<div className="areaBox">
					<div className="topTxts">
						<div className="tit">자주 이용하는 지역</div>
					</div>
					<div className="select">
						<div className="list area1">
							<UiSelect onChange={e => { setAreaCheck(e.target.value); }}>
								<option value="">시 / 도</option>
								<option value="1">서울특별시</option>
								<option value="2">경기도</option>
								<option value="3">광주광역시</option>
								<option value="4">대구광역시</option>
								<option value="5">대전광역시</option>
								<option value="6">부산광역시</option>
								<option value="7">인천광역시</option>
								<option value="8">제주특별자치도</option>
							</UiSelect>
						</div>
						<div className="list area2">
							<UiSelect type="select" onChange={e => { setAreaCheck2(e.target.value); }}>
								<option value="">시 / 군 / 구</option>
								<option value="1">서귀포시</option>
							</UiSelect>
						</div>
						<div className="list area3">
							<UiSelect type="select" onChange={e => { setAreaCheck3(e.target.value); }}>
								<option value="">읍 / 면 / 동</option>
								<option value="1">서호동</option>
							</UiSelect>
						</div>
					</div>
				</div>

				<UiButton
					disabled={!nicnameCheck
						|| !userNewPasswordCheck
						|| !genderCheck
						|| !genderCheck
						|| !ageCheck
						|| !areaCheck
						|| !areaCheck2
						|| !areaCheck3
						? true : false} onClick={() => history.push('/mypage')}>완료</UiButton>

				<div className="btnWithdraw">
					<UiLink to="/mypage/myWithdraw/step1" className="init">회원탈퇴</UiLink>
				</div>
			</div>
		</div>
	)
}
export default MyModifyInfo;