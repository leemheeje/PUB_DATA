import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiLink from 'components/UiLink'

//STYLES
import 'assets/css/myNotice.scss';

const MyHistoryDetail = ({
	list = [],
}) => {
	return (
		<div className="myHistoryDetail">
            <div className="topArea">
                <div className="storeService">
                        <div className={
                            list.store_service === '포장주문' ? 'icon icon1'
                            :
                            list.store_service === '예약' ? 'icon icon2'
                            :
                            list.store_service === '줄서기' ? 'icon icon3'
                            :
                            list.store_service === '테이블주문' ? 'icon icon4'
                            : 'icon icon5'
                            }></div>
                        <div class="service">{list.store_service}</div>
                    </div>
                <div className="storeName">
                    <div>{list.store_name}</div>
                    {
                        list.store_service === '예약' ?
                        <div className="reservState">예약대기</div>
                        : undefined
                    }
                </div>
                <ul className="infoList">
                    <li class="reservation">
                        <span className="tit">예약번호</span> 200211-1123
                    </li>
                    <li class="date">
                        <span className="tit">신청일시</span> <span>{RegExpFormat(list.date, 'date')}</span>
                    </li>
                </ul>
            </div>
            {
                list.store_service === '예약' ?
                <>
                    <div className="middleArea">
                        <div className="subTitle">예약 내역</div>
                        <div className="descArea">
                            <ul className="infoList">
                                <li>
                                    <span className="tit">방문일시</span>
                                    <span className="desc">2020.04.18토요일 오후 12:30</span>
                                </li>
                                <li>
                                    <span className="tit">방문인원</span>
                                    <span className="desc"></span>
                                </li>
                                <li>
                                    <span className="tit">좌석 선택</span>
                                    <span className="desc"></span>
                                </li>
                                <li>
                                    <span className="tit">예약자명</span>
                                    <span className="desc"></span>
                                </li>
                                <li>
                                    <span className="tit">연락처</span>
                                    <span className="desc"></span>
                                </li>
                                <li>
                                    <span className="tit">요청사항</span>
                                    <span className="desc">
                                    3살짜리 아이가 있어서 유아용 의자 부탁드려요 <br />
                                    유모차 들어갈 수 있도록 옆 자리랑 간격이 떨어져있
                                    었으면 좋겠습니다
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="btnTableOrder">
                        <UiLink className="init" to="/notice/index">
                            <span className="icon"></span><span>테이블주문 바로가기</span>
                        </UiLink>
                    </div>
                </>
                : list.store_service === '포장주문' ?
                <>
                    <div className="middleArea">
                        <div className="subTitle">주문 내역 (건)</div>
                        <div className="descArea">
                            <ul className="infoList">
                                <li>
                                </li>
                            </ul>
                        </div>

                        <div className="subTitle">사용 혜택</div>
                    </div>
                </>
                : list.store_service === '키오스크'?
                <>
                    키오스크1
                </>
				:''
            }
			<div className="bottomArea">
                {
                    list.store_service === '예약' ?
                    <ul className="infoList">
                        <li><span className="tit">예약금</span> <span className="price">3,000원</span></li>
                        <li><span className="tit">결제금액</span> <span className="price">3,000원</span></li>
                    </ul>
                    :
                    <ul className="infoList">
                        <li><span className="tit">주문금액</span> <span className="price">3,000원</span></li>
                        <li><span className="tit">할인금액</span> <span className="price">3,000원</span></li>
                        <li><span className="tit">결제금액</span> <span className="price">3,000원</span></li>
                    </ul>
                }
                <div className="btnWrap">
                    <div className="btnCancel">
                        <UiLink className="outline shadowNone" to="/notice/index">예약 취소</UiLink>
                    </div>
                    <div className="btnReceipt">
                        <UiLink className="outline red shadowNone" to="/notice/index">전자영수증</UiLink>
                    </div>
                </div>
            </div>
		</div>
	)
}
export default MyHistoryDetail;