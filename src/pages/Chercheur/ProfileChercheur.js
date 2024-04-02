import React, { useState, useEffect } from "react";
import { HeaderChercheur, Spinner, Profile } from "../../components";
import { axiosInstance } from "../../util/axios";

export function ProfileChercheur() {
	const [loading, setLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [data, setData] = useState({});
	async function getProfile() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/profile", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function updateProfile(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.put("/profile", data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				localStorage.setItem("user", JSON.stringify(response.data.user));
				getProfile();
				setLoading(false);
				setShowUpdate(true);
				console.log(data);
				setTimeout(() => setShowUpdate(false), 1000);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setShowError(true);
			setTimeout(() => setShowError(false), 1000);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<Profile data={data} onUpdate={updateProfile} />
			{showError && (
				<div className='absolute left-1/2 transform -translate-x-1/2'>
					<p className='bg-white p-2 rounded-lg border border-rouge text-rouge'>
						{"Mot de passe incorrect"}
					</p>
				</div>
			)}
			{showUpdate && (
				<div className='absolute left-1/2 transform -translate-x-1/2'>
					<p className='bg-white p-2 rounded-lg border border-vertF text-vertF'>
						{"Mise à jour réussie"}
					</p>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
