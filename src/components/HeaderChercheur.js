import React, { useState } from "react";
import Notifications from "./Notifications";
import Compte from "./Compte";
import Groupes from "./Groupes";

export function HeaderChercheur({}) {
	return (
		<div className='py-4 bg-bleuF'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-violet'>Intérim - Chercheur</h1>
				<nav>
					<ul className='flex space-x-6 items-center'>
						<li className='cursor-pointer'>
							<Groupes />
						</li>
						<li className='cursor-pointer relative'>
							<Notifications />
						</li>
						<li className='cursor-pointer'>
							<Compte />
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
