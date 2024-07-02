import React, { useState, useEffect } from "react";
import amazon from "../assets/amazon.png";
import tiktok from "../assets/tiktok.png";
import adidas from "../assets/adidas.png";
import netflix from "../assets/netflix.png";
import google from "../assets/google.png";
import adobe from "../assets/adobe.png";
import spotify from "../assets/spotify.png";
import canva from "../assets/canva.png";
import { axiosInstance } from "../util/axios";

export function BarreEmployeurs() {
	const [employeurs, setEmployeurs] = useState([]);
	async function getEmployeurs() {
		try {
			const response = await axiosInstance.get("/users/employeurs");

			console.log(response);

			if (response.status === 200) {
				// Mettre à jour l'état avec les employeurs
				setEmployeurs(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
		getEmployeurs();
	}, []);

	return (
		<div className='h-40 mt-40 p-6 border text-center flex flex-col justify-center'>
			<p className='text-xl text-bleuF font-bold'>
				Nous collaborons avec{" "}
				<a className='underline'> {employeurs.length} entreprises</a>
			</p>

			<div className='flex justify-center items-center mt-6'>
				{employeurs.map((item) => (
					<img src={url + item.image} alt='Adobe' className='w-16 h-16 mx-4' />
				))}
			</div>
		</div>
	);
}
