import { useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import UserSlot from '../user-slot/user-slot.component';

import './data-list.styles.css';

const DataList = () => {
  const { userCollection } = useContext(UserContext);

  return (
    <div className='data-list-container'>
      <h2>Registered Users</h2>
      <div className='user-slots'>
        {userCollection.map((user) => {
          return <UserSlot key={user.id} userName={user.userName} />;
        })}
      </div>
    </div>
  );
};

export default DataList;
