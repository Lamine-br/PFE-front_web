import React, { useState, useRef } from "react";
import { FaSearch, FaMicrophone, FaCog } from "react-icons/fa";
import { Carousel } from "./Carousel";

export function BarreRecherche() {
	const [inputActive, setInputActive] = useState(false);
	const inputRef = useRef(null);

	const handleSearchIconClick = () => {
		setInputActive(true);
		inputRef.current.focus();
	};

	const [showSuggestions, setShowSuggestions] = useState(false);
	const suggestions = ["Option 1", "Option 2", "Option 3"];

	const carouselItems = [
		"Mix",
		"Musique",
		"Soolking",
		"En direct",
		"Lounis Aït Menguellet",
		"Hikaru Nakamura",
	];

	return (
		<div className='mb-40'>
			<div className='mt-20 mb-10 flex items-center justify-center w-full'>
				<div className={`relative flex bg-white items-center rounded-full`}>
					<FaSearch
						className={`text-gray-500 ml-4 mr-2 cursor-pointer ${
							inputActive && "text-blue-500"
						}`}
						onClick={handleSearchIconClick}
					/>

					<div className='w-1/2'>
						<input
							ref={inputRef}
							placeholder='Rechercher ...'
							className={` p-2 bg-white rounded-lg outline-none pr-8 ${
								inputActive && "border-none"
							}`}
							autoFocus={inputActive}
							onFocus={() => setShowSuggestions(true)}
							onBlur={() => setShowSuggestions(false)}
						/>

						{showSuggestions && (
							<div className='absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md'>
								{suggestions.map((suggestion, index) => (
									<div
										key={index}
										className='p-2 cursor-pointer hover:bg-gray-100 transition'
									>
										{suggestion}
									</div>
								))}
							</div>
						)}
					</div>

					<input
						placeholder='Métier'
						className={`w-1/4 p-2 border-l bg-white outline-none`}
					/>

					<input
						placeholder='Lieu'
						className={`w-1/4 p-2 border-l bg-white outline-none rounded-r-full`}
					/>
					<FaMicrophone className='text-gray-500 mx-2 cursor-pointer' />
					<FaCog className='text-gray-500 mx-2 mr-4 cursor-pointer'></FaCog>
				</div>
			</div>
			<div className='flex justify-center'>
				<Carousel items={carouselItems}></Carousel>
			</div>
		</div>
	);
}
