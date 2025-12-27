import { useState } from 'react';
import type { NodeProps, Node as XYNode } from '@xyflow/react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

export type EmployeeNode = XYNode<
  {
    name?: string;
    title?: string;
    departmentCode?: string;
    department?: string;
    salary?: number;
  },
  'employee'
>;

export default function EmployeeNode({ data }: NodeProps<EmployeeNode>) {
  const [name, setName] = useState<string | null>(data?.name ?? null);
  const [title, setTitle] = useState<string | null>(data?.title ?? null);
  const [departmentCode, setDepartmentCode] = useState<string | null>(data?.departmentCode ?? null);
  const [department, setDepartment] = useState<string | null>(data?.department ?? null);
  const [salary, setSalary] = useState<number | null>(data?.salary ?? null);
 
  return (
    <div className="fill border-2 p-2 rounded h-28 w-64 bg-base-100">
        <Handle type='target' position={Position.Top}/>
        <Handle type='source' position={Position.Bottom}/>
      <div>
        <p className='text text-base font-bold font-mono'>{name}</p>
        <p className='text text-sm'>{title}</p>
        <p className='text text-xs'>{departmentCode}</p>
        <p className='text text-xs'>{department}</p>
        <p className='text text-xs'>{salary}</p>
      </div>
    </div>
  );
}

// function EmployeeNode() {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div className="fill border-2 p-2 rounded h-44 w-64 bg-base-100">
//         <Handle type='target' position='top'/>
//         <Handle type='source' position='bottom'/>
//       <div>
//         <label className='text'>Name:</label>
//       </div>
//     </div>
//   );
// }

// export default EmployeeNode;
