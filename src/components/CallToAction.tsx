import Bounded from "../components/Bounded";
import Heading from "./Heading.tsx";
import Button from "./Button.tsx";


export default function CallToAction() {
  return (
    <Bounded>
      <div className="max-w-4xl m-auto shadow-xl md:px-12 px-4 py-12 grid place-items-center rounded-lg bg-gradient-to-br from-rose-800 via-slate to-gray-500">
     <div className="text-center mb-4 md:mb-6">
          <Heading
            as="h2"
            size="lg"
            className="text-center mt-10 font-bold"
            children={<h1>missing restaurants?</h1>}
        />
      </div>
      <p className="text-lg text-center font-body max-w mb-10 px-5">Help us keep up-to-date with new restaurants that've integrated fare wages.</p>
      <div className="text-center mb-8 md:mb-10">
      <Button to="/form" buttonText="submit new restaurant" className="mb-8 md:mb-10" />
      </div>
      </div>
  </Bounded>
  )
}