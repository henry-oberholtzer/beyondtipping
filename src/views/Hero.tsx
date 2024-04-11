import Bounded from "../components/Bounded";
import Button from "../components/Button";
import Heading from "../components/Heading";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="xl"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0">
      {children}</Heading>
  ),
  paragraph: ({ children }) => (<p className="text-xl font-body mb-4 md:mb-8 max-w-md">{children}</p>)
}

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <>
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
            <div className="grid grid-rows-[1fr,auto,auto] gap-8 h-fit">
              <p>TEXT TEXT TEXT</p>
              <p>TEXT TEXT TEXT</p>
              <Button 
                to="/"
                className="mb-8 md:mb-10" />
            </div>
            <img src=""
              className="dop-shaddow-xl max-w-4xl w-full" />
          </div>
        </Bounded>
    </>
  );

};

export default Hero;
