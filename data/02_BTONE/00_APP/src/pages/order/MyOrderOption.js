import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RegExpFormat } from 'regexp';

//COMPONENTS
import UiInfoList from 'components/UiInfoList';
import UiInput from 'components/UiInput';
import UiCountAddRem from 'components/UiCountAddRem';
import UiDialog from 'components/UiDialog';
import UiToast from 'components/UiToast';
import UiButton from 'components/UiButton';

//STYLES
import 'assets/css/myOrderOption.scss';

const MyOrderOption = ({
	list_name = '아메리카노',
	list_description = '적절한 산미로 어떤 디저트와도 잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노잘 어울리는 달미 아메리카노',
	list_price = 2000,
	...props
}) => {
	const history = useHistory();
	const [isMenuImage, setIsMenuImage] = useState(true);
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isOpenToast, setIsOpenToast] = useState(false);
	const [optionsCheckboxPrice, setOptionsCheckboxPrice] = useState(0);
	const [optionsRadioPrice, setOptionsRadioPrice] = useState(0);
	const [menuCount, setMenuCount] = useState(1);
	const [totalMenuPrice, setTotalMenuPrice] = useState(0);

	useEffect(() => {
		setTotalMenuPrice((Number(list_price) + Number(optionsCheckboxPrice) + Number(optionsRadioPrice)) * Number(menuCount));
	}, [list_price, optionsCheckboxPrice, menuCount, optionsRadioPrice]);

	const handlerAddCartlist = () => {
		console.log(`메뉴가격${list_price}`);
		console.log(`옵션가격${optionsCheckboxPrice}`);
		console.log(`수량${menuCount}`);
		console.log(`토탈가격${totalMenuPrice}`);
	}
	const handlerOptionsCheckboxAddPrice = event => {
		let price = event.target.value;
		if (!event.target.checked) {
			price = price * -1;
		}
		setOptionsCheckboxPrice(Number(optionsCheckboxPrice) + Number(price));

	}
	const handlerOptionsRadioAddPrice = event => {
		if (event.target.checked) {
			setOptionsRadioPrice(event.target.value);
		}

	}

	return (
		<div className="container inBottomBtns">
			<button onClick={() => setIsMenuImage(false)}>이미지없을때</button>
			<button onClick={() => setIsOpenDialog(true)}>카트에는 같은 매장의 메뉴만 담을 수 있습니다</button>
			<div className="myOrderOption">
				{
					isMenuImage
					&&
					<div className="mooImage">
						<img src={require('assets/images/thumb/banner2.png')} alt="" />
					</div>
				}
				<div className="mooInfo">
					<div className="innerWrap">
						<div className="mooInfoText">
							<UiInfoList size="lg" {...{ list_name, list_description, list_price }} />
						</div>
						<div className="mooOptions">
							<div className="tit">옵션 선택</div>
							<ul className="optList">
								<li className="tp">
									<div className="inp">
										<UiInput type="checkbox" id="id1" name="a1" defaultValue={500} label="체크박스" onChange={event => handlerOptionsCheckboxAddPrice(event)} />
									</div>
									<div className="iva">
										<span className="roboto">+{RegExpFormat(500, 'comma')}</span>
										<span className="lb">원</span>
									</div>
								</li>
								<li className="tp">
									<div className="inp">
										<UiInput type="checkbox" id="id2" name="a2" defaultValue={1000} label="체크박스" onChange={event => handlerOptionsCheckboxAddPrice(event)} />
									</div>
									<div className="iva">
										<span className="roboto">+{RegExpFormat(1000, 'comma')}</span>
										<span className="lb">원</span>
									</div>
								</li>
								<li className="tp">
									<div className="inp">
										<UiInput type="radio" id="id3" name="asdf" defaultValue={`0`} label="라디오버튼" onChange={event => handlerOptionsRadioAddPrice(event)} defaultChecked />
									</div>
									<div className="iva">
										<span className="roboto">+{RegExpFormat(0, 'comma')}</span>
										<span className="lb">원</span>
									</div>
								</li>
								<li className="tp">
									<div className="inp">
										<UiInput type="radio" id="id4" name="asdf" defaultValue={1000} label="라디오버튼" onChange={event => handlerOptionsRadioAddPrice(event)} />
									</div>
									<div className="iva">
										<span className="roboto">+{RegExpFormat(1000, 'comma')}</span>
										<span className="lb">원</span>
									</div>
								</li>
								<li className="tp">
									<div className="inp">
										<UiInput type="radio" id="id5" name="asdf" defaultValue={1500} label="라디오버튼" onChange={event => handlerOptionsRadioAddPrice(event)} />
									</div>
									<div className="iva">
										<span className="roboto">+{RegExpFormat(1500, 'comma')}</span>
										<span className="lb">원</span>
									</div>
								</li>
							</ul>
						</div>
						<div className="mooLng">
							<ul className="optList">
								<li className="tp">
									<div className="inp">
										<div className="tit">수량</div>
									</div>
									<div className="iva">
										<UiCountAddRem watchCount={count => {
											setMenuCount(count);
											console.log(count)
										}} />
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mooBottom">
					<div className="innerWrap">
						<UiButton className="red ordersBtn" onClick={() => {
							setIsOpenToast(true); //메뉴를 추가하였습니다
							handlerAddCartlist(); //메뉴추가 성공시
							//setIsOpenDialog(true); //카트에는 같은 매장의 메뉴만<br /> 담을 수 있습니다
						}}>
							<div className="orbLt">
								<span className="ttx">선택한 <span className="roboto">{menuCount}</span>건 <span className="roboto">{RegExpFormat(totalMenuPrice, 'comma')}</span>원</span>
							</div>
							<div className="orbRt">카트담기</div>
						</UiButton>
					</div>
				</div>
			</div>
			{
				isOpenDialog
				&&
				<UiDialog
					type="confirm"
					bindClickCancelBtn={() => {
						setIsOpenDialog(false);
					}}
					bindClickConfirmBtn={() => {
						setIsOpenDialog(false);
					}}
				>
					<div className="diagSubTit">카트에는 같은 매장의 메뉴만<br /> 담을 수 있습니다</div>
					<div className="diagTit MT30">이전에 담은 메뉴는 삭제됩니다</div>
				</UiDialog>
			}
			{
				isOpenToast
				&&
				<UiToast bindCloseCallback={() => {
					history.goBack();
					setIsOpenToast(false);
				}}>메뉴를 추가하였습니다</UiToast>
			}
		</div >
	)
}
export default MyOrderOption;