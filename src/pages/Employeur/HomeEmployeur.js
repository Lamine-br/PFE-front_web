import React from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau,
} from "../../components";

export function HomeEmployeur() {
	return (
		<div className='min-h-screen pb-10'>
			<HeaderEmployeur></HeaderEmployeur>
			<NavBarEmployeur></NavBarEmployeur>
		</div>
	);
}
