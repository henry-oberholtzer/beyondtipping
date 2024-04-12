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
    <Comp className="px-2 py-3 md:px-4"
    {...restProps}>
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </Comp>
  )
}
