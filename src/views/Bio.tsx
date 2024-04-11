import Bounded from '../components/Bounded';
import Heading from '../components/Heading';
import { useLoaderData } from 'react-router-dom';

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
				as="h2"
				size="md"
				className="text-center mb-9 font-semibold"
				children={<p>About Us</p>}
			/>
			<div className="grid grid-cols1 gap-8">
				{bios.map(
					(item, index) =>
						item && (
							<div
								key={index}
								className="border bg-white shadow-lg rounded-lg px-8 md:px-14 py-10 md:py-16 grid content-between">
								<p className="text-xl md:text-2xl font-normal font-body text-slate-600 mb-8">
									{item.blurb}
								</p>

								<div className="flex items-center">
									<img
										width={56}
										height={56}
										src={item.imageUrl}
										className="rounded-full mr-4"
									/>
									<div>
										<p className="text-base font-medium text-slate-700">
											{item.name}
										</p>
										<p className="text-base text-slate-600">
											{item.contribution}
										</p>
									</div>
								</div>
							</div>
						)
				)}
			</div>
		</Bounded>
	);
};



export default Bios;
