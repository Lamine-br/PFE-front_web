import React from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { FaTimes } from "react-icons/fa";
import google from "../assets/google.png";

export function CadreP({ className, onClick }) {
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
		<div
			className={`bg-violet rounded-lg w-full ${className} cursor-pointer`}
			onClick={onClick}
		>
			<div className='flex w-full px-4 py-2'>
				<img
					className='rounded-full w-12 h-12 border border-bleuF'
					src={google}
				></img>

				<div className='flex flex-col w-full pl-4'>
					<div className='flex justify-between'>
						<div>
							<p className='text-bleuF font-bold'>{Offre.titre}</p>
							<p className='text-bleuF'>{Offre["Date de publication"]}</p>
						</div>
						<div>
							<FaTimes className='cursor-pointer' color='#465475' />
						</div>
					</div>
					<div className='flex items-center justify-between mt-2 mr-6'>
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
			</div>
		</div>
	);
}
