import React, { useState, useEffect } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiButton from 'components/UiButton';
import UiLink from 'components/UiLink';
import UiInfoListCategory from 'components/UiInfoListCategory';

//STYLES
import 'assets/css/myLocation.scss';

const MyLocation = ({
	...props
}) => {
	const [registRecentSearch, setRegistRecentSearch] = useState([]); //최근검색목록
	const [searchInputValue, setSearchInputValue] = useState(''); //검색어
	const [viewRecentResult, setViewRecentResult] = useState(true); //최근검색어
	const [viewSearchResult, setCiewSearchResult] = useState(false); //검색어결과
	const [viewSearchResultNull, setCiewSearchResultNull] = useState(false); //검색어결과없을때
	const handlerSearchSubmit = value => { //검색버튼 누를때
		console.log(value); //컴포넌트에서 넘어오는 검색어 값
		console.log(searchInputValue); //페이지내에서 불러오는 검색어 값
	}

	return (
		<div className="container">
			<button onClick={() => setViewRecentResult(false)}>최근검색어없을때</button>
			<button onClick={() => {
				setCiewSearchResult(true);
				setViewRecentResult(false);
			}}>검색어결과</button>
			<button onClick={() => setCiewSearchResultNull(true)}>검색어결과없을때</button>
			<div className="myLocation">
				<div className="mylTop">
					<div className="innerWrap">
						<div className="tit">주소 검색</div>
						<div className="mylInp MT20">
							<UiInput type="search" placeholder="예)도로명 123 또는 건물명 아파트" onChange={(event) => {
								setSearchInputValue(event.target.value);
							}} bindSearchSubmit={value => handlerSearchSubmit(value)} />
						</div>
						<div className="btnsWrap MT40">
							<UiLink to="/location/myLocationSetting">현 위치로 주소 설정</UiLink>
						</div>
					</div>
				</div>
				<div className="mylCot">
					{/* 최근검색주소:S */}
					{
						viewRecentResult
						&&
						<div className="recentResult">
							<div className="cate">
								<UiInfoListCategory>최근 검색 주소</UiInfoListCategory>
							</div>
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
										<UiButton className="init listDelete">
											<img src={require(`assets/images/common/icoSearchClose.png`)} alt="삭제"/>
										</UiButton>
									</div>
								</li>
							</ul>
						</div>
					}
					{/* 최근검색주소:E */}
					{/* 검색결과:S */}
					{
						viewSearchResult
							?
							<div className="searchResult">
								{
									!viewSearchResultNull
										?
										<>
											<div className="cate">
												<UiInfoListCategory>'강남대로' 검색결과 입니다.</UiInfoListCategory>
											</div>
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
										</>
										:
										<div className="resultNull">
											<div className="rltInner">
												<div className="tit">
													<img src={require(`assets/images/common/icoNoList.png`)} alt=""/>
													검색 결과가 없습니다
												</div>
												<div className="stit">다시 입력해주세요</div>
											</div>
										</div>
								}
							</div>
							: ''
					}
					{/* 검색결과:E */}
				</div>
			</div>
		</div >
	)
}
export default MyLocation;