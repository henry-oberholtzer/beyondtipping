import Bounded from "../components/Bounded";
import Heading from "./Heading.tsx";
import Button from "./Button.tsx";


export default function WhyTipFree() {
  return (
    <Bounded>
    <Heading
      as="h1"
      size="xl"
      className="text-center lg:mt-24 md:mt-10 mb-10 font-bold"
      children={<h1>why support tip-free businesses?</h1>}
    />
    <p className="text-xl text-center font-body mb-8 lg:px-32  sm:px-0 md:px-0">
      Good question. Supporting tip-free restaurants that integrate fair wages
      ensures equitable compensation for all staff, fostering a more
      inclusive and sustainable work environment. By eliminating the reliance
      on tips, these establishments prioritize fair compensation, promote
      economic stability, and contribute to a more just and dignified
      restaurant industry for workers and patrons alike. Just like having your cake, and eating it too. 
    </p>
    <div className="flex justify-center lg:mb-24 md:mb-8 sm:mb-0">
  <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
    <Button to="/restaurants" buttonText="View Restaurant List" className="mb-0" />
    <Button to="/map" buttonText="View Restaurant Map" />
  </div>
</div>
  </Bounded>
  )
}