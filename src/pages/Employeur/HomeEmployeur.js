import React from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
} from "../../components";

export function HomeEmployeur() {
	const user = JSON.parse(localStorage.getItem("user"));
	const isUserBlocked = user?.bloque === true;
	const isProfileActivated = user?.valide === "Validé";
	console.log(user);
	return (
		<div className='min-h-screen pb-10 flex flex-col'>
			<HeaderEmployeur />
			<NavBarEmployeur />
			<div className='flex-grow flex items-center justify-center'>
				{isUserBlocked && (
					<h1 className='text-rouge text-center'>Votre compte a été bloqué</h1>
				)}
				{!isProfileActivated && (
					<h1 className='text-rouge text-center'>
						Votre compte n'est pas encore activé
					</h1>
				)}
			</div>
		</div>
	);
}
