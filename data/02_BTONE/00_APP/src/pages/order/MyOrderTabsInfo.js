import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

//COMPONENTS
import UiButton from 'components/UiButton';
import UiToast from 'components/UiToast';
import KakaoMap from 'components/KakaoMap';

//STYLES
import 'assets/css/myOrderTabsInfo.scss';

const MyOrderTabsInfo = ({
	store_info,
	...props
}) => {
	const {
		store_name,
		address,
		business_hours,
		store_contact,
		store_description,
		business_owner,
		business_license,
		...anothers
	} = store_info;
	const [copyToastOpen, setCopyToastOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	return (
		<div className="myOrderTabsInfo">
			<div className="innerWrap">
				<div className="motiLst">
					{
						store_name
						&&
						<div className="motiLstTp">
							<div className="motiListDt">상호명</div>
							<div className="motiListDd">{store_name}</div>
						</div>
					}
					{
						address['value']
						&&
						<div className="motiLstTp">
							<div className="motiListDt">매장 주소</div>
							<div className="motiListDd rt">
								{address['value']}
								<div className="rt">
									<CopyToClipboard text={address['value']}
										onCopy={() => {
											setCopied(true);
											setCopyToastOpen(true);
										}}>
										<UiButton className="xxs outline inline shadowNone">복사</UiButton>
									</CopyToClipboard>
								</div>
							</div>
							{
								address['map']
								&&
								<div className="motiListMap">
									<KakaoMap markerWidth={27} markerheight={34} mapstyle={
										{
											width: '100%',
											height: '100%',
										}
									} />
									{address['map']}
								</div>
							}
						</div>
					}
					{
						business_hours
						&&
						<div className="motiLstTp">
							<div className="motiListDt">영업 시간</div>
							<div className="motiListDd">{business_hours}</div>
						</div>
					}
					{
						store_contact
						&&
						<div className="motiLstTp">
							<div className="motiListDt">매장 연락처</div>
							<div className="motiListDd">{store_contact}</div>
						</div>
					}
					{
						store_description
						&&
						<div className="motiLstTp">
							<div className="motiListDt">매장 소개</div>
							<div className="motiListDd">{store_description}</div>
						</div>
					}
					{
						business_owner
						&&
						<div className="motiLstTp">
							<div className="motiListDt">사업주명</div>
							<div className="motiListDd">{business_owner}</div>
						</div>
					}
					{
						business_license
						&&
						<div className="motiLstTp">
							<div className="motiListDt">사업자 등록번호</div>
							<div className="motiListDd">{business_license}</div>
						</div>
					}
				</div>
			</div>
			{
				copyToastOpen
				&&
				<UiToast bindCloseCallback={()=>setCopyToastOpen(false)}>매장주소가 복사 되었습니다</UiToast>
			}
		</div>
	)
}
export default MyOrderTabsInfo;