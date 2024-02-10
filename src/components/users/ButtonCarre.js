import React from "react";

export function ButtonCarre({
	couleur,
	couleurTexte,
	contenu,
	width,
	height,
	onclick,
}) {
	const buttonWidth = width || "w-10";
	const buttonHeight = height || "h-10";

	return (
		<div>
			<button
				className={`rounded ${buttonWidth} ${buttonHeight} bg-${couleur} text-${couleurTexte} font-bold px-4 py-2 justify-center items-center`}
				onClick={onclick}
			>
				{contenu}
			</button>
		</div>
	);
}
