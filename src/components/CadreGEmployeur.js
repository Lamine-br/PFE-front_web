import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";
import esi from "../assets/logo_esi.png";

export function CadreGEmployeur({ Offre }) {
	return (
		<div className='w-full bg-violet rounded-lg p-4'>
			<div className='flex'>
				<div>
					<p className='text-bleuF font-bold text-xl'>{Offre.titre}</p>
					<div className='flex'>
						<p className='text-bleuF'>{Offre.date}</p>
						<p className='text-bleuF ml-4'>Alger</p>
						<p className='text-bleuF ml-4'>Plus de 200 condidats</p>
					</div>
				</div>
				<div className='ml-auto my-auto'>
					<FaEllipsisV />
				</div>
			</div>
			<div className='grid grid-cols-2 gap-x-4'>
				<div className='mt-2'>
					<img className='bg-white w-full h-48 rounded-lg' src={esi}></img>
				</div>
				<div className='px-10'>
					<p className='text-bleuF font-bold text-lg'>A propos de l'offre</p>
					<div className='mt-2'>
						<p className='text-bleuF font-bold'>Description</p>
						<p className='text-sm text-bleuF'>{Offre.description} </p>
					</div>
					<div className='mt-2'>
						<p className='text-bleuF font-bold'>Conditions</p>
						<ul className='list-disc text-bleuF'>
							<li>
								<p className='text-sm text-bleuF'>+5 ans d’éxpérience</p>
							</li>
							<li>
								<p className='text-sm text-bleuF'>De métier jardinier</p>
							</li>
							<li>
								<p className='text-sm text-bleuF'>Excellent en communication</p>
							</li>
							<li>
								<p className='text-sm text-bleuF'>
									A l’habitude de travailler sur de grands espaces
								</p>
							</li>
						</ul>
					</div>
					<div className='mt-2'>
						<p className='text-bleuF font-bold'>Notes importantes</p>
						<ul className='list-disc text-bleuF'>
							<li>
								<p className='text-sm text-bleuF'>
									On accepte seulement les condidats originaires d’Alger
								</p>
							</li>
							<li>
								<p className='text-sm text-bleuF'>Salaire attractif</p>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div></div>
			<div className='flex justify-end m-4 space-x-2'>
				<ButtonRond
					couleur={"bleuF"}
					couleurTexte={"violet"}
					contenu={"Voir condidatures"}
					width={"fit"}
					height={"fit"}
				></ButtonRond>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Archiver"}
					width={"fit"}
					height={"fit"}
				></ButtonRond>
			</div>
		</div>
	);
}
