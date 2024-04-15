
import Bounded from "./Bounded";
import Button from "./Button";
import Heading from "./Heading";


<Heading
as="h1"
size="xl"
className="text-center mt-10 font-bold"
children={<h1>tip-free restaurant map</h1>}
/>

export const Confirmation = () => {
    return (
        <>
        <Bounded>
            <Heading
                as="h1"
                size="xl"
                className="text-center lg:mt-48 md:mt-32 mt-10 font-bold mb-10"
                children={<h1>Thank you for your submission!</h1>}
            />
            <p className="text-xl text-center font-body lg:mb-8 md:mb-12 sm:mb-24 lg:px-32 sm:px-0 md:px-0">
                An administrator will review your restaurant soon.
            </p>
            <br/>
            <div className="flex justify-center lg:mb-24 md:mb-8 sm:mb-0">
  <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 sm:mb-12 lg:mb-8">
    <Button to="/restaurants" buttonText="return to restaurant list" className="mb-0" />
    <Button to="/map" buttonText="return to restaurant map" />
  </div>
</div>
        </Bounded>
    </>
);
};

