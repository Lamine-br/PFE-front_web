import React, { useState, useRef } from "react";
import { FaSearch, FaMicrophone, FaCog } from "react-icons/fa";

export function BarreRecherche() {
	const [inputActive, setInputActive] = useState(false);
	const inputRef = useRef(null);

	const handleSearchIconClick = () => {
		setInputActive(true);
		inputRef.current.focus();
	};

	return (
		<div className='mt-20 mb-40 w-1/2 mx-auto flex items-center justify-center'>
			<div className={`flex bg-white items-center rounded-lg`}>
				<FaSearch
					className={`text-gray-500 ml-2 cursor-pointer ${
						inputActive && "text-blue-500"
					}`}
					onClick={handleSearchIconClick}
				/>
				<input
					ref={inputRef}
					placeholder='Rechercher ...'
					className={`p-2 bg-white rounded-lg outline-none pr-8 ${
						inputActive && "border-none"
					}`}
					autoFocus={inputActive}
					onBlur={() => setInputActive(false)}
				/>
				<FaMicrophone className='text-gray-500 mx-2 cursor-pointer' />
				<FaCog className='text-gray-500 mx-2 cursor-pointer'></FaCog>
			</div>
		</div>
	);
}
