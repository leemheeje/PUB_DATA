import React, { useState, useEffect } from 'react';

// COMPONENTS
import UiModal from 'components/UiModal'
import UiLink from 'components/UiLink'

const MyWithdrawStep2 = () => {
	return (
		<UiModal>
			<div className="modalHeader">
				회원탈퇴
			</div>
			<div className="myWithdrawWrap step2">
				<div className="topTxts">
					<div className="icon"><img src={`${require('assets/images/common/logoGray.png')}`} alt="" /></div>
					<div className="tit">회원탈퇴가 완료되었습니다</div>
					<div className="stit">
						<span className="point">그 동안 서비스명을 이용해주셔서 감사합니다</span>
						보다 나은 서비스로 다시 찾아 뵙겠습니다
					</div>
				</div>

				<UiLink to="/">메인으로 돌아가기</UiLink>
			</div>
		</UiModal>
	)
}
export default MyWithdrawStep2;