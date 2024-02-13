import React from "react";
import { ButtonRond } from "./ButtonRond";

export function InscriptionEmployeur({ onPass }) {
	return (
		<div className='overlay flex justify-center'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					S'inscrire - Employeur
				</h1>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom de l'entreprise / Employeur
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom d’un service/département
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom d’un sous service/sous département
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col col-span-2'>
						<label className='text-violet text-xs font-bold'>
							Numéro nationale de l’entité dépositaire d’annonces
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Adresse</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom personne contact 1
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Adresse mail contact 1
						</label>
						<input
							className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Numéro téléphone 1
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Nom personne contact 2
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Adresse mail contact 2
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Numéro téléphone 2
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
						></input>
					</div>
				</div>

				<p className='text-violet text-sm font-bold ml-4 mb-2'>Liens publics</p>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Site web</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Facebook</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Linkedin</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
						></input>
					</div>
				</div>

				<div className='flex justify-end mr-4'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-1/4"}
						height={"fit"}
						onClick={onPass}
					></ButtonRond>
				</div>
			</div>
		</div>
	);
}
