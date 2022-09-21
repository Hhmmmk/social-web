import Header from './components/header/header.component';
import ActionForms from './components/action-forms/action-forms.component';
import DataContainer from './components/data-container/data-container.component';

import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <ActionForms />
      <DataContainer />
    </div>
  );
};

export default App;
