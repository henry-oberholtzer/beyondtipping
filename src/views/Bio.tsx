import Bounded from '../components/Bounded';
import Heading from '../components/Heading';
import { useLoaderData } from 'react-router-dom';
import Button from '../components/Button';

const Bios = () => {
  const bios = useLoaderData() as Bio[]
  
	return (
		<Bounded>
		<Heading
			as="h1"
			size="xl"
			className="text-center mb-3 font-bold"
			children={<h1>about us</h1>}
		/>
		<p className="text-xl text-center font-body max-w mb-5 px-5">
			We're a team of junior developers passionate about fair-wages and good eats. Learn more about us below!
		</p>
        <div className="flex justify-center mt-8">
        <Button to="https://github.com/henry-oberholtzer/beyondtipping" buttonText="Go to GitHub repo" />
      </div>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {bios.map(
    (item, index) =>
        item && (
            <div
                key={index}
                className="border-2 border-red-950 bg-gradient-to-br from-black to-gray-900 shadow-lg rounded-lg px-8 md:px-14 py-6 md:py-10 grid content-between">
                <div className="flex items-center">
                    <img
                        width={100}
                        height={100}
                        src={item.imageUrl}
                        className="rounded-full mr-4"
                    />
                    <div>
                        <p className="text-2xl font-medium">
                            {item.name}
                        </p>
                        <p className="text-base ">
                            {item.contribution}
                        </p>
                    </div>
                </div>
                
                <p className="text-sm md:text-lg mt-3 font-normal font-body mb-8">
                    {item.blurb}
                </p>
                
                <div className="flex justify-center">
                    <Button to={item.buttonLink} buttonText={item.buttonText} />
                </div>
            </div>
        )
)}
</div>
	</Bounded>
	);
};



export default Bios;
