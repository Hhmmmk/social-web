import { useState, useContext } from 'react';

import { UserContext } from '../../../contexts/user.context';

import FormInput from '../../form-input/form-input.component';
import Button from '../../button/button.component';

import './registration.styles.css';

// Default values
const defaultRegisterField = {
  id: '',
  userName: '',
};

const localCollection = [];

// * Start --> Component <-- //
const Registration = () => {
  //  States and Contexts
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const { userName } = registerField;

  const { setUserCollection } = useContext(UserContext);

  // Functions
  const resetRegistrationField = () => {
    setRegisterField(() => {
      return defaultRegisterField;
    });
  };

  // * Start --> Event Handlers <-- //

  // Listens and gets value entered in the input fields
  const handleChange = (event) => {
    // Generate random ID for each user -- thinking of scalability
    let uId = 'id' + Math.random().toString(16).slice(2);

    // Listens and gets value entered in the input fields
    setRegisterField(() => {
      return {
        userName: event.target.value,
        id: uId,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localCollection.push(registerField);

    // * Set Input to User Collection Context
    setUserCollection(() => {
      return [...localCollection];
    });

    // Clear Fields when done
    resetRegistrationField();
  };

  return (
    <div className='registration'>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className='registration-input'>
          <FormInput
            label='Username'
            required
            onChange={handleChange}
            type='text'
            name='userName'
            value={userName}
          />
        </div>
        <div className='add'>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
