import Button from "./Button";
import Heading from "./Heading";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Heading
        as="h1"
        size="xl"
        className="text-center font-bold mb-10"
        children={<h1>Oh! That's an error!</h1>}
      />
      <Button to="/" buttonText="Get me outta here!" />
    </div>
  );
}
