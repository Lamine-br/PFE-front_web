import React from "react";
import { ButtonRond } from "./ButtonRond";
import { FaTimes } from "react-icons/fa";

export function Connexion({ onClose }) {
	return (
		<div className='fixed z-50 overlay flex flex-col justify-center items-center p-4 w-1/4 h-4/5 bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
			<div className='flex justify-end w-full mb-6'>
				<FaTimes
					className='cursor-pointer absolute top-4 right-4'
					color='#EEEDFF'
					onClick={onClose}
				/>
			</div>
			<h1 className='text-xl text-violet font-bold mb-6'>S'authentifier</h1>
			<div className='flex flex-col m-2 w-3/4'>
				<label className='text-violet text-xs font-bold'>Email</label>
				<input
					className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
					type='email'
				></input>
			</div>
			<div className='flex flex-col m-2 w-3/4 mb-10'>
				<label className='text-violet text-xs font-bold'>Mot de passe</label>
				<input
					className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
					type='password'
				></input>
				<p className='text-violet text-xs underline'>Mot de passe oublié ?</p>
			</div>

			<ButtonRond
				couleur={"rouge"}
				couleurTexte={"violet"}
				contenu={"S'authentifier"}
				width={"w-3/4"}
				height={"fit"}
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
	);
}
