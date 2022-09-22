import OutputViewer from './output-viewer/output-viewer.component';
import RegisteredList from '../registered-list/registered-list.component';
import ConnectionsList from '../connections-list/connections-list.component';

import './data-container.styles.css';

const DataContainer = () => {
  return (
    <div className='container'>
      <div className='data-container'>
        <OutputViewer />
        <div className='data-list-container'>
          <RegisteredList />
          <ConnectionsList />
        </div>
      </div>
    </div>
  );
};

export default DataContainer;
