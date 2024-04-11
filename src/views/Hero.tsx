import Bounded from "../components/Bounded";
import Button from "../components/Button";
import Heading from "../components/Heading";

const Hero = () => {
  return (
    <>
        <Bounded
        >
        <Heading
      as="h1"
      size="xl"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0"
      children={<p>OK</p>} >
        </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
            <div className="grid grid-rows-[1fr,auto,auto] gap-8 h-fit">
              <p className="text-xl font-body mb-4 md:mb-8 max-w-md">TEXT TEXT TEXT</p>
              <p className="text-xl font-body mb-4 md:mb-8 max-w-md">TEXT TEXT TEXT</p>
              <Button 
                to="/"
                className="mb-8 md:mb-10" />
            </div>
            <img src="https://live.staticflickr.com/3036/2869854667_7304d2568e_c_d.jpg"
              className="dop-shaddow-xl max-w-4xl w-full" />
          </div>
          
        </Bounded>
    </>
  );

};

export default Hero;
