import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading}
       components={{
        heading1: ({children}) => (<h1 className="text-5xl md:text-7xl font-display">{children}</h1>
        )
      }} />
      <PrismicRichText field={slice.primary.body} components={{
        paragraph: ({children}) => (<p className="text-2xl text-center font-body mb-4 md:mb-8 max-w-md">{children}</p>)
      }} />
      <PrismicNextLink field={slice.primary.button_link}><>{slice.primary.button_text}</></PrismicNextLink>
      <PrismicNextImage field={slice.primary.image} />
      
    </section>
  );
};

export default Hero;
