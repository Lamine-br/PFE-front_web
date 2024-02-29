import React, { useState } from "react";
import { Spinner } from "./Spinner";

export const Carousel = ({ items }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (index) => {
		setSelectedItem(index);
	};

	return (
		<div className='flex'>
			<div className='flex space-x-4 overflow-x-auto max-w-screen'>
				<div className='flex space-x-4'>
					{items.map((item, index) => (
						<p
							key={index}
							onClick={() => handleClick(index)}
							className={`${
								selectedItem === index
									? "bg-bleuF text-white"
									: "bg-white text-bleuF"
							} px-2 py-1 rounded-lg font-semibold cursor-pointer hover:filter hover:brightness-90 transition-all duration-300`}
						>
							{item}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};
