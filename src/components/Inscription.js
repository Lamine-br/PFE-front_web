import React from "react";
import { useState } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaTimes } from "react-icons/fa";

export function Inscription({ onClose }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const handleRedirection = () => {
		if (selectedOption == "option1") {
			window.location.href = "/register/chercheur";
		}
		if (selectedOption == "option2") {
			window.location.href = "/register/employeur";
		}
	};

	return (
		<div className='fixed z-50 overlay flex flex-col justify-center items-center p-4 w-1/3 h-4/5 bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
			<div className='flex justify-end w-full'>
				<FaTimes
					className='cursor-pointer absolute top-4 right-4'
					color='#EEEDFF'
					onClick={onClose}
				/>
			</div>
			<h1 className='text-xl text-violet font-bold mb-6'>S'inscrire</h1>

			<div className='flex flex-col m-2 w-3/4'>
				<p className='text-violet text-sm font-semibold'>
					Vous voulez vous inscrire en tant que :{" "}
				</p>
			</div>

			<div className='w-3/4 m-4'>
				<label className='flex items-center justify-start bg-violet w-full p-2 rounded-lg'>
					<input
						type='radio'
						name='options'
						className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
						checked={selectedOption === "option1"}
						onChange={() => handleOptionChange("option1")}
					/>
					<span className='ml-2 text-bleuF font-bold text-sm'>
						Chercheur d'emplois
					</span>
				</label>

				<label className='flex items-center justify-start mt-1 bg-violet w-full p-2 rounded-lg'>
					<input
						type='radio'
						name='options'
						className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
						checked={selectedOption === "option2"}
						onChange={() => handleOptionChange("option2")}
					/>
					<span className='ml-2 text-bleuF font-bold text-sm'> Employeur</span>
				</label>

				<label className='flex items-center justify-start  mt-1 bg-violet w-full p-2 rounded-lg'>
					<input
						type='radio'
						name='options'
						className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
						checked={selectedOption === "option3"}
						onChange={() => handleOptionChange("option3")}
					/>
					<span className='ml-2 text-bleuF font-bold text-sm'>
						Agence d'intérim
					</span>
				</label>
			</div>

			<ButtonRond
				couleur={"rouge"}
				couleurTexte={"violet"}
				contenu={"Continuer"}
				width={"w-3/4"}
				height={"fit"}
				onClick={handleRedirection}
			></ButtonRond>

			<div className='flex mt-8'>
				<p className='text-xs text-violet'>Vous avez un compte ? </p>
				<p className='text-xs text-rouge underline ml-1'>S'authentifier</p>
			</div>
		</div>
	);
}
