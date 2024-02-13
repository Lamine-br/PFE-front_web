import React from "react";
import { ButtonCarre } from "./ButtonCarre";

export function Header({ onConnexionToggle, onInscriptionToggle }) {
	return (
		<div className='py-4'>
			<div className='flex mx-20 justify-between'>
				<h1 className='text-2xl font-bold text-bleuF mt-2'>Intérim</h1>
				<nav className='mt-2'>
					<ul className='flex space-x-4'>
						<li className='mt-2'>
							<p
								className='hover:underline cursor-pointer text-bleuF'
								onClick={onConnexionToggle}
							>
								Connexion
							</p>
						</li>
						<li>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Inscrivez vous gratuitement"}
								width={"fit"}
								height={"fit"}
								onclick={onInscriptionToggle}
							></ButtonCarre>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
