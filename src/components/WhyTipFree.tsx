import Bounded from "../components/Bounded";
import Heading from "./Heading.tsx";
import Button from "./Button.tsx";


export default function WhyTipFree() {
  return (
    <Bounded>
      <Heading
			as="h1"
			size="xl"
			className="text-center mt-10 mb-10 font-bold"
			children={<h1>why support tip-free business?</h1>}
		/>
    <p className="text-xl text-center font-body max-w mb-5 px-5 mb-10">Good question. Supporting tip-free restaurants that integrate fair wages ensures equitable compensation for all staff, fostering a more inclusive and sustainable work environment. By eliminating the reliance on tips, these establishments prioritize fair compensation, promote economic stability, and contribute to a more just and dignified restaurant industry for workers and patrons alike.</p>
    <div className="text-center mb-8 md:mb-10">
  <div className="grid grid-cols-2 gap-4 justify-center">
    <Button to="/map" buttonText="View Restaurant Map" className=" max-w-sm" />
    <Button to="/list" buttonText="View Restaurant List" className=" max-w-sm" />
  </div>
</div>
    </Bounded>
  )
}