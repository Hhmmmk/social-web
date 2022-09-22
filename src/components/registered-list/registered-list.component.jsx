import { useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import UserSlot from './user-slot/user-slot.component';

import './registered-list.styles.css';

const RegisteredList = () => {
  const { userCollection } = useContext(UserContext);

  return (
    <div className='registered-users-container'>
      <h2>Registered Users</h2>
      <div className='user-slots'>
        {userCollection.map((user) => {
          return <UserSlot key={user.id} userName={user.userName} />;
        })}
      </div>
    </div>
  );
};

export default RegisteredList;
