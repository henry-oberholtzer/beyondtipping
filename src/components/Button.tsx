import clsx from "clsx";
import { Link, LinkProps } from 'react-router-dom'

export default function Button ({
  className,
  buttonText, 
  ...restProps
}: ButtonProps){
  return (

    <Link
    className={
    clsx("black w-fit bg-rose-950 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display text-white font-bold text-base tracking-wide mb-8 md:mb-10 border-amber-50 border-2", className)}
    {...restProps}
    >
    {buttonText}
    </Link>
  )
}

interface ButtonProps extends LinkProps {
  className?: string;
  buttonText?: string;
}
