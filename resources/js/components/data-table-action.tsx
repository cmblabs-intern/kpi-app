import { ReactNode } from 'react';

const DataTableAction = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col w-full gap-y-2 p-1'>{children}</div>;
}
 
export default DataTableAction;