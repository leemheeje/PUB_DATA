import React, { useState, useRef, useEffect } from 'react';

//COMPONENTS
import UiDialog from 'components/UiDialog';

const UiToast = ({
	children = '문자를 입력해주세요',
	...props
}) => {
	return (
		<UiDialog type="toast" {...props}>{children}</UiDialog>
	)
}

export default UiToast;