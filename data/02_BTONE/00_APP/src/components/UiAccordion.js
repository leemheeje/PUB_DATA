import React, { useState } from 'react';
import { RegExpFormat } from 'regexp';

//STYLES
import 'assets/css/UiAccordion.scss';

const UiAccordion = ({
    title = ``,
    description = ``
}) => {
    const [isOpen, setOpen] = useState(false);

    return (
      <div className={`accordionBox ${isOpen ? "open" : "close"}`} onClick={() => setOpen(!isOpen)}>
        <div className="tit">
            <span className="icon roboto">Q</span>
            <span className="title">{title}</span>
            <div className="btnArrow">
				<img src={require(`assets/images/common/icoSortingOnGray.png`)} alt=""/>
			</div>
        </div>
        <div className={`descBox ${isOpen ? "open" : "close"}`}>
            {description}
        </div>
      </div>
    );
}


export default UiAccordion;