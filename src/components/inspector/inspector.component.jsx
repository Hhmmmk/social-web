import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './inspector.styles.css';

const defaultSelection = {
  firstUser: '',
  secondUser: '',
};

const Inspector = () => {
  const [selection, setSelection] = useState(defaultSelection);
  const { firstUser, secondUser } = selection;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSelection({ ...selection, [name]: value });
  };

  console.log(selection);
  return (
    <div className='view-relationship'>
      <h2>View Relationships</h2>
      <form>
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
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Inspector;
