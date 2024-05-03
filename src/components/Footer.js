import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Connexion } from "./Connexion";
import { Inscription } from "./Inscription";

export function Footer() {
	const [connexionVisible, setConnexionVisible] = useState(false);
	const [inscriptionVisible, setInscriptionVisible] = useState(false);

	const handleConnexionToggle = () => {
		setConnexionVisible(!connexionVisible);
	};

	const handleInscriptionToggle = () => {
		setInscriptionVisible(!inscriptionVisible);
	};

	const redirect = () => {
		window.location.href = "/";
	};
	return (
		<div className='py-4 sticky top-0 bg-violet p-10 mt-10'>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
					connexionVisible || inscriptionVisible ? "block" : "hidden"
				}`}
			/>
			<div className='grid grid-cols-5'>
				<div className='flex flex-col space-y-4 col-span-2'>
					<h1
						className='text-2xl font-bold text-bleuF mt-2 cursor-pointer'
						onClick={redirect}
					>
						Intérim
					</h1>
					<p>
						Découvrez le meilleur moyen de diffuser vos offres d'emploi
						intérimaires et trouvez le candidat parfait pour votre entreprise,
						pour des recrutements réussis !
					</p>
					<ButtonCarre
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Inscrivez vous"}
						width={"fit"}
						height={"fit"}
						onclick={handleInscriptionToggle}
					></ButtonCarre>
				</div>
				<div></div>
				<div className='flex flex-col p-10 space-y-4 mt-10'>
					<h1 className='text-lg font-bold text-bleuF mt-2 cursor-pointer'>
						Fonctionnalités
					</h1>
					<p>Chercheur</p>
					<p>Employeur</p>
					<p>Agence</p>
				</div>
				<div className='flex flex-col p-10 space-y-4 mt-10'>
					<h1 className='text-lg font-bold text-bleuF mt-2 cursor-pointer'>
						A propos de nous
					</h1>
					<p>Nous contacter</p>
				</div>
			</div>
			<p>© 2024 - Brahami Lamine. Tous droits réservés.</p>

			{connexionVisible && <Connexion onClose={handleConnexionToggle} />}
			{inscriptionVisible && <Inscription onClose={handleInscriptionToggle} />}
		</div>
	);
}
