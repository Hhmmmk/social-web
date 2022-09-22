import './user-slot.styles.css';

const UserSlot = ({ userName }) => {
  return (
    <div className='user-info-container'>
      <div className='slot-container'>
        {/* <AccordionToggle /> */}
        <div className='user-name'>{userName}</div>
      </div>
    </div>
  );
};

export default UserSlot;
