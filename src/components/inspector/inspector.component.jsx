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
  const { connections, setConnections } = useContext(ConnectionsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (userCollection.length <= 1) {
      console.log('You need two registered users to set connections'); //TODO: Convert this to be shown on Output
    }

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

      if (validUsers.length > 0) {
        localConnection.push(validUsers);
      }

      setConnections(() => {
        return [...localConnection];
      });

      console.log('Users are Valid'); //TODO: Convert this to be shown on Output
    } else {
      console.log('Entered user/s does not exist.'); // TODO: Convert this to be shown on output
    }

    resetSelectionField();
  };

  console.log(connections);

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
