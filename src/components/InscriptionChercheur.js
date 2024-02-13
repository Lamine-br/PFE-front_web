import React from "react";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload } from "react-icons/fa";

export function InscriptionChercheur() {
	return (
		<div className='overlay flex justify-center'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					S'inscrire - Chercheur d'emplois
				</h1>

				<div className='grid grid-cols-4 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nom</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Prénom</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Date de naissance
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 text-sm focus:outline-none focus:border-blue-500'
							type='date'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Nationalité</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-4 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Numéro de téléphone
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Email</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Ville</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
					<div>
						<label
							htmlFor='fileInput'
							className='text-violet text-xs font-bold'
						>
							Déposez votre CV
						</label>
						<div className='relative '>
							<input
								type='file'
								id='fileInput'
								name='fileInput'
								accept='.csv, .xlsx, .xls'
								className='sr-only'
							/>
							<label
								htmlFor='fileInput'
								className='cursor-pointer flex items-center justify-center w-1/2 p-2 rounded-md bg-violet text-bleuF text-sm font-bold hover:bg-blue-100'
							>
								<FaFileUpload className='mr-2' /> Importer
							</label>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col col-span-2'>
						<label className='text-violet text-xs font-bold'>
							Commentaires
						</label>
						<textarea
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							rows='4'
						></textarea>
					</div>
				</div>

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
