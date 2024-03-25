import React, { useState } from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import esi from "../assets/logo_esi.png";
import { Modal } from "./Modal";
import {
	fDate,
	fToNow,
	getCurrentDateTime,
	calculateDuration,
} from "../util/formatTime";

export function Cadre({ Offre }) {
	const [showOptions, setShowOptions] = useState(false);

	const redirect = () => {
		window.location.href = "/offres/" + Offre._id;
	};

	return (
		<div className='bg-violet rounded-lg'>
			<div className='flex px-4 py-2'>
				<img className='rounded-full  w-12 h-12' src={esi}></img>
				<div className='ml-4'>
					<p className='text-bleuF font-bold'>{Offre.employeur.entreprise}</p>
					<p className='text-bleuF'>{fDate(Offre.date)}</p>
				</div>
				<div className='ml-auto my-auto'>
					<Modal />
				</div>
			</div>
			<div>
				<img
					className='border-t border-b border-black w-full h-48'
					src={esi}
				></img>
			</div>
			<div className='w-full px-4'>
				<p className='text-bleuF font-bold'>{Offre.titre}</p>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>Alger</p>
					</div>
					<div className='flex items-center'>
						<FaDollarSign color='#465475' />
						<p className='text-bleuF'>{Offre.remuneration}</p>
					</div>
					<div className='flex items-center'>
						<TiTime size={20} color='#465475' />
						<p className='text-bleuF ml-1'>
							{calculateDuration(Offre.debut, Offre.fin)}
						</p>
					</div>
				</div>
			</div>
			<div>
				<p className='mx-4 my-4 text-sm text-bleuF max-h-20 overflow-hidden truncate'>
					{Offre.description}{" "}
				</p>
			</div>
			<div className='flex justify-end m-4'>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Condidater"}
					width={"fit"}
					height={"fit"}
					onClick={redirect}
				></ButtonRond>
			</div>
		</div>
	);
}
