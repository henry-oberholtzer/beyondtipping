import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio"
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-9 font-semibold">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb font-medium sm:text-left text-center"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-xl md:text-2xl font-normal font-body text-slate-600 mb-8">
      {children}
    </p>
  )
}

/**
 * Props for `Bios`.
 */
export type BiosProps = SliceComponentProps<Content.BiosSlice>;

/**
 * Component for "Bios" Slices.
 */
const Bios = async ({ slice }: BiosProps): Promise<JSX.Element> => {

  const client = createClient();

  const bios = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.bio) && item.bio.uid
      ) {
        return client.getByUID("bio", item.bio.uid)
      }
    })
  )


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

<PrismicRichText components={components} field={slice.primary.heading} />
    <div className="grid grid-cols1 gap-8">
      {bios.map((item, index) => item && (
        <div key={index} className="border bg-white shadow-lg rounded-lg px-8 md:px-14 py-10 md:py-16 grid content-between">
          <PrismicRichText field={item.data.blurb} components={components}/> 

          <div className="flex items-center">
          <PrismicNextImage width={56} height={56} field={item.data.avatar} className="rounded-full mr-4" imgixParams={{ar: "1:1", fit:"crop"}}/>
          <div>
            <p className="text-base font-medium text-slate-700">{item.data.name}</p>
            <p className="text-base text-slate-600">{item.data.contribution}</p>
          </div>

          </div>

          </div>
      ))}
    </div>
 

    </Bounded>
  );
};

export default Bios;




