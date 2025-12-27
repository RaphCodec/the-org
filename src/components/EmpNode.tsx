import { useCallback } from 'react';
import { Handle } from '@xyflow/react';

function EmployeeNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="bg-white border-2 p-2 rounded ">
        <Handle type='target' position='top'/>
        <Handle type='source' position='bottom'/>
      <div>
        <label htmlFor="text">Text Emp:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
    </div>
  );
}

export default EmployeeNode;
