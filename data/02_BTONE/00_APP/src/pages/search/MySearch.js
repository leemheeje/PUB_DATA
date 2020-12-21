import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiInfoListCategory from 'components/UiInfoListCategory';
import UiButton from 'components/UiButton';
import UiLink from 'components/UiLink';
import UiSorting from "components/UiSorting"

//STYLES
import 'assets/css/mySearch.scss';

const MySearch = () => {
	const handlerRegistListDelete = () => { };
	const [storeListSortType, setStoreListSortType] = useState(0); //1:별점순,2:거리순,3:리뷰많은순,4:신규등록순
	const [viewRecentResult, setViewRecentResult] = useState(true); //최근검색어
	const [viewSearchResult, setCiewSearchResult] = useState(false); //검색어결과
	const [viewSearchResultNull, setCiewSearchResultNull] = useState(false); //검색어결과없을때

	return (
		<div className="container">
			<button onClick={() => setViewRecentResult(false)}>최근검색어없을때</button>
			<button onClick={() => {
				setCiewSearchResult(true);
				setViewRecentResult(false);
			}}>검색어결과</button>
			<button onClick={() => setCiewSearchResultNull(true)}>검색어결과없을때</button>
			<div className="mySearch">
				{/* 최근검색목록:S */}
				{
					viewRecentResult
					&&
					<>
						<div className="mysTop">
							<UiInfoListCategory>
								최근검색
						<div className="rtTp">
									<UiButton className="xs outline inline shadowNone registListDeleteBtn" onClick={handlerRegistListDelete}>전체삭제</UiButton>
								</div>
							</UiInfoListCategory>
						</div>
						<div className="mysCont">
							<ul className="mysRecList">
								<li className="mysTp">
									<div className="innerWrap">
										<div className="tit">ffff</div>
										<UiButton className="init registDeleteBtn">
											<img src={require(`assets/images/common/icoSearchClose.png`)} alt="삭제"/>
										</UiButton>
									</div>
								</li>
							</ul>
						</div>
					</>
				}

				{/* 최근검색목록:E */}
				{/* 검색목록:S */}
				{
					viewSearchResult
						?
						!viewSearchResultNull
							?
							<>
								<div className="mysTop">
									<UiInfoListCategory>
										검색결과 2건
									<div className="rtTp">
											<UiSorting />
										</div>
									</UiInfoListCategory>
								</div>
								<div className="mysCont">
									<div className="mysLocSor">
										<div className="innerWrap">
											<div className="mlInner">
												<UiButton onClick={() => setStoreListSortType(0)} className={`xs inline shadowNone mlSorBtn ${storeListSortType === 0 ? 'red' : 'outline'}`}>거리순</UiButton>
												<UiButton onClick={() => setStoreListSortType(1)} className={`xs inline shadowNone mlSorBtn ${storeListSortType === 1 ? 'red' : 'outline'}`}>별점순</UiButton>
												<UiButton onClick={() => setStoreListSortType(2)} className={`xs inline shadowNone mlSorBtn ${storeListSortType === 2 ? 'red' : 'outline'}`}>리뷰많은순</UiButton>
											</div>
										</div>
									</div>
									<ul className="mysList">

										<li className="mysTp">
											<UiLink className="init mysListInner">
												<div className="innerWrap">
													<div className="tit">반포<strong className="strong">쌀국수</strong> 잠원점</div>
													<ul className="mis">
														<li className="mistp">
															<span className="int roboto">680m</span>
														</li>
														<li className="mistp">
															<span className="int grd roboto">
																4.1
																<img src={require(`assets/images/common/icoStar.png`)} alt=""/>
															</span>
														</li>
														<li className="mistp">
															<span className="int"><small>리뷰</small> <span className="roboto">748</span></span>
														</li>
													</ul>
													<div className="mii">양지쌀국수, 차돌박이쌀국수,곱창쌀국수, 안심쌀국수,양지쌀국수</div>
													<ul className="mic">
														<li className="mictp"><span className="ico tp1"><img src={require(`assets/images/common/icoFuncOn01.png`)} alt=""/> 포장주문</span></li>
														<li className="mictp"><span className="ico tp2"><img src={require(`assets/images/common/icoFuncOn02.png`)} alt=""/>예약</span></li>
														<li className="mictp"><span className="ico tp3"><img src={require(`assets/images/common/icoFuncOn03.png`)} alt=""/>줄서기</span></li>
														<li className="mictp"><span className="ico tp4"><img src={require(`assets/images/common/icoFuncOn04.png`)} alt=""/>테이블주문</span></li>
														<li className="mictp"><span className="ico tp5"><img src={require(`assets/images/common/icoFuncOn05.png`)} alt=""/>키오스크</span></li>
													</ul>
												</div>
											</UiLink>
										</li>

									</ul>
								</div>
							</>
							:
							<ul className="mysList">
								<li className="noResult">
									<div className="innerResult">
										<div className="tit">
											<img src={require(`assets/images/common/icoNoList.png`)} alt=""/>
											검색 결과가 없습니다
										</div>
										<div className="stit">다시 입력해주세요</div>
									</div>
								</li>
							</ul>
						: ''
				}

				{/* 검색목록:E */}
			</div>
		</div >
	)
}
export default MySearch;