import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarEmployeur({ selected }) {
	const [selectedItem, setSelectedItem] = useState(selected);

	const user = JSON.parse(localStorage.getItem("user"));
	const isUserBlocked = user?.bloque === true;
	const isProfileActivated = user?.valide === "Validé";

	const isDisabled = isUserBlocked || !isProfileActivated;

	return (
		<div className=''>
			<div className='flex items-center justify-center'>
				<nav>
					<ul className='flex space-x-8 items-center p-2 mt-2'>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 0
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							<NavLink
								to={"/employeur/offres"}
								className={`${isDisabled ? "pointer-events-none" : ""}`}
							>
								Offres
							</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 1
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							<NavLink
								to={"/employeur/candidatures"}
								className={`${isDisabled ? "pointer-events-none" : ""}`}
							>
								Candidatures
							</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 2
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							<NavLink
								to={"/employeur/emplois"}
								className={`${isDisabled ? "pointer-events-none" : ""}`}
							>
								Emplois
							</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 3
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							<NavLink
								to={"/employeur/candidaturesSpontanees"}
								className={`${isDisabled ? "pointer-events-none" : ""}`}
							>
								Candidatures Spontanées
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
