import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function Button({
  className,
  ...restProps
}: PrismicNextLinkProps) {

  return (
      <PrismicNextLink

        className={clsx("black w-fit bg-rose-950 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display text-white font-bold text-base tracking-wide mb-2 md:mb-3 border-amber-50 border-2 mt-2", className)}

        {...restProps}
      />

   
  )
}