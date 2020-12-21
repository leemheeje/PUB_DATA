import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { RegExpFormat } from 'regexp';

// //COMPONENTS
import UiLink from 'components/UiLink'
import MyNoticeDetail from 'pages/notice/MyNoticeDetail';

//STYLES
import 'assets/css/myNotice.scss';

const MyNotice = () => {
    let { noticeDetail } = useParams();

    const notice_list = [			//테스트를 위한 값입니다 초기값은 [] 입니다.
		{
            link: '#;',
            category: '공지사항',
            title : `2020년 4월 무이자 할부 카드혜택 안내`,
            date : 20200422,
            description : `안녕하세요, PICK오더입니다`,
		},
		{
            link: '#;',
            category: '공지사항',
            title : `2020년 4월 이벤트 안내`,
            date : 20200420,
            description : `안녕하세요, PICK오더입니다`,
        },
        {
            link: '#;',
            category: '공지사항',
            title : `금융결제원 금융공동망 시스템점검 안내 (4/18(토) 00시 ~ 4/19(일) 06시)`,
            date : 20200417,
            description : `안녕하세요, PICK오더입니다`,
        },
        {
            link: '#;',
            category: '공지사항',
            title : `개인정보처리방침 일부 변경에 관한 안내`,
            date : 20200415,
            description : `안녕하세요, PICK오더입니다`,
        },
        {
            link: '#;',
            category: '공지사항',
            title : `개인정보처리방침 변경에 관한 안내`,
            date : 20200401,
            description : `안녕하세요, PICK오더입니다`,
        },
        {
            link: '#;',
            category: '뉴스',
            title : `2020년 제8회 대한민국브랜드대상 서비스명 대상 수상`,
            date : 20200301,
            description : `안녕하세요, PICK오더입니다`,
        },
        {
            link: '#;',
            category: '공지사항',
            title : `금융결제원 금융공동망 시스템점검 안내 (2/18(토) 00시 ~ 2/19(일) 06시)`,
            date : 20200210,
            description : `안녕하세요, PICK오더입니다`,
        },
    ]

    const [listId, setListId] = useState(0) // 리스트 페이지 index State
    const handlerListClick = (idx) => {
        setListId(idx)
    }

	return (
		<div className="container mynotice">
            <div className="myNoticeWrap">
                {noticeDetail == listId ?
                <MyNoticeDetail list={notice_list[listId]} />
                :
                <ul className="myNoticeList">
                    {
                        notice_list.map((list, index) => {
                            return (
                                <li className="list" key={index}>
                                    <UiLink className="init lst" to={`/notice/` + index} onClick={() => handlerListClick(index)}>
                                        <div className="tit">
                                            <span>[{list.category}]</span> <span>{list.title}</span>
                                        </div>
                                        <div className="date roboto">{RegExpFormat(list.date, 'date')}</div>
                                        <div className="btnArrow">
											<img src={require(`assets/images/common/icoArrowGray_22.png`)} alt=""/>
										</div>
                                    </UiLink>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            </div>
		</div>
	)
}
export default MyNotice;
