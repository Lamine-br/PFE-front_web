import React, { useState, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { FiEdit } from "react-icons/fi";
import { OneForm } from "./OneForm";
import { PasswordForm } from "./PasswordForm";
import { axiosInstance } from "../util/axios";

export function ProfileC({ data, onUpdate }) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ email: "" });
	const [showForm, setShowForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);

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
	}, []);

	return (
		<div className=''>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>Compte</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Email</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Email",
											key: "email",
											value: data.email,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>{data.email}</p>
						</div>

						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Mot de passe</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setShowPasswordForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>*********</p>
						</div>
					</div>
				</div>
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>
						Informations personnelles
					</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nom</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nom",
											key: "nom",
											value: data.nom,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.nom}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Prénom</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Prénom",
											key: "prenom",
											value: data.prenom,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.prenom}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nationalité</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nationalité",
											key: "nationalite",
											value: data.nationalite,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.nationalite}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Ville</p>
								<FiEdit
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Ville",
											key: "ville",
											value: data.ville,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.ville}</p>
						</div>
					</div>
					<div className='flex flex-col space-y-1'>
						<div className='flex items-center space-x-2'>
							<p className='text-bleuF font-bold'>Téléphone</p>
							<FiEdit
								size={10}
								color={"#FF584D"}
								className='cursor-pointer'
								onClick={() => {
									setFormData({
										label: "Téléphone",
										key: "numero",
										value: data.numero,
									});
									setShowForm(true);
								}}
							/>
						</div>
						<p className='text-sm text-bleuF pb-2'>{data.numero}</p>
					</div>
				</div>
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='space-y-6'>
					<p className='text-rouge font-bold text-lg'>Cv</p>
					<object
						data={url + data.cv}
						type='application/pdf'
						width='100%'
						height='500px'
					/>
				</div>
			</div>

			{showForm && (
				<OneForm
					data={formData}
					onConfirm={(data) => onUpdate(data)}
					onDismiss={() => setShowForm(false)}
				/>
			)}

			{showPasswordForm && (
				<PasswordForm
					onConfirm={(data) => onUpdate(data)}
					onDismiss={() => setShowPasswordForm(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
