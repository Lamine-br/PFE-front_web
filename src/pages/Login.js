import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export function Login() {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const location = useNavigate();

	async function handleLogin(e) {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
	}

	const [err, setErr] = useState("");

	return (
		<div className='flex bg-[#9CC7FA] w-screen h-screen justify-center items-center'>
			<div className='flex flex-col justify-center items-center'>
				<div className='text-left flex flex-col'>
					<label
						htmlFor='badgeNumber'
						className='text-white font-bold mb-2 flex-initial'
					>
						Username
					</label>
					<input
						id='badgeNumber'
						className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						type='text'
						ref={usernameRef}
						onChange={() => {
							setErr("");
						}}
					/>
				</div>
				<div className='text-left flex flex-col mt-2'>
					<label
						htmlFor='password'
						className='text-white font-bold mb-2 flex-initial'
					>
						Password
					</label>
					<input
						id='password'
						className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						type='text'
						ref={passwordRef}
						onChange={() => {
							setErr("");
						}}
					/>
					<h4 className='font-semibold text-md text-red-500 mt-2'>{err}</h4>
				</div>

				<button
					className='bg-[#496696] text-white font-bold py-2 px-4 mt-6 rounded w-48'
					onClick={handleLogin}
				>
					Login
				</button>
			</div>
		</div>
	);
}
