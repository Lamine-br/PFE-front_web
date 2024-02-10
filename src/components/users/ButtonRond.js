import React from "react";

export function ButtonRond({ couleur, couleurTexte, contenu, width, height }) {
	const buttonWidth = width || "w-10";
	const buttonHeight = height || "h-10";

	return (
		<button
			className={`rounded-3xl ${buttonWidth} ${buttonHeight} bg-${couleur} text-${couleurTexte} text-sm font-bold px-4 pt-1 pb-2`}
		>
			{contenu}
		</button>
	);
}
