import React from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";

export function Cadre() {
	return (
		<div className='bg-violet rounded-lg'>
			<div className='flex px-4 py-2'>
				<img className='rounded-full bg-rouge w-12 h-12'></img>
				<div className='ml-4'>
					<p className='text-bleuF font-bold'>KPMG</p>
					<p className='text-bleuF'>12 Décembre, 20:20</p>
				</div>
				<div className='ml-auto my-auto'>
					<FaEllipsisV />
				</div>
			</div>
			<div>
				<img className=' bg-rouge w-full h-48'></img>
			</div>
			<div className='w-full px-4'>
				<p className='text-bleuF font-bold'>Jardinier</p>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<MdLocationOn />
						<p className='text-bleuF'>Alger</p>
					</div>
					<div className='flex items-center'>
						<FaDollarSign />
						<p className='text-bleuF'>10$/heure</p>
					</div>
					<div className='flex items-center'>
						<TiTime size={20} />
						<p className='text-bleuF ml-1'>2 semaines</p>
					</div>
				</div>
			</div>
			<div>
				<p className='mx-4 my-4 text-sm text-bleuF'>
					Votre mission sera de planter quelques plantes dans les espaces verts
					de l’entreprise, afin de rendre le paysage plus radieux.{" "}
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
