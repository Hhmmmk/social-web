import { useState } from 'react';
import { createUserDocument } from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './registration.styles.css';

const defaultRegisterField = {
  userName: '',
  id: '',
};

const Registration = () => {
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const { userName } = registerField;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUserDocument(registerField);
    console.log(registerField);
    resetRegistrationField();
  };

  console.log(registerField);
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
