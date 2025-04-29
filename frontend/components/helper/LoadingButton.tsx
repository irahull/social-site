import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants > {
    isLoading:boolean;
    children:React.ReactNode;
}
const LoadingButton = ({isLoading, children , ...props}:Props) => {
  return (
    <Button disabled={isLoading} {...props}>
        {isLoading ? <Loader className='animate-spin mr-2 text-3xl'/> : ""}
        {children}
    </Button>
  )
}

export default LoadingButton