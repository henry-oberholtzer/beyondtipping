import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      
        <div className="grid grid-cols-1 place-items-center txt-center">
      <PrismicRichText field={slice.primary.heading}
       components={{
        heading1: ({children}) => (<h1 className="text-5xl md:text-7xl font-display">{children}</h1>
        )
      }} />
      <PrismicRichText field={slice.primary.body} components={{
        paragraph: ({children}) => (<p className="text-xl text-center font-body mt-2 mb-4 md:mb-8 max-w-md">{children}</p>)
      }} />
      <Button field={slice.primary.button_link} className="mb-8 md:mb-10">
        <>{slice.primary.button_text}</>
       </Button>
      <PrismicNextImage 
      field={slice.primary.image} 
      className="dop-shaddow-xl max-w-4xl w-full"/>
      </div>
  
    </Bounded>
  );
};

export default Hero;
