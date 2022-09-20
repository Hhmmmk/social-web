import UserSlot from '../user-slot/user-slot.component';

import './data-list.styles.css';

const DataList = () => {
  return (
    <div className='data-list-container'>
      <h2>Registered Users</h2>
      <div className='user-slots'>
        <UserSlot />
        <UserSlot />
        <UserSlot />
      </div>
    </div>
  );
};

export default DataList;
