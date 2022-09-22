import { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { ConnectionsContext } from '../../contexts/connections.context';
import { OutputContext } from '../../contexts/output.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './inspector.styles.css';

const defaultSelection = {
  firstUser: '',
  secondUser: '',
};

const localConnection = [];

const pathsArray = [];

const Inspector = () => {
  const [selection, setSelection] = useState(defaultSelection);
  const { firstUser, secondUser } = selection;

  const { userCollection } = useContext(UserContext);
  const { connections, setConnections } = useContext(ConnectionsContext);
  const { output, setOutput } = useContext(OutputContext);

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

    //filter out direct friendship of the first user to their direct friends
    const relevantConnections = connections.filter((connection) => {
      return (
        (connection[0] || connection[1]) !== (validUsers[0] || validUsers[1])
      );
    });

    let paths = [];
    let tempArray = [];

    const getFriend = () => {
      const addFriend = (dirFriend) => {
        relevantConnections.forEach((connection, i) => {
          if (connection[0] === dirFriend && connection[1] === validUsers[1]) {
            paths.push(relevantConnections.splice(i, 1));
          } else if (connection[0] === dirFriend && connection[1]) {
            tempArray.push(relevantConnections.splice(i, 1));
          }
        });
      };

      directFriends.forEach((friend) => {
        addFriend(friend);

        tempArray.forEach(() => {
          relevantConnections.forEach((connection) => {
            tempArray.forEach((connect) => {
              if (connection[0] === connect[0][1]) {
                tempArray[0][0].push(connection[1]);
              }
            });
          });
        });

        tempArray = tempArray.flat();

        tempArray.forEach((innerArray, i) => {
          if (innerArray[innerArray.length - 1] === validUsers[1]) {
            paths.push(tempArray.splice(i, 1));
            console.log('newTempArray', tempArray);
          }
        });
      });

      paths = paths.flat();

      paths.forEach((path) => {
        path.unshift(validUsers[0]);
        pathsArray.push(path);
      });

      console.log('tempArray', tempArray);
      console.log('FinalPaths', paths);
    };

    getFriend();

    setOutput(() => {
      return [...pathsArray];
    });

    console.log('pathsArray', pathsArray);

    resetSelectionField();
  };

  console.log('output', output);

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
