import React, { useState, useEffect } from "react";
import { HeaderChercheur, NavBarChercheur, Agenda } from "../../components";
import { axiosInstance } from "../../util/axios";

export function AgendaChercheur() {
	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={1}></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className=''>
					<div className='w-full'>
						<Agenda />
					</div>
				</div>
			</div>
		</div>
	);
}
