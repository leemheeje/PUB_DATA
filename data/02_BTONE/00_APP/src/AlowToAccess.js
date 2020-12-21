import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

//CSSTransition.types
import { CSSTransitionTypes } from './CSSTransitionTypes';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiModal from 'components/UiModal';

//PAGES
import AlowToAccessCopyright1 from './AlowToAccessCopyright1';
import AlowToAccessCopyright2 from './AlowToAccessCopyright2';
import AlowToAccessCopyright3 from './AlowToAccessCopyright3';

//STYLES
import 'assets/css/alowToAccess.scss';

const AlowToAccess = ({
	bindClickAlowToAccess = () => { },
	...props
}) => {
	const history = useHistory();
	const query = new URLSearchParams(useLocation().search);
	const [isCheckboxValidityCheck1, setIsCheckboxValidityCheck1] = useState(false);
	const [isCheckboxValidityCheck2, setIsCheckboxValidityCheck2] = useState(false);
	const [isCheckboxValidityCheck3, setIsCheckboxValidityCheck3] = useState(false);
	return (
		<>
			<div className="container alowToAccessWrap">
				<div className="alowToAccess">
					<div className="innerWrap">
						<div className="ataTop">
							<div className="tit">환영합니다!</div>
							<div className="stit">편리한 <strong className="strong COLOR_RED">PICK오더</strong> 사용을 위해<br /> <strong className="strong">동의가 필요한 항목</strong>을 안내해드립니다</div>
						</div>
						<div className="ataCont MT110">
							<div className="alArea">
								<UiInput type="checkbox" id="chkAll" onChange={event => {
									setIsCheckboxValidityCheck1(event.target.checked);
									setIsCheckboxValidityCheck2(event.target.checked);
									setIsCheckboxValidityCheck3(event.target.checked);
								}} checked={
									isCheckboxValidityCheck1 && isCheckboxValidityCheck2 && isCheckboxValidityCheck3
										? true
										: false
								} label={(<strong className="strong">전체 동의합니다</strong>)} />
							</div>

							<div className="chkArea MT45">
								<UiInput type="checkbox" id="alwChk1" onChange={event => setIsCheckboxValidityCheck1(event.target.checked)} checked={isCheckboxValidityCheck1} label={(<><strong className="strong">PICK오더 이용약관 동의</strong> (필수)</>)} />
								<div className="subj">PICK오더 서비스를 이용하는데 필요한 기본 약관을 안내합니다</div>
								<UiButton className="init btns" onClick={() => history.push('?alowToAccess1=true')}>자세히보기 <img src={require(`assets/images/common/icoArrowGray_22.png`)} alt="" /></UiButton>
							</div>

							<div className="chkArea MT45">
								<UiInput type="checkbox" id="alwChk2" onChange={event => setIsCheckboxValidityCheck2(event.target.checked)} checked={isCheckboxValidityCheck2} label={(<><strong className="strong">위치기반서비스 이용약관 동의</strong> (필수)</>)} />
								<div className="subj">내 주변 매장 추천 및 검색 기능을 위해 이용자의 위치정보를 이용합니다</div>
								<UiButton className="init btns" onClick={() => history.push('?alowToAccess2=true')}>자세히보기 <img src={require(`assets/images/common/icoArrowGray_22.png`)} alt="" /></UiButton>
							</div>

							<div className="chkArea MT45">
								<UiInput type="checkbox" id="alwChk3" onChange={event => setIsCheckboxValidityCheck3(event.target.checked)} checked={isCheckboxValidityCheck3} label={(<><strong className="strong">PICK오더 혜택 알림 동의</strong> (선택)</>)} />
								<div className="subj">쿠폰 발급, 포인트 적립, 이벤트 소식 등 PICK오더의 다양한 혜택을 전달합니다</div>
								<UiButton className="init btns" onClick={() => history.push('?alowToAccess3=true')}>자세히보기 <img src={require(`assets/images/common/icoArrowGray_22.png`)} alt="" /></UiButton>
							</div>

						</div>

					</div>
				</div>
			</div>
			<div className="relativeBottom">
				<div className="innerWrap ">
					<UiButton to="/" disabled={
						!isCheckboxValidityCheck1 || !isCheckboxValidityCheck2
							? true
							: false
					} className="" onClick={() => bindClickAlowToAccess(true)}>다음</UiButton>
				</div>
			</div>
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('alowToAccess1') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="이용약관">
					<AlowToAccessCopyright1
						checked={isCheckboxValidityCheck1}
						bindClickConfirmBtn={() => {
							setIsCheckboxValidityCheck1(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('alowToAccess2') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="이용약관">
					<AlowToAccessCopyright2
						checked={isCheckboxValidityCheck2}
						bindClickConfirmBtn={() => {
							setIsCheckboxValidityCheck2(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>
			<CSSTransition
				{
				...{
					...CSSTransitionTypes.inOutY,
					...{
						in: query.get('alowToAccess3') === 'true',
						onEnter: () => { },
					}
				}
				}
			>
				<UiModal
					bindOnloadCallback={() => console.log('bindOnloadCallback')}
					bindCloseCallback={() => console.log('bindCloseCallback')}
					bindClickCancelBtn={() => { }}
					headerName="혜택 알림">
					<AlowToAccessCopyright3
						checked={isCheckboxValidityCheck3}
						bindClickConfirmBtn={() => {
							setIsCheckboxValidityCheck3(true);
							history.goBack();
						}} />
				</UiModal>
			</CSSTransition>
		</>
	)
}
export default AlowToAccess;
