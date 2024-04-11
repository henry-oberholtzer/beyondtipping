import Bounded from "../components/Bounded";
import Button from "../components/Button";
import Heading from "../components/Heading";

const Hero = () => {
  return (
    <>
      <Bounded>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-fit lg:pt-16 md:pt-18 md:pb-18 place-items-center">
          <div className="flex flex-col gap-8 md:col-span-1 md:px-20">
            <Heading as="h1" size="xl" className="font-bold mt-12">
              ready to move beyondtipping?
            </Heading>
            <p className="text-xl font-body max-w-md">
              We've got you. Check out our list of tip-free fair-wage restaurants in the PDX area.
            </p>
            <Button to="/restaurants" buttonText="view restaurants" className="mb-8 md:mb-10" />
          </div>

          <div className="md:col-span-1 md:row-span-2">
            <img src="src/assets/img/food.jpg" alt="Food" className="drop-shadow-xl max-w-4xl w-full" />
          </div>
        </div>
      </Bounded>
    </>
  );

};

export default Hero;
