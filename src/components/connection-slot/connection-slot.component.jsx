import './connection-slot.styles.css';

const ConnectionSlot = ({ connection }) => {
  return (
    <div className='connection-container'>
      <div className='connection'>{`${connection[0].toUpperCase()} is friends with ${connection[1].toUpperCase()}`}</div>
    </div>
  );
};

export default ConnectionSlot;
