import AccordionToggle from '../accordion-toggle/accordion-toggle.component';
import UtilityButtons from '../utility-buttons/utility-buttons.component';

import './user-slot.styles.css';

const UserSlot = ({ userName }) => {
  console.log('user', userName);
  return (
    <div className='slot-container'>
      <AccordionToggle />
      <div className='user-name'>{userName}</div>
      <UtilityButtons />
    </div>
  );
};

export default UserSlot;
