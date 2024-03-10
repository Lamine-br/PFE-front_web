import React, { useState, useRef } from "react";
import { ButtonRond } from "./ButtonRond";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function Connexion({ onClose }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const emailRef = useRef();
	const passwordRef = useRef();
	const [err, setErr] = useState("");

	async function handleLogin(e) {
		setErr("");
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			console.log({
				email,
				password,
			});
			const response = await axiosInstance.post("/auth/login/employeur", {
				email,
				password,
			});

			console.log(response);

			if (response.request.status === 200) {
				localStorage.setItem("accessToken", response.data.accessToken);
				window.location.href = "/employeur";
			} else {
				setErr(
					"Une erreur s'est produite, vérifiez vos identifiants ou contactez l'admin."
				);
			}
		} catch (e) {
			console.log(e);
			setErr(
				"Une erreur s'est produite, vérifiez vos identifiants ou contactez l'admin."
			);
		}
	}

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const redirect = (role) => {
		switch (role) {
			case "Chercheur":
				window.location.href = "/chercheur";
				break;
			case "Employeur":
				window.location.href = "/employeur";
				break;
			case "Agence":
				window.location.href = "/Agence";
				break;
			default:
			// setError(true); A remplir pour afficher un  message d'erreur si l'utilisateur n'a pas choisi de rôle
		}
	};

	const [show, setShow] = useState(false);

	return (
		<div className='fixed z-50 overlay flex flex-col justify-center items-center p-4 w-1/3 h-4/5 bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
			<div className='flex justify-end w-full mb-6'>
				<FaTimes
					className='cursor-pointer absolute top-4 right-4'
					color='#EEEDFF'
					onClick={onClose}
				/>
			</div>

			{!show && (
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-xl text-violet font-bold mb-6'>Se connecter</h1>
					<div className='flex flex-col m-2 w-full'>
						<p className='text-violet text-sm font-semibold'>
							Vous voulez vous connecter en tant que :{" "}
						</p>
					</div>

					<div className='w-full m-4'>
						<label className='flex items-center justify-start bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "Chercheur"}
								onChange={() => handleOptionChange("Chercheur")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Chercheur d'emplois
							</span>
						</label>

						<label className='flex items-center justify-start mt-1 bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "Employeur"}
								onChange={() => handleOptionChange("Employeur")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								{" "}
								Employeur
							</span>
						</label>

						<label className='flex items-center justify-start  mt-1 bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "Agence"}
								onChange={() => handleOptionChange("Agence")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Agence d'intérim
							</span>
						</label>
					</div>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"w-3/4 mt-2"}
						height={"fit"}
						onClick={() => setShow(true)}
					></ButtonRond>
				</div>
			)}

			{show && (
				<div className='flex flex-col w-full items-center'>
					<h1 className='text-xl text-violet font-bold mb-6'>
						Se connecter - {selectedOption}
					</h1>
					<div className='flex flex-col m-2 w-3/4'>
						<label className='text-violet text-xs font-bold'>Email</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							ref={emailRef}
							onFocus={() => setErr("")}
						></input>
					</div>
					<div className='flex flex-col m-2 w-3/4 mb-4'>
						<label className='text-violet text-xs font-bold'>
							Mot de passe
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
							ref={passwordRef}
							onFocus={() => setErr("")}
						></input>
						<p className='text-violet text-xs underline'>
							Mot de passe oublié ?
						</p>
						<p className='text-rouge text-xs mt-4'>{err}</p>
					</div>

					<div className='flex items-center justify-center'></div>

					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Se connecter"}
						width={"w-3/4"}
						height={"fit"}
						onClick={(e) => handleLogin(e)}
					></ButtonRond>

					<div className='flex items-center w-3/4 mx-2 my-1'>
						<div className='flex-grow border-t border-violet w-1/8 mx-2'></div>
						<span className='text-xs text-violet'>OU</span>
						<div className='flex-grow border-t border-violet w-1/8 mx-2'></div>
					</div>

					<ButtonRond
						couleur={"violet"}
						couleurTexte={"bleuF"}
						contenu={"Continuer avec Google"}
						width={"w-3/4"}
						height={"fit"}
					></ButtonRond>
					<div className='flex mt-8'>
						<p className='text-xs text-violet'>Vous n'avez pas de compte ? </p>
						<p className='text-xs text-rouge underline ml-1'>S'inscrire</p>
					</div>
				</div>
			)}
		</div>
	);
}
