import OutputViewer from '../output-viewer/output-viewer.component';
import DataList from '../data-list/data-list.component';

import './data-container.styles.css';

const DataContainer = () => {
  return (
    <div className='container'>
      <div className='data-container'>
        <OutputViewer />
        <DataList />
      </div>
    </div>
  );
};

export default DataContainer;
