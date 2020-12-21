import React, { useState } from "react";
import UiButton from "components/UiButton"
import UiLink from "components/UiLink"
import UiSorting from "components/UiSorting"
import UiToast from 'components/UiToast';
import UiInput from 'components/UiInput';
import UiCountAddRem from 'components/UiCountAddRem';
import UiReviewGrade from 'components/UiReviewGrade';
import UiScroll from 'components/UiScroll';
import UiSwiper from 'components/UiSwiper';
import UiSwiperFree from 'components/UiSwiperFree';
import KakaoMap from 'components/KakaoMap';
import UiDialog from 'components/UiDialog';
import UiCalendar from 'components/UiCalendar';

//기본슬라이드 이미지

const thumbImgBanner = [require(`../assets/images/thumb/banner1.png`), require(`../assets/images/thumb/banner1.png`), require(`../assets/images/thumb/banner1.png`)]

//프리모드 슬라이드 이미지
const thumbImgBannerFree = [
	{
		link: '#;',
		img: 'banner2.png',
		title: '흑임자슈페너 (Only Iced)',
		text: '달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션 달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
		price: '5,800',
	},
	{
		link: '#;',
		img: 'banner3.png',
		title: '죠리퐁 쉐이크',
		text: '달미 시그니처 / 남녀노소 좋아하는 달콤고소 쉐이크 달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
		price: '5,300',
	},
	{
		link: '#;',
		img: 'banner2.png',
		title: '흑임자슈페너 (Only Iced)',
		text: '달미의 시그니처 크림과 고소한 흑임자의 콜라보레이션',
		price: '5,800',
	},
	{
		link: '#;',
		img: 'banner3.png',
		title: '죠리퐁 쉐이크',
		text: '달미 시그니처 / 남녀노소 좋아하는 달콤고소 쉐이크',
		price: '5,300',
	}
]


const UiKit = (props) => {
	const [dialog, setDialog] = useState(false);
	return (
		<>
			<div className="uiKit">
				<h1>UiKit</h1>
				<h2>1. Button - Type1 <span>import UiButton from "components/UiButton"</span></h2>
				<ul className="uiList">
					<li>
						<div className="tit">비활성화 버튼</div>
						<div className="compo">
							<UiButton text="Noto Sans 35px Bold" disableBtn="disabled"></UiButton>
						</div>
						<div className="code">
							{`<UiButton text="Noto Sans 35px Bold" disableBtn="disabled"></UiButton>`}
						</div>
					</li>
					<li>
						<div className="tit">활성화 버튼</div>
						<div className="compo">
							<UiButton text="Noto Sans 35px Bold"></UiButton>
						</div>
						<div className="code">
							{`<UiButton text="Noto Sans 35px Bold"></UiButton>`}
						</div>
					</li>
					<li>
						<div className="tit">활성화 버튼 ( class추가로 커스텀 )</div>
						<div className="compo">
							<UiButton className="yellowBtn" text="Noto Sans 35px Bold"></UiButton>
						</div>
						<div className="code">
							{`<UiButton className="yellowBtn" text="Noto Sans 35px Bold"></UiButton>`}
						</div>
					</li>
					<li>
						<div className="tit">사이즈별 및 타입별 버튼</div>
						<div className="compo">
							<UiButton className="xs inline red" text="xs inline red"></UiButton>
							<UiButton className="xs inline outline" text="xs inline outline"></UiButton>
							<UiButton className="xs inline outline red" text="xs inline outline red"></UiButton>
							<UiButton className="block shadowNone" text="block shadowNone"></UiButton>
						</div>
						<div className="code">
							{`<UiButton className="xs inline red" text="xs inline red"></UiButton>`}<br />
							{`<UiButton className="xs inline outline" text="xs inline outline"></UiButton>`}<br />
							{`<UiButton className="xs inline outline red" text="xs inline outline red"></UiButton>`}<br />
							{`<UiButton className="block shadowNone" text="block shadowNone"></UiButton>`}
						</div>
					</li>
				</ul>
				<h2>2. Link - Type1<span>import UiLink from "components/UiLink"</span></h2>
				<ul className="uiList">
					<li>
						<div className="tit">비활성화 버튼</div>
						<div className="compo">
							<UiLink text="Noto Sans 35px Bold" to="#;"></UiLink>
						</div>
						<div className="code">
							{`<UiLink text="Noto Sans 35px Bold" to="#;"></UiLink>`}
						</div>
					</li>
					<li>
						<div className="tit">활성화 버튼</div>
						<div className="compo">
							<UiLink text="Noto Sans 35px Bold" to="/member/userLogin"></UiLink>
						</div>
						<div className="code">
							{`<UiLink text="Noto Sans 35px Bold" to="/member/userLogin"></UiLink>`}
						</div>
					</li>
					<li>
						<div className="tit">활성화 버튼 ( class추가로 커스텀 )</div>
						<div className="compo">
							<UiLink className="yellowBtn" text="Noto Sans 35px Bold" to="/member/userLogin"></UiLink>
						</div>
						<div className="code">
							{`<UiLink className="yellowBtn" text="Noto Sans 35px Bold" to="/member/userLogin"></UiLink>`}
						</div>
					</li>
					<li>
						<div className="tit">작은 버튼 ( class추가로 커스텀 )</div>
						<div className="compo">
							<UiLink to="" className="miniWhite" text="25px Bold"></UiLink>
						</div>
						<div className="code">
							{`<UiLink className="miniWhite" text="25px Bold"></UiLink>`}
						</div>
					</li>
				</ul>
				<h2>3. Sorting<span>import UiLink from "components/UiSorting"</span></h2>
				<ul className="uiList">
					<li>
						<div className="compo">
							<UiSorting></UiSorting>
						</div>
						<div className="code">
							{`<UiSorting></UiSorting>`}
						</div>
					</li>
				</ul>


				<h2>
					4. 토스트팝업(컴포넌트형||함수형)
					<span>
						{`import UiToast from 'components/UiToast';`}<br />
						열릴때 시점, 닫힐때 시점 등등 콜백함수는 추후작업<br />
						{`* <UiToast duration={1500}>테스트</UiToast>`}<br />
					</span>
				</h2>
				<ul className="uiList">
					<li>
						<div className="code">
							{`<UiToast duration={1500}>가구구우구구구구</UiToast>`}
						</div>
					</li>
				</ul>
				<h2>
					5. 입력폼요소
					<span>{`import UiInput from 'components/UiInput';`}</span>
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">입력폼</div>
						<div className="compo">
							<UiInput type="text" id="id01" label="이름" placeholder="입력해주세요" />
						</div>
						<div className="code">
							{`<UiInput type="text" id="id01" label="이름" placeholder="입력해주세요"/>`}
						</div>
					</li>
					<li>
						<div className="tit">체크박스</div>
						<div className="compo">
							<UiInput type="checkbox" id="chk01" label="체크박스" />
						</div>
						<div className="code">
							{`<UiInput type="checkbox" id="chk01" label="이름" />`}
						</div>
					</li>
					<li>
						<div className="tit">라디오버튼</div>
						<div className="compo">
							<UiInput type="radio" id="chk02" name="radio01" label="라디오버튼임 체크박스랑 디자인똑같" />
						</div>
						<div className="code">
							{`<UiInput type="checkbox" id="chk01" label="이름" />`}
						</div>
					</li>

				</ul>
				<h2>
					6. 카운터올리기
					<span>{`import UiCountAddRem from 'components/UiCountAddRem';`}</span>
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">카운트 올리고 내리기</div>
						<div className="compo">
							<UiCountAddRem count={1} />
						</div>
						<div className="code">
							{`<UiCountAddRem count={1} />`}
						</div>
					</li>
				</ul>
				<h2>
					7. 별점UI
					<span>{`import UiReviewGrade from 'components/UiReviewGrade';`}</span>
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">별점주는 UI</div>
						<div className="compo">
							<UiReviewGrade fnEventHandlerPoint={(count) => console.log(count)} />
							<UiReviewGrade fnEventHandlerPoint={(count) => console.log(count)} point={2} disabled />
						</div>
						<div className="code">
							{`<UiCountAddRem count={1}/>`}
						</div>
					</li>
				</ul>
				<h2>
					8. 스크롤
					<span>{`import UiScroll from 'components/UiScroll';`}</span>
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">스크롤</div>
						<div className="compo">
							<UiScroll className="agreeScroll">
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤<br />
								약관 스크롤 <br />
							</UiScroll>
						</div>
						<div className="code">
							{`<UiScroll className="agreeScroll">스크롤 내용</UiScroll>`}
						</div>
					</li>
				</ul>
				<h2>
					9. 기본 탭
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">탭</div>
						<div className="compo">
							<ul className="baseTab">
								<li className="active"><span>메뉴</span></li>
								<li><span>매장 정보</span></li>
								<li><span>리뷰</span></li>
							</ul>
						</div>
						<div className="code">
							{`
							<ul className="baseTab">
							<li className="active"><span>메뉴</span></li>
							<li><span>매장 정보</span></li>
							<li><span>리뷰</span></li>
							</ul>
							`}
						</div>
					</li>
				</ul>
				<h2>
					10. 슬라이드
				</h2>
				<ul className="uiList">
					<li>
						<div className="tit">기본 슬라이드 (이미지 배열 필요)</div>
						<div className="compo">
							<UiSwiper imgList={thumbImgBanner}></UiSwiper>
						</div>
						<div className="code">
							{`
							<UiSwiper imgList={thumbImgBanner}></UiSwiper>
							`}
						</div>
					</li>
					<li>
						<div className="tit">자유스크롤 슬라이드 (이미지 배열 필요)</div>
						<div className="compo">
							<UiSwiperFree imgList={thumbImgBannerFree}></UiSwiperFree>
						</div>
						<div className="code">
							{`
							<UiSwiperFree imgList={thumbImgBannerFree}></UiSwiperFree>
							`}
						</div>
					</li>
				</ul>
				<h2>11. 카카오 맵</h2>
				<ul className="uiList">
					<li>
						<KakaoMap type={2} width={'100%'} height={'250px'} markerWidth={27} markerheight={34} />
						<div className="code">
							{`
							<KakaoMap type={지도 타입(1: 기본 or 2: 주소 포함 지도)} width={넓이} height={높이} markerWidth={마커넓이} markerheight={마커높이} />
							`}
						</div>
					</li>
				</ul>
				<h2>12. 팝업(confirm, alert)</h2>
				<ul className="uiList">
					<li>
						<button onClick={() => setDialog(true)}>button</button>
						{dialog && <UiDialog
							type="confirm"
							cancelTextName="취소11"
							confirmTextName="확인122"
							bindClickCancelBtn={() => setDialog(false)}
							bindClickConfirmBtn={() => setDialog(false)}
							bindOnloadCallback={() => console.log('bindOnloadCallback')}
							bindCloseCallback={() => console.log('bindCloseCallback')}
						>confirm</UiDialog>}

						<div className="code">
							☆prop들~<br />
							type = 'alert', //타입설정 alert || confirm<br />
							className = '',<br />
							cancelTextName = '취소',<br />
							confirmTextName = '확인',<br />
							bindClickCancelBtn = () => {}, //취소버튼눌럿을때<br />
							bindClickConfirmBtn = () => {},//확인버튼눌럿을때 <br />
							bindOnloadCallback = () => {}, //처음 팝업 뜰때<br />
							bindCloseCallback = () => {}, //취소 또는 확인 또는 딤드 눌러서 팝업이 닫혔을때<br />
							{`
							<UiDialog type="confirm">confirm</UiDialog>
							`}<br />
							{`
							<UiDialog type="alert(기본값)">alert</UiDialog>
							`}
						</div>
					</li>
				</ul>
				<h2>13. 달력</h2>
				<ul className="uiList">
					<li>
						<div className="code">
							☆prop~<br />
							bindClickDayButton = (yy,mm,dd) => {}, //day칸 누를때<br />
							{`
							<UiCalendar bindClickDayButton={(yy, mm, dd) => console.log(yy, mm, dd)} />
							`}
						</div>
						<UiCalendar bindClickDayButton={(yy, mm, dd) => console.log(yy, mm, dd)} />
					</li>
				</ul>
			</div>
		</>
	)
}
export default UiKit;