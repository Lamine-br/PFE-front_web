import React, { useState, useEffect } from "react";
import {
	FaEllipsisV,
	FaDollarSign,
	FaStar,
	FaBookmark,
	FaHeart,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import esi from "../assets/logo_esi.png";
import { Modal } from "./Modal";
import {
	fDate,
	fToNow,
	getCurrentDateTime,
	calculateDuration,
} from "../util/formatTime";
import { axiosInstance } from "../util/axios";

export function Cadre({ Offre }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	const [isFavorite, setIsFavorite] = useState(false);
	const [isSaved, setIsSaved] = useState(
		user.enregistrements.includes(Offre._id)
	);

	useEffect(() => {
		const updatedUser = { ...user, enregistrements: user.enregistrements };
		localStorage.setItem("user", JSON.stringify(updatedUser));
	}, [isSaved]);

	async function saveOffre() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/chercheur/offres/save",
				{ id: Offre._id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setMessage(response.data.message);
				setUser({ ...user, enregistrements: response.data.enregistrements });
				setIsSaved(!isSaved);
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 1000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const toggleSaved = () => {
		saveOffre();
	};

	const redirect = () => {
		window.location.href = "/offres/" + Offre._id;
	};

	return (
		<div className='bg-violet rounded-lg'>
			<div className='flex px-4 py-2'>
				<img className='rounded-full w-12 h-12' src={esi} alt='logo' />
				<div className='ml-4'>
					<p className='text-bleuF font-bold'>{Offre.employeur.entreprise}</p>
					<p className='text-bleuF'>{fDate(Offre.date)}</p>
				</div>
				<div className='ml-auto my-auto'>
					<Modal />
				</div>
				{showMessage && (
					<div className='fixed left-1/2 top-1/2 transform -translate-x-1/2'>
						<p className='bg-bleuF p-2 rounded-lg border border-bleuF text-white'>
							{message}
						</p>
					</div>
				)}
			</div>
			<div>
				<img
					className='border-t border-b border-black w-full h-48'
					src={esi}
					alt='image'
				/>
			</div>
			<div className='w-full px-4'>
				<div className='flex justify-between mt-1'>
					<div className='cursor-pointer' onClick={toggleFavorite}>
						<FaHeart color={isFavorite ? "#FF584D" : "gray"} size={20} />
					</div>
					<div className='cursor-pointer' onClick={toggleSaved}>
						<FaBookmark color={isSaved ? "#465475" : "gray"} size={20} />
					</div>
				</div>

				<p className='text-bleuF font-bold'>{Offre.titre}</p>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>Alger</p>
					</div>
					<div className='flex items-center'>
						<FaDollarSign color='#465475' />
						<p className='text-bleuF'>{Offre.remuneration}</p>
					</div>
					<div className='flex items-center'>
						<TiTime size={20} color='#465475' />
						<p className='text-bleuF ml-1'>
							{calculateDuration(Offre.debut, Offre.fin)}
						</p>
					</div>
				</div>
			</div>
			<div>
				<p className='mx-4 my-4 text-sm text-bleuF max-h-20 overflow-hidden truncate'>
					{Offre.description}{" "}
				</p>
			</div>
			<div className='flex justify-end m-4'>
				<ButtonRond
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Condidater"}
					width={"fit"}
					height={"fit"}
					onClick={redirect}
				></ButtonRond>
			</div>
		</div>
	);
}
