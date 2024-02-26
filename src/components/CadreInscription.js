import React from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";

export function CadreInscription() {
	return (
		<div className='w-full bg-violet rounded-lg px-10 py-4'>
			<div className='flex'>
				<div>
					<p className='text-bleuF font-bold text-xl'>KPMG</p>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>Alger</p>
					</div>
				</div>
				<div className='flex items-center space-x-6 ml-auto my-auto'>
					<ButtonRond
						couleur={"violet"}
						couleurTexte={"bleuF"}
						contenu={"Contacter"}
						width={"fit border border-bleuF"}
						height={"h-8"}
					></ButtonRond>
					<div>
						<FaEllipsisV />
					</div>
				</div>
			</div>
			<div className='py-6 space-y-4'>
				<p className='text-bleuF font-bold text-lg'>A propos de l’empoyeur</p>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom de l’entreprise</p>
						<p className='text-sm text-bleuF'>KPMG</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom d’un service/département</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>
							Nom d’un sous service/sous département
						</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
				</div>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col col-span-2 space-y-1'>
						<p className='text-bleuF font-bold'>
							Numéro nationale de l’entité dépositaire d’annonces
						</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>

					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Adresse</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
				</div>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom personne contact 1</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Adresse mail 1 </p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Numéro téléphone 1</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
				</div>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom personne contact 2</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Adresse mail 2 </p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Numéro téléphone 2</p>
						<p className='text-sm text-bleuF'>-</p>
					</div>
				</div>
			</div>

			<div className='flex justify-end m-4 space-x-2'>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Refuser"}
					width={"fit"}
					height={"fit"}
					onClick={() => {}}
				/>
				<ButtonRond
					couleur={"bleuF"}
					couleurTexte={"violet"}
					contenu={"Accepter"}
					width={"fit"}
					height={"fit"}
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}
