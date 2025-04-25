import { ReactNode } from 'react';

const DataTableAction = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col gap-2 my-2 py-2'>{children}</div>;
}
 
export default DataTableAction;