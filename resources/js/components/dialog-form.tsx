import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface DialogFormProps {
  buttonAction: ReactNode;
  className?: string;
  headerTitle: string;
  headerDescription: string;
  children?: ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogForm: React.FC<DialogFormProps> = ({
  buttonAction,
  headerTitle,
  headerDescription,
  isDialogOpen,
  setIsDialogOpen,
  children,
  className,
}) => {
  return (
    <div className='flex justify-center items-center'>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className={cn(
                'flex bg-sky-600 hover:bg-sky-600/85 text-xs md:text-sm text-white rounded-sm uppercase font-semibold max-w-[6.5rem] w-full',
                className
              )}
            >
              {buttonAction}
            </Button>
          </DialogTrigger>
        <DialogContent forceMount >
          <DialogHeader className='flex flex-col justify-center items-center'>
            <DialogTitle className='uppercase'>{headerTitle}</DialogTitle>
            <DialogDescription>{headerDescription}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogForm;
