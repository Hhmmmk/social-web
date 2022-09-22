import { useState, useContext } from 'react';

import { UserContext } from '../../../contexts/user.context';
import { ConnectionsContext } from '../../../contexts/connections.context';
import { OutputContext } from '../../../contexts/output.context';

import FormInput from '../../form-input/form-input.component';
import Button from '../../button/button.component';

import './inspector.styles.css';

// Default values
const defaultSelection = {
  firstUser: '',
  secondUser: '',
};

const localConnection = [];

const pathsArray = [];

// * Start --> Component <-- //
const Inspector = () => {
  //  States and Contexts
  const [selection, setSelection] = useState(defaultSelection);
  const { firstUser, secondUser } = selection;

  const { userCollection } = useContext(UserContext);
  const { connections, setConnections } = useContext(ConnectionsContext);
  const { setOutput } = useContext(OutputContext);

  // Functions
  const resetSelectionField = () => {
    setSelection(() => {
      return defaultSelection;
    });
  };

  // * Start --> Event Handlers <-- //

  // Listens and gets value entered in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (userCollection.length <= 1) {
      alert('You need two registered users to set connections');
    }

    setSelection({ ...selection, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validUsers = [];

    // * Start --> Getting Input <-- //
    const validFirstUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === firstUser.toLowerCase();
    });

    const validSecondUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === secondUser.toLowerCase();
    });

    // Validating User Input
    if (validFirstUser.length > 0 && validSecondUser.length > 0) {
      validUsers.push(firstUser.toLowerCase());
      validUsers.push(secondUser.toLowerCase());

      if (validUsers.length > 0) {
        localConnection.push(validUsers);
      }

      // * Set Input to Connections Context
      setConnections(() => {
        return [...localConnection];
      });

      console.log('Success!'); //TODO: Convert this to be shown on Output
    } else {
      console.log('Entered user/s does not exist.'); // TODO: Convert this to be shown on output
    }

    // Clear Fields when done
    resetSelectionField();
  };

  // Checks connections from one user to another
  const handleClick = (event) => {
    event.preventDefault();

    if (firstUser === '' || secondUser === '') {
      console.log('Please enter username/s to do this action.');
    }

    const validUsers = [];

    // Checks if entered users from each field exists
    const validFirstUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === firstUser.toLowerCase();
    });

    const validSecondUser = userCollection.filter((user) => {
      return user.userName.toLowerCase() === secondUser.toLowerCase();
    });

    // Checks if input fields have a value. If true, checks if entered users exist
    if (validFirstUser.length > 0 && validSecondUser.length > 0) {
      validUsers.push(firstUser.toLowerCase());
      validUsers.push(secondUser.toLowerCase());
    } else {
      console.log('Entered user/s does not exist.'); // TODO: Convert this to be shown on output
    }

    // Gets all the connections that the first user exist
    const filteredConnections = connections
      .filter((connection) => {
        return (
          (connection[0] || connection[1]) === (validUsers[0] || validUsers[1])
        );
      })
      .flat();

    // Gets the first degree friends of the First User
    const directFriends = filteredConnections.filter((user) => {
      return user !== validUsers[0];
    });

    // Gets the connections that the First User doesn't exists
    const relevantConnections = connections.filter((connection) => {
      return (
        (connection[0] || connection[1]) !== (validUsers[0] || validUsers[1])
      );
    });

    // * Start --> Generating Output <-- //
    let paths = [];
    let tempArray = [];

    // Getting second to nth degree friends
    const getFriend = () => {
      // Getting second degree friend
      const addFriend = (dirFriend) => {
        relevantConnections.forEach((connection, i) => {
          // Gets second degree connection and checks third degree connection
          if (connection[0] === dirFriend && connection[1] === validUsers[1]) {
            // If the third degree connection is the Second User, push to the array of Output
            paths.push(relevantConnections.splice(i, 1));
          } else if (connection[0] === dirFriend && connection[1]) {
            // If the third degree connection is not the Second user, add it to a temporary array
            tempArray.push(relevantConnections.splice(i, 1));
          }
        });
      };

      directFriends.forEach((friend) => {
        // Call the function for finding and checking 2nd and 3rd degree connections for each First degree connection
        addFriend(friend);

        // Checks if the temporary array contains something
        if (tempArray.length > 0) {
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
            }
          });
        }
      });

      paths = paths.flat();

      // Adds the First User at the beginning of the array of paths
      paths.forEach((path) => {
        path.unshift(validUsers[0]);
        pathsArray.push(path);
      });
    };

    getFriend();

    // * Sets the Output to the Output Context
    setOutput(() => {
      return [...pathsArray];
    });

    // Clear fields
    resetSelectionField();
  };

  return (
    <div className='view-relationship'>
      <h2>View/Edit Connections</h2>
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
