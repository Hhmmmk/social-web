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

    const path = [];

    const tempArray = [];
    const lastIndex = tempArray.length - 1;

    const getFriend = () => {
      const addFriend = (dirFriend) => {
        // relevantConnections.forEach((connection) => {
        //   if (connection[0] === dirFriend && connection[1] === validUsers[1])

        //     path.push(connection);
        //   } else if (connection[0] === dirFriend && connection[1]) {
        //     tempArray.push(connection);
        //   }
        // });

        relevantConnections.forEach((connection, i) => {
          if (connection[0] === dirFriend && connection[1] === validUsers[1]) {
            path.push(relevantConnections.splice(i, 1));
          } else if (connection[0] === dirFriend && connection[1]) {
            tempArray.push(relevantConnections.splice(i, 1));
          }
        });

        console.log('newRElevant connections', relevantConnections);
      };

      directFriends.forEach((friend) => {
        addFriend(friend);

        tempArray.forEach((innerArray) => {
          relevantConnections.forEach((connection) => {
            // console.log('tempForEach');
            // console.log(relevantConnections);
            tempArray.forEach((connect) => {
              // console.log('hit connect');
              // console.log('connection0', connection[0]);
              // console.log('connect', connect[0][1]);
              if (connection[0] === connect[0][1]) {
                // console.log('hit');

                tempArray[0][0].push(connection[1]);
              }
            });
          });
        });
        const newTempArray = tempArray.flat();

        newTempArray.forEach((innerArray, i) => {
          if (innerArray[innerArray.length - 1] === validUsers[1]) {
            path.push(newTempArray.splice(i, 1));
            console.log('newTempArray', newTempArray);
          }
        });
      });

      console.log('tempArray', tempArray);
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
