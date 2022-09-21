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

      console.log('Success!'); //TODO: Convert this to be shown on Output
    } else {
      console.log('Entered user/s does not exist.'); // TODO: Convert this to be shown on output
    }

    resetSelectionField();
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log('click');

    if (firstUser === '' || secondUser === '') {
      console.log('Please enter username/s to do this action.');
    }

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
    } else {
      console.log('Entered user/s does not exist.'); // TODO: Convert this to be shown on output
    }

    console.log('VALID USERS', validUsers);

    //getting direct friends of firsUser
    const filteredConnections = connections
      .filter((connection) => {
        return (
          (connection[0] || connection[1]) === (validUsers[0] || validUsers[1])
        );
      })
      .flat();

    //start of the connection point of the two users entered
    const directFriends = filteredConnections.filter((user) => {
      return user !== validUsers[0];
    });

    //how many paths are there to get to the secondUser entered
    const friendshipPaths = directFriends.length;

    //filter out direct friendship of the first user to their direct friends
    const relevantConnections = connections.filter((connection) => {
      return (
        (connection[0] || connection[1]) !== (validUsers[0] || validUsers[1])
      );
    });

    console.log('relevantConnections', relevantConnections);
    console.log('paths to friendship', friendshipPaths);
    console.log('directFriends', directFriends);
    console.log('filteredConnections', filteredConnections);

    // const pathsArray = directFriends.map((friend) => {
    //   const path = relevantConnections.reduce((acc, connection) => {
    //     const tempArray = [];

    //     if (connection[0] === friend) {
    //       tempArray.push(connection);
    //     }

    //     // const f = connection.filter((user) => {
    //     //   return user !== friend;
    //     // });

    //     // tempArray.push(f);

    //     return tempArray;
    //   }, []);
    //   return path;
    // });

    const pathsArray = [];

    const getFriend = () => {
      const path = [];
      const addFriend = (dirFriend, conIndex) => {
        relevantConnections.forEach((connection) => {
          if (connection[conIndex] === dirFriend) {
            path.push(connection);
          }
        });
      };

      directFriends.forEach((friend) => {
        addFriend(friend, 0);
      });

      console.log('path', path);
    };

    getFriend();
  };

  console.log('CONNECTIONS', connections);
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
          <Button onClickHandler={handleClick} type='button'>
            See Connection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Inspector;
