import React from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";

export function Cadre() {
	let Offre = {
		employeur: "KPMG",
		"Date de publication": "12 Décembre, 20:20",
		titre: "Jardinier",
		Localisation: "Alger",
		Salaire: "10$/heure",
		Duree: "2 semaines",
		Description:
			"Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.",
	};

	return (
		<div className='bg-violet rounded-lg'>
			<div className='flex px-4 py-2'>
				<img className='rounded-full bg-rouge w-12 h-12'></img>
				<div className='ml-4'>
					<p className='text-bleuF font-bold'>{Offre.employeur}</p>
					<p className='text-bleuF'>{Offre["Date de publication"]}</p>
				</div>
				<div className='ml-auto my-auto'>
					<FaEllipsisV />
				</div>
			</div>
			<div>
				<img className=' bg-rouge w-full h-48'></img>
			</div>
			<div className='w-full px-4'>
				<p className='text-bleuF font-bold'>{Offre.titre}</p>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>{Offre.Localisation}</p>
					</div>
					<div className='flex items-center'>
						<FaDollarSign color='#465475' />
						<p className='text-bleuF'>{Offre.Salaire}</p>
					</div>
					<div className='flex items-center'>
						<TiTime size={20} color='#465475' />
						<p className='text-bleuF ml-1'>{Offre.Duree}</p>
					</div>
				</div>
			</div>
			<div>
				<p className='mx-4 my-4 text-sm text-bleuF max-h-20 overflow-hidden truncate'>
					{Offre.Description}{" "}
				</p>
			</div>
			<div className='flex justify-end m-4'>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Condidater"}
					width={"fit"}
					height={"fit"}
				></ButtonRond>
			</div>
		</div>
	);
}
