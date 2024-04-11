import Bounded from '../components/Bounded';
import Heading from '../components/Heading';
import { useLoaderData } from 'react-router-dom';
import Button from '../components/Button';

// const components = {
// 	heading2: (text: string) => (
// 		<Heading
// 			as="h2"
// 			size="md"
// 			className="text-center mb-9 font-semibold">
// 			{text}
// 		</Heading>
// 	),
// 	heading3: (text: string) => (
// 		<Heading
// 			as="h3"
// 			size="sm"
// 			className="mb font-medium sm:text-left text-center">
// 			{text}
// 		</Heading>
// 	),
// 	paragraph: (text: string) => (
// 		<p className="text-xl md:text-2xl font-normal font-body text-slate-600 mb-8">
// 			{text}
// 		</p>
// 	),
// };

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
		<div className="grid grid-cols-2 gap-8">
			{bios.map(
				(item, index) =>
					item && (
						<div
							key={index}
							className="border bg-gradient-to-br from-amber-50 to-gray-50 shadow-lg rounded-lg px-8 md:px-14 py-6 md:py-10 grid content-between">
							<div className="flex items-center">
								<img
									width={80}
									height={80}
									src={item.imageUrl}
									className="rounded-full mr-4"
								/>
								<div>
									<p className="text-2xl font-medium text-slate-700">
										{item.name}
									</p>
									<p className="text-base text-slate-600">
										{item.contribution}
									</p>
								</div>
							</div>

							
							<p className="text-sm md:text-lg mt-3 font-normal font-body text-slate-600 mb-8">
								{item.blurb}
							</p>
							<Button to={item.buttonLink} buttonText={item.buttonText} className="mb-8 md:mb-10" />
						</div>
					)
			)}
		</div>
	</Bounded>
	);
};



export default Bios;
