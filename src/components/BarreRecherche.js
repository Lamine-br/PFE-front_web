import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaMicrophone, FaCog } from "react-icons/fa";
import { Carousel } from "./Carousel";

export function BarreRecherche({ onClick }) {
	const [inputActive, setInputActive] = useState(false);
	const inputRef = useRef(null);
	const suggestionsRef = useRef(null);

	const handleSearchIconClick = () => {
		setInputActive(true);
		inputRef.current.focus();
	};

	const handleClick = (item) => {
		onClick(item);
		setInputActive(false);
	};

	const [showSuggestions, setShowSuggestions] = useState(false);
	const suggestions = ["Développeur", "Jardinier", "Peintre"];

	const carouselItems = [
		"Développeur Web",
		"Assistant Administratif",
		"Technicien de Maintenance",
		"Agent de Sécurité",
		"Infirmier Intérimaire",
		"Magasinier",
		"Serveur/Serveuse en Intérim",
	];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div>
			<div className='mt-20 mb-10 flex items-center justify-center w-full'>
				<div className={`relative flex bg-white items-center rounded-full`}>
					<FaSearch
						className={`text-gray-500 ml-4 mr-2 cursor-pointer ${
							inputActive && "text-blue-500"
						}`}
						onClick={handleSearchIconClick}
					/>

					<div className='w-1/2' ref={suggestionsRef}>
						<input
							ref={inputRef}
							placeholder='Rechercher ...'
							className={` p-2 bg-white rounded-lg outline-none pr-8 ${
								inputActive && "border-none"
							}`}
							autoFocus={inputActive}
							onFocus={() => setShowSuggestions(true)}
						/>

						{showSuggestions && (
							<div className='absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md'>
								{suggestions.map((suggestion, index) => (
									<div
										key={index}
										className='p-2 cursor-pointer hover:bg-gray-100 transition'
										onClick={() => {
											handleClick(suggestion);
											setShowSuggestions(false);
										}}
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
				<Carousel items={carouselItems} onClick={onClick}></Carousel>
			</div>
		</div>
	);
}
