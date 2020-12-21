import React, { useState, useEffect } from 'react';

//STYLES
import 'assets/css/uiCalendar.scss';

const UiCalendar = ({
	datepicker,
	bindLoadDayButton = (yy, mm, dd, date) => { },
	bindClickDayButton = (yy, mm, dd, date) => { },
	...props
}) => {

	const [seleteDay, setSeleteDay] = useState('2020-04-14') //디폴트 날짜
	const [seleteDate, setSeleteDate] = useState(3) //디폴트 요일
	const [calendarVisible, setCalendarVisible] = useState(''); //달력 노출 체크


	//달력 노출 처리
	const calendarToggle = () => {
		if (calendarVisible) {
			setCalendarVisible('');
		} else {
			setCalendarVisible('active');
		}
	}


	//활성화 및 날짜변경
	const changeDay = (e) => {

		//날짜 선택
		setSeleteDay(e.target.getAttribute('data-day'));
		setSeleteDate(e.target.getAttribute('data-date'));

		//형제요소 활성화 제거
		let activeDay = document.querySelectorAll('.uiLabel');
		for (var i = 0; i < activeDay.length; i++) {
			activeDay[i].classList.remove('active');
		}

		//해당요소 활성화
		e.target.classList.add('active');

		//달력 닫기
		calendarToggle();
	}
	useEffect(() => { 
		let vSelectDayAr = seleteDay.split('-');
		let labelStringDate = ['일', '월', '화', '수', '목', '금', '토'];
		bindClickDayButton(vSelectDayAr[0], vSelectDayAr[1], vSelectDayAr[2], labelStringDate[seleteDate]);
	}, [seleteDay]);

	return (
		<div className={`dataSelect ${calendarVisible}`}>
			{
				datepicker
				&&
				<div className="title" onClick={calendarToggle}><span>{seleteDay}</span></div>
			}
			<div className={`uiCalendar ${datepicker ? 'datepicker' : ''}`}>
				<div className="uiCalTop">
					<div className="uiCalTopInner">
						<span className="contr uiCalPrev"> <img src={require(`assets/images/common/icoArrowPrev_22.png`)} alt=""/> </span>
						<span className="uiCalTit roboto">2020.04</span>
						<span className="contr uiCalNext"> <img src={require(`assets/images/common/icoArrowNext_22.png`)} alt=""/> </span>
					</div>
				</div>
				<div className="uiCalCont">
					<div className="uiCalLabel clearfix">
						<div className="uiCalCols">
							<div className="uiLabel">일</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">월</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">화</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">수</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">목</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">금</div>
						</div>
						<div className="uiCalCols">
							<div className="uiLabel">토</div>
						</div>
					</div>
					<div className="uiCalDays clearfix">
						<div className="uiCalCols"><div className="uiLabel uiLabelGray">29</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray">30</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray">31</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-01" data-date={3} onClick={changeDay}>1</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-02" data-date={4} onClick={changeDay}>2</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-03" data-date={5} onClick={changeDay}>3</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelBlue" data-day="2020-04-04" data-date={6} onClick={changeDay}>4</div></div>

						<div className="uiCalCols"><div className="uiLabel uiLabelRed" data-day="2020-04-05" data-date={0} onClick={changeDay}>5</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-06" data-date={1} onClick={changeDay}>6</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-07" data-date={2} onClick={changeDay}>7</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-08" data-date={3} onClick={changeDay}>8</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-09" data-date={4} onClick={changeDay}>9</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-10" data-date={5} onClick={changeDay}>10</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelBlue" data-day="2020-04-11" data-date={6} onClick={changeDay}>11</div></div>

						<div className="uiCalCols"><div className="uiLabel uiLabelRed" data-day="2020-04-12" data-date={0} onClick={changeDay}>12</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-13" data-date={1} onClick={changeDay}>13</div></div>
						<div className="uiCalCols"><div className="uiLabel active" data-day="2020-04-14" data-date={2} onClick={changeDay}>14<div className="strong COLOR_RED">오늘</div></div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-15" data-date={3} onClick={changeDay}>15</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-16" data-date={4} onClick={changeDay}>16</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-17" data-date={5} onClick={changeDay}>17</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelBlue" data-day="2020-04-18" data-date={6} onClick={changeDay}>18</div></div>

						<div className="uiCalCols"><div className="uiLabel uiLabelRed" data-day="2020-04-19" data-date={0} onClick={changeDay}>19</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-20" data-date={1} onClick={changeDay}>20</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-21" data-date={2} onClick={changeDay}>21</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-22" data-date={3} onClick={changeDay}>22</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-23" data-date={4} onClick={changeDay}>23</div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-24" data-date={5} onClick={changeDay}>24</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelBlue" data-day="2020-04-25" data-date={6} onClick={changeDay}>25</div></div>

						<div className="uiCalCols"><div className="uiLabel uiLabelRed" data-day="2020-04-26" data-date={0} onClick={changeDay}>26</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray" data-day="2020-04-27" data-date={1}>27</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray" data-day="2020-04-28" data-date={2}>28</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray" data-day="2020-04-29" data-date={3}>29</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelRed" data-day="2020-04-30" data-date={4} onClick={changeDay}>30<div className="strong COLOR_RED">공휴일</div></div></div>
						<div className="uiCalCols"><div className="uiLabel" data-day="2020-04-31" data-date={5} onClick={changeDay}>31</div></div>
						<div className="uiCalCols"><div className="uiLabel uiLabelGray" data-day="2020-05-01" data-date={6} onClick={changeDay}>1</div></div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UiCalendar;