import Registration from '../registration/registration.component';
import Inspector from '../inspector/inspector.component';

import './action-forms.styles.css';

const ActionForms = () => {
  return (
    <div className='actions-container'>
      <Registration />
      <Inspector />
    </div>
  );
};

export default ActionForms;
