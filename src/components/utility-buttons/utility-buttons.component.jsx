import edit from '../../assets/icons/edit-icon.png';
// import hoveredEdit from '../../assets/icons/edit_orange-icon.png';
import deleteIcon from '../../assets/icons/delete-icon.png';
// import hoveredDeleteIcon from '../../assets/icons/delete_red-icon.png';

import './utility-buttons.styles.css';

const UtilityButtons = () => {
  return (
    <div className='utility-buttons-container'>
      <div className='icon edit'>
        <img src={edit} alt='Edit' title='Edit User' />
      </div>
      <div className='icon delete'>
        <img src={deleteIcon} alt='Delete' title='Delete User' />
      </div>
    </div>
  );
};

export default UtilityButtons;
