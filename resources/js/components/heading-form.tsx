interface HeadingFormProps {
    title: string;
    description: string;
}

const HeadingForm: React.FC<HeadingFormProps> = ({ title, description }) => {
    return (
        <div className="text-center">
          <h2 className='lg:text-xl text-md font-bold tracking-tight uppercase'>{ title }</h2>
          <p className='md:text-sm text-xs text-muted-foreground'>{ description }</p>
        </div>
    );
};

export default HeadingForm;
