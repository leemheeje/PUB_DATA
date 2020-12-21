import React, { useState } from 'react';

//COMPONENTS
import UiInput from 'components/UiInput';
import UiTextarea from 'components/UiTextarea';
import UiButton from 'components/UiButton';
import UiReviewGrade from 'components/UiReviewGrade';
import UiToast from 'components/UiToast';
import UiDialog from 'components/UiDialog';

//STYLES
import 'assets/css/reviewCreate.scss';

const ReviewCreate = () => {
	const [imageFileValue, setImageFileValue] = useState('');
	const [imagePreviewURL, setImagePreviewURL] = useState('');
	const [reviewPoint, setReviewPoint] = useState(0);
	const [review, setReview] = useState('');
	const [completeToastOpen, setCompleteToastOpen] = useState(false);
	const [errorDialogOpen, setErrorDialogOpen] = useState(false);

	return (
		<div className="container">
			<div className="reviewCreate">
				<div className="innerWrap">
					<div className="recTop">
						<div className="tit">카페달미 (Cafe Dalmi)</div>
						<div className="stit">서비스 이용에 만족하시나요?</div>
						<div className="recGrade MT45">
							<UiReviewGrade istext="true" fnEventHandlerPoint={count => {
								setReviewPoint(count);
								console.log(count);
							}} />
						</div>
					</div>
					<div className="recCont MT55">
						<UiTextarea isbyte="true" placeholder="이용 후기를 작성해주세요" onChange={event => setReview(event.target.value)} />
					</div>
					<div className="recFot">
						<div className="recInputFile">
							{
								imagePreviewURL
									?
									<div className="img MT15">
										<img src={imagePreviewURL} alt="" />
										<UiButton className="init thumbDeleteBtn" onClick={() => {
											setImageFileValue('');
											setImagePreviewURL('');
										}}>
											<img src={require(`assets/images/common/icoCircleClose_35.png`)} alt="닫기"/>
										</UiButton>
									</div>
									:
									<div className="inp MT90">
										<UiInput type="file" id="file1" placeholder="5MB 이하의 jpg, jpeg, png, gif, bmp 파일 가능" onChange={(filename, filepath) => {
											setImageFileValue(filename);
											setImagePreviewURL(filepath);
										}} />
									</div>
							}
						</div>
						<UiButton disabled={!imageFileValue || !reviewPoint || !review ? true : false} className="MT40" onClick={() => setCompleteToastOpen(true)}>저장</UiButton>
						<UiButton className="MT40" onClick={() => setErrorDialogOpen(true)}>확장자거부팝업</UiButton>
					</div>
				</div>
			</div>
			{
				completeToastOpen
				&&
				<UiToast
					bindCloseCallback={() => setCompleteToastOpen(false)}
				>저장되었습니다</UiToast>}
			{
				errorDialogOpen
				&&
				<UiDialog
					bindCloseCallback={() => setErrorDialogOpen(false)}
				>
					<strong className="strong">지원하지 않는 파일 형식이거나<br /> 용량을 초과하였습니다</strong>
					<ul className="pmeList">
						<li className="tp">
							<span className="dt">확장자</span>
							<div className="dd">jpg, jpeg, png, gif, bmp</div>
						</li>
						<li className="tp">
							<span className="dt">용량</span>
							<div className="dd">5MB</div>
						</li>
					</ul>
				</UiDialog>
			}
		</div>
	)
}
export default ReviewCreate;