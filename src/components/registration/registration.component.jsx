import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './registration.styles.css';

const defaultRegisterField = {
  userName: '',
};

const Registration = () => {
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const { userName } = registerField;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegisterField({ ...registerField, [name]: value });
  };

  console.log(registerField);
  return (
    <div className='registration'>
      <h2>Register User</h2>
      <form>
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
