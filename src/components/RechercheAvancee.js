import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";
import { Criteres } from "./Criteres";

export function RechercheAvancee({ onClose, onConfirm }) {
	const [showInput, setShowInput] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [showCriteres, setShowCriteres] = useState(false);

	const ajouterCriteres = (inputs) => {
		const nouveauShowInput = [...showInput];
		inputs.forEach((critere, index) => {
			if (critere) {
				nouveauShowInput[index] = true;
			}
		});
		setShowInput(nouveauShowInput);
		setShowCriteres(false);
	};

	const supprimerCritere = (index) => {
		const nouveauxCriteres = [...showInput];
		nouveauxCriteres[index] = false;
		setShowInput(nouveauxCriteres);
	};

	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 block`}
			/>
			<div className='fixed z-20 overlay flex flex-col items-center p-4 w-1/2 h-fit bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<div>
						<h1 className='text-xl text-violet font-bold'>Recherche Avancée</h1>
						<p className='text-sm text-violet'>
							Faites une recherche avancée selon plusieurs critères pour trouver
							l’offre la plus adaptée à votre profil.
						</p>
					</div>
					<FaTimes
						className='cursor-pointer'
						color='#EEEDFF'
						onClick={onClose}
					/>
				</div>

				<div className='flex justify-center items-center gap-4 mb-4'>
					<p className='text-violet font-bold'>Ajouter un critère</p>
					<button
						className='flex justify-center items-center bg-rouge text-violet p-1 rounded-full'
						onClick={() => setShowCriteres(true)}
					>
						<FaPlus size={15} />
					</button>
				</div>

				{showInput[0] && (
					<div className='grid grid-cols-6 gap-8 mb-6 w-full'>
						<div className='flex justify-start items-center'>
							<p className='text-violet font-bold'>Dates</p>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='Date'
							></input>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='Date'
							></input>
						</div>
						<div className='flex justify-center items-center'>
							<button
								className='flex justify-center items-center bg-rouge p-1 rounded-full'
								onClick={() => supprimerCritere(0)}
							>
								<FaTimes color='#EEEDFF' />
							</button>
						</div>
					</div>
				)}

				{showInput[1] && (
					<div className='grid grid-cols-6 gap-8 mb-6 w-full'>
						<div className='flex justify-start items-center'>
							<p className='text-violet font-bold'>Salaire</p>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='number'
							></input>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='number'
							></input>
						</div>
						<div className='flex justify-center items-center'>
							<button
								className='flex justify-center items-center bg-rouge p-1 rounded-full'
								onClick={() => supprimerCritere(1)}
							>
								<FaTimes color='#EEEDFF' />
							</button>
						</div>
					</div>
				)}

				{showInput[2] && (
					<div className='grid grid-cols-6 gap-8 mb-6 w-full'>
						<div className='flex justify-start items-center'>
							<p className='text-violet font-bold'>Entreprise</p>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
							></input>
						</div>
						<div className='col-span-2'></div>
						<div className='flex justify-center items-center'>
							<button
								className='flex justify-center items-center bg-rouge p-1 rounded-full'
								onClick={() => supprimerCritere(2)}
							>
								<FaTimes color='#EEEDFF' />
							</button>
						</div>
					</div>
				)}

				{showInput[3] && (
					<div className='grid grid-cols-6 gap-8 mb-6 w-full'>
						<div className='flex justify-start items-center'>
							<p className='text-violet font-bold'>Lieu</p>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
							></input>
						</div>
						<div className='col-span-2'></div>

						<div className='flex justify-center items-center'>
							<button
								className='flex justify-center items-center bg-rouge p-1 rounded-full'
								onClick={() => supprimerCritere(3)}
							>
								<FaTimes color='#EEEDFF' />
							</button>
						</div>
					</div>
				)}

				{showInput[4] && (
					<div className='grid grid-cols-6 gap-8 mb-6 w-full'>
						<div className='flex justify-start items-center'>
							<p className='text-violet font-bold'>Horaires</p>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='number'
							></input>
						</div>
						<div className='flex flex-col col-span-2'>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='number'
							></input>
						</div>
						<div className='flex justify-center items-center'>
							<button
								className='flex justify-center items-center bg-rouge p-1 rounded-full'
								onClick={() => supprimerCritere(4)}
							>
								<FaTimes color='#EEEDFF' />
							</button>
						</div>
					</div>
				)}

				<div className='w-full mt-6'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Rechercher"}
							width={"fit"}
							height={"fit"}
							onClick={onConfirm}
						></ButtonRond>
					</div>
				</div>
			</div>

			{showCriteres && (
				<Criteres
					onConfirm={(inputs) => ajouterCriteres(inputs)}
					onDismiss={() => setShowCriteres(false)}
				/>
			)}
		</div>
	);
}
