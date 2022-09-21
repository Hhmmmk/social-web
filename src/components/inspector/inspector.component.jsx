import { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { ConnectionsContext } from '../../contexts/connections.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './inspector.styles.css';

const defaultSelection = {
  firstUser: '',
  secondUser: '',
};

const localConnection = [];

const Inspector = () => {
  const [selection, setSelection] = useState(defaultSelection);
  const { firstUser, secondUser } = selection;

  const { userCollection } = useContext(UserContext);
  const { setConnections } = useContext(ConnectionsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSelection({ ...selection, [name]: value });
  };

  const resetSelectionField = () => {
    setSelection(() => {
      return defaultSelection;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validUsers = [];

    const validFirstUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === firstUser.toLowerCase();
    });

    const validSecondUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === secondUser.toLowerCase();
    });

    if (validFirstUser.length > 0 && validSecondUser.length > 0) {
      validUsers.push(firstUser.toLowerCase());
      validUsers.push(secondUser.toLowerCase());
    }

    localConnection.push(validUsers);

    setConnections(() => {
      return [...localConnection];
    });

    resetSelectionField();
  };

  return (
    <div className='view-relationship'>
      <h2>View Relationships</h2>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <FormInput
            label='Enter First User'
            required
            onChange={handleChange}
            type='text'
            name='firstUser'
            value={firstUser}
          />
          <FormInput
            label='Enter Second User'
            required
            onChange={handleChange}
            type='text'
            name='secondUser'
            value={secondUser}
          />
        </div>
        <div className='submit'>
          <Button>Set as Friends</Button>
          <Button type='button'>See Connection</Button>
        </div>
      </form>
    </div>
  );
};

export default Inspector;
