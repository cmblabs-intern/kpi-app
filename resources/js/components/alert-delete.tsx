import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface AlertDeletProps {
  onClick: () => void;
  service: string;
  children: React.ReactNode
}

const AlertDelete: React.FC<AlertDeletProps> = ({ onClick, service, children }) => {
  return ( 
    <div className='flex justify-center items-center'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
            Apakah Anda yakin ingin menghapus <span className='uppercase font-extrabold'>{service}</span>?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus <span className='uppercase font-extrabold'>{service}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
   );
}
 
export default AlertDelete;