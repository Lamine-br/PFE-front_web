import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Connexion } from "./Connexion";
import { Inscription } from "./Inscription";

export function Header() {
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
		<div className='py-4 sticky top-0 z-10 bg-white border-b shadow-md'>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
					connexionVisible || inscriptionVisible ? "block" : "hidden"
				}`}
			/>
			<div className='flex mx-10 justify-between'>
				<h1
					className='text-2xl font-bold text-bleuF mt-2 cursor-pointer'
					onClick={redirect}
				>
					Intérim
				</h1>
				<nav className='mt-2'>
					<ul className='flex space-x-4'>
						<li className='mt-2'>
							<p
								className='hover:underline cursor-pointer text-bleuF text-sm'
								onClick={handleConnexionToggle}
							>
								Connexion
							</p>
						</li>
						<li>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Inscrivez vous"}
								width={"fit"}
								height={"fit"}
								onclick={handleInscriptionToggle}
							></ButtonCarre>
						</li>
					</ul>
				</nav>
			</div>

			{connexionVisible && (
				<Connexion
					onClose={handleConnexionToggle}
					onInscription={() => {
						handleConnexionToggle();
						setTimeout(() => {
							handleInscriptionToggle();
						}, 200);
					}}
				/>
			)}
			{inscriptionVisible && (
				<Inscription
					onClose={handleInscriptionToggle}
					onConnect={() => {
						handleInscriptionToggle();
						setTimeout(() => {
							handleConnexionToggle();
						}, 200);
					}}
				/>
			)}
		</div>
	);
}
