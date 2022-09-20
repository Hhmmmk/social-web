import { useState } from 'react';

import './registration.styles.css';

const defaultRegisterField = {
  userName: '',
};

const Registration = () => {
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const { userName } = registerField;
  return (
    <div className='registration'>
      <h2>Register User</h2>
      <form>
        <input type='text' name='' />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Registration;
