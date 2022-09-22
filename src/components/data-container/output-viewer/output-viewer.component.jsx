import { useContext } from 'react';

import { OutputContext } from '../../../contexts/output.context';

import './output-viewer.styles.css';

const OutputViewer = () => {
  const { output } = useContext(OutputContext);

  let outputArray = output.map((output) => {
    const nameArray = [];
    output.forEach((name) => {
      nameArray.push(name);
      if (name !== output[output.length - 1]) {
        nameArray.push(' >> ');
      }
    });
    return nameArray;
  });

  outputArray = outputArray.map((arr) => {
    return arr.join(' ').toUpperCase();
  });

  return (
    <div className='output-viewer'>
      <div>
        <h2>Output Log</h2>

        <div className='results'>
          {outputArray.map((output, i) => {
            return (
              <div key={`output${i}`} className='results-output'>
                <span>
                  <strong>{output}</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OutputViewer;
