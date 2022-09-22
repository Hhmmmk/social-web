import { useState, useContext } from 'react';

import FormInput from '../../form-input/form-input.component';
import Button from '../../button/button.component';

import { UserContext } from '../../../contexts/user.context';

import './registration.styles.css';

const defaultRegisterField = {
  id: '',
  userName: '',
};

const localCollection = [];

const Registration = () => {
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const { userName } = registerField;

  const { setUserCollection } = useContext(UserContext);

  const handleChange = (event) => {
    let uId = 'id' + Math.random().toString(16).slice(2);

    setRegisterField(() => {
      return {
        userName: event.target.value,
        id: uId,
      };
    });
  };

  const resetRegistrationField = () => {
    setRegisterField(() => {
      return defaultRegisterField;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // await createUserDocument(registerField);
    localCollection.push(registerField);
    setUserCollection(() => {
      return [...localCollection];
    });

    console.log('User registered successfully.'); //TODO: Convert this to be shown on Output

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