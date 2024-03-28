import React, { useState, useEffect } from "react";
import { HeaderChercheur, NavBarChercheur } from "../../components";
import { axiosInstance } from "../../util/axios";

export function AgendaChercheur() {
	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={1}></NavBarChercheur>
		</div>
	);
}
