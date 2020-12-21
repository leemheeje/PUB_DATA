import React from 'react';

//COMPONENTS
import UiLink from 'components/UiLink';
import KakaoMap from 'components/KakaoMap';

//STYLES
import 'assets/css/myLocation.scss';

const MyLocationSetting = ({
	...props
}) => {

	return (
		<div className="container">
			<div className="myLocationSetting">
				<div className="map">
					<KakaoMap markerWidth={27} markerheight={34} mapstyle={
						{
							width : '100%',
							height : '100%',
						}
					}/>
				</div>
				<div className="info">
					<div className="myLocation">
						<div className="searchResult">
							<ul className="serchList">
								<li className="serchTp">
									<div className="innerWrap">
										<div className="serTxts">
											<div className="tit">경기도 남양주시 퇴10 퇴계원리 210-10 강하마 루 아파트</div>
											<div className="adr">
												<span className="btnType1 xxs inline outline shadowNone adrLabel">도로명</span>
											퇴계원공원1길 3 대민빌딩
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className="innerWrap">
							<UiLink to={
								{
									pathname : '/location',
									options: { isReversTransition: true }
								}
							}>선택한 위치로 설정</UiLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default MyLocationSetting;