import arrow from '../../assets/icons/arrow-icon.png';
import droppedArrow from '../../assets/icons/arrow_dropped-icon.png';
import contact from '../../assets/icons/contact-icon.png';
import hoveredContact from '../../assets/icons/contact_blue-icon.png';

import './accordion-toggle.styles.css';

const AccordionToggle = () => {
  return (
    <div className='accordion-toggle-container' title='Show Friends'>
      <div className='icon arrow'>
        <img src={arrow} alt='Show Friends' />
      </div>
      <div className='icon friends'>
        <img src={contact} alt='Friends' />
      </div>
    </div>
  );
};

export default AccordionToggle;
