import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading"

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="xl"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0">
      {children}</Heading>
  ),
  paragraph: ({ children }) => (<p className="text-lg font-body max-w-md text-center">{children}</p>)
}

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>;

/**
 * Component for "Header" Slices.
 */
const Header = ({ slice }: HeaderProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 place-items-center txt-center">
      <PrismicRichText field={slice.primary.title} components={components}/>
      <PrismicRichText field={slice.primary.body} components={components} />
      </div>
    </Bounded>
    
  );
};

export default Header;
