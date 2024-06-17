import React from "react";
import P1 from "../assets/Work In Beanbag.png";
import P2 from "../assets/3.png";
import P3 from "../assets/Work In Desk.png";

export function WelcomeDiv() {
	return (
		<div className='relative mt-40 justify-center'>
			<div className='w-1/2 h-60 bg-bleuF text-violet rounded-lg mt-20 ml-20'>
				<h1 className='text-2xl font-bold p-10'>
					Bienvenue sur Intérim.
					<br></br>La plateforme destinée au travail
					<br></br>en intérim.
				</h1>
			</div>
			<div className='absolute top-0 left-1/2 transform -translate-y-1/2 bg-violet w-auto h-4/10 rounded-lg mr-10'>
				<div className='flex items-center'>
					<p className='text-bleuF font-semibold m-4'>
						Trouve une offre d’intérim adaptée à ton profil. Des milliers
						d’entreprises affichent leur offres ici, alors pose ton CV et saisis
						ta chance.
					</p>
					<img
						src={P1}
						alt='Description de l’image'
						className='w-20 h-20 mr-5'
					/>
				</div>
			</div>
			<div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 bg-violet w-auto h-4/10 rounded-lg mb-0 mr-10'>
				<div className='flex items-center'>
					<p className='text-bleuF font-semibold m-4'>
						Vous etes une entreprise et vous voulez recruter des condidats en
						intérim, vous etes au bon endroit. Connectez-vous et ayez accès à
						une panoplies de fonctionnalités.
					</p>
					<img
						src={P2}
						alt='Description de l’image'
						className='w-20 h-20 mr-5'
					/>
				</div>
			</div>
			<div className='absolute top-4/4 left-1/2 transform -translate-y-1/2 bg-violet w-auto h-4/10 rounded-lg  mr-10'>
				<div className='flex items-center'>
					<p className='text-bleuF font-semibold m-4'>
						Une agence d’intérim, pas de soucis ! Connectez-vous et ayez accès à
						une panoplies de fonctionnalités. Saisissez l'occasion et devenez
						une agence de qualité.
					</p>
					<img
						src={P3}
						alt='Description de l’image'
						className='w-20 h-20 mr-5'
					/>
				</div>
			</div>
		</div>
	);
}
