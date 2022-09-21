import { useState } from 'react';

import arrow from '../../assets/icons/arrow-icon.png';
import droppedArrow from '../../assets/icons/arrow_dropped-icon.png';
import contact from '../../assets/icons/contact-icon.png';
import hoveredContact from '../../assets/icons/contact_blue-icon.png';

import './accordion-toggle.styles.css';

const AccordionToggle = () => {
  const [isArrowToggled, setIsArrowToggled] = useState(false);

  const handleClick = () => {
    setIsArrowToggled(!isArrowToggled);
  };

  const arrowStatus = isArrowToggled ? droppedArrow : arrow;
  const contactStatus = isArrowToggled ? hoveredContact : contact;

  return (
    <div className='accordion-toggle-container' title='Show Friends'>
      <div onClick={handleClick} className='icon arrow'>
        <img src={arrowStatus} alt='Show Friends' />
      </div>
      <div className='icon friends'>
        <img src={contactStatus} alt='Friends' />
      </div>
    </div>
  );
};

export default AccordionToggle;
