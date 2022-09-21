// import AccordionToggle from '../accordion-toggle/accordion-toggle.component';
// import UtilityButtons from '../utility-buttons/utility-buttons.component';

import './user-slot.styles.css';

const UserSlot = ({ userName }) => {
  return (
    <div className='user-info-container'>
      <div className='slot-container'>
        {/* <AccordionToggle /> */}
        <div className='user-name'>{userName}</div>
        {/* <UtilityButtons /> */}
      </div>
    </div>
  );
};

export default UserSlot;
