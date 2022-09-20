import AccordionToggle from '../accordion-toggle/accordion-toggle.component';
import UtilityButtons from '../utility-buttons/utility-buttons.component';

import './user-slot.styles.css';

const UserSlot = () => {
  return (
    <div className='slot-container'>
      <AccordionToggle />
      <div className='user-name'>Insert Name Here</div>
      <UtilityButtons />
    </div>
  );
};

export default UserSlot;
