import React from "react";
import { FaTimes } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";

export function NouvelleOffre({ onClose }) {
	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 block`}
			/>
			<div className='fixed z-50 overlay flex flex-col items-center p-4 w-3/4 h-fit bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<h1 className='text-xl text-violet font-bold mb-6'>Nouvelle Offre</h1>
					<FaTimes
						className='cursor-pointer'
						color='#EEEDFF'
						onClick={onClose}
					/>
				</div>

				<div className='grid grid-cols-3 gap-8 mb-10 w-full'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nom</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Métier cible
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Description</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10 w-full'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Période</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Rémunération
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>
				<div className='w-full'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Ajouter"}
							width={"fit"}
							height={"fit"}
						></ButtonRond>
					</div>
				</div>
			</div>
		</div>
	);
}
