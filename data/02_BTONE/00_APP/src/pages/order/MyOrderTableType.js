import React, { useState, useEffect, useRef } from 'react';
import {useHistory} from 'react-router';

//COMPONENTS
import UiButton from 'components/UiButton';
import UiInput from 'components/UiInput';

//STYLES
import 'assets/css/myOrderTable.scss';

const MyOrderTableType = ({
	isTableNumber = true,
	...props
}) => {
	const histroy = useHistory();
	const [choiceOrderType, setChoiceOrderType] = useState('');
	const [tableNumberValue, setTableNumberValue] = useState('');

	const handlerSubmitOrderTable = () => {
		console.log(choiceOrderType);
		console.log(tableNumberValue);
	}
	const handlerRadioButtonChange = event => {
		if (event.target.checked) {
			event.target.closest('.chbox').classList.add('checked');
		}
		setChoiceOrderType(event.target.value);
	}
	useEffect(() => {
		if (choiceOrderType === '포장') {
			histroy.push('/order/myOrderDetail/menu');
		}
	}, [choiceOrderType]);
	return (
		<div className="container">
			<div className="myOrderTable">
				<div className="myOrderTableType">
					<div className="innerWrap">
						<div className="gtit">주문하실 유형을 선택해주세요</div>
						<div className="chbox">
							<div className="uiRow">
								<div className="uiCol6">
									<div className="chboxinp">
										<UiInput type="radio" name="rdo" id="rdo1" label={(
											<span className="icos str">
												<img src={require(`assets/images/common/icoFuncOn01_73.png`)} alt=""/>
												매장
											</span>
										)} defaultValue="매장" onChange={handlerRadioButtonChange} />
									</div>
								</div>
								<div className="uiCol6">
									<div className="chboxinp">
										<UiInput type="radio" name="rdo" id="rdo2" label={(
											<span className="icos pck">
												<img src={require(`assets/images/common/icoStoreOn_73.png`)} alt=""/>
												포장
											</span>
										)} defaultValue="포장" onChange={handlerRadioButtonChange} />
									</div>
								</div>
							</div>
						</div>
						{
							isTableNumber && choiceOrderType === '매장'
							&&
							<div className="ivpbox MT75">
								<div className="lt"><UiInput type="text" placeholder="테이블 번호를 입력해주세요" onChange={event => setTableNumberValue(event.target.value)} /></div>
								<div className="rt"><UiButton disabled={!tableNumberValue ? true : false} className={`outline shadowNone ${tableNumberValue ? 'red' : ''}`} onClick={() => handlerSubmitOrderTable()}>확인</UiButton></div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
export default MyOrderTableType;