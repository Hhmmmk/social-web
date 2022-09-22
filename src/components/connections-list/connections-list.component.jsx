import { useContext } from 'react';

import { ConnectionsContext } from '../../contexts/connections.context';

import ConnectionSlot from './connection-slot/connection-slot.component';

import './connections-list.styles.css';

const ConnectionsList = () => {
  const { connections } = useContext(ConnectionsContext);
  return (
    <div className='connections-list-container'>
      <h2>Existing Connections</h2>
      <div className='connections-list'>
        {connections.map((connection, index) => {
          return <ConnectionSlot key={index} connection={connection} />;
        })}
      </div>
    </div>
  );
};

export default ConnectionsList;
