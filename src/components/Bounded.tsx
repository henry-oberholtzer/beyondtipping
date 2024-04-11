import clsx from "clsx"

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export default function Bounded({
  as: Comp = "section",
  className, 
  children, 
  ...restProps

}: BoundedProps){

  return (
    <Comp className="px-4 py-5 md:py-5 md:px-6 lg:py-5"
    {...restProps}>
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </Comp>
  )
}
