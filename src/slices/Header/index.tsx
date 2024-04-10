import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading"
import Button from "@/components/Button";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="xl"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0">
      {children}</Heading>
  ),
  paragraph: ({ children }) => (<p className="text-lg font-body max-w-md text-center mb-0">{children}</p>)
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
    <>
    {slice.variation === "default" && (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 place-items-center txt-center">
      <PrismicRichText field={slice.primary.title} components={components}/>
      <PrismicRichText field={slice.primary.body} components={components} />
      </div>
    </Bounded>
    )}
       {slice.variation === "withButton" && (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 place-items-center txt-center">
      <PrismicRichText field={slice.primary.title} components={components}/>
      <PrismicRichText field={slice.primary.body} components={components} />
      <Button field={slice.primary.button_link} >
        <>{slice.primary.button_text}</>
      </Button>
      </div>
    </Bounded>
    )}
    </>
  );
};

export default Header;
