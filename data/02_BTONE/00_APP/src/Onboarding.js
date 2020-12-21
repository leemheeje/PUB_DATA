import React, { useState, useEffect } from 'react';
import { isAndroid } from "react-device-detect";

//COMPONENTS
import UiLink from 'components/UiLink';

//STYLES
import 'assets/css/onBoarding.scss';

const Onboarding = ({
	bindClickServiceStart = () => { },
	...props
}) => {
	const [isVideoError, setIsVideoError] = useState(false);

	return (
		<div className="onBoarding">
			<div className="inner">
				<div className="video">
					{
						isVideoError
						?
						<img src={require(`assets/etc/videoOnboarding.jpg`)} alt=""/>
						:
						<video autoPlay onError={()=>setIsVideoError(true)} playsInline muted poster={
							isAndroid ? require(`assets/etc/videoOnboardingPoster.jpg`) : ''
						}>
							<source src={require(`assets/etc/videoOnboarding.mp4`)} type="video/mp4" />
						</video>
					}
					<UiLink to="/" className="btn" onClick={() => bindClickServiceStart(true)}>시작하기</UiLink>
				</div>
			</div>
		</div>
	)
}
export default Onboarding;
