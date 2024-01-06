import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState } from "react";

export default function Register() {
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSignUp();
	};

	const handleSignUp = async () => {
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						fullName,
					},
				},
			});
			if (error) throw error;
			setEmail("")
			setPassword("")
			setFullName("")
			navigate("/login")
		} catch (error) {
			alert(`Authentication Error - Invalid Credentials`)
		}
	};

	return (
		<div className='h-screen w-full flex'>
			<section className='md:w-[60%] w-full p-8 flex flex-col justify-center'>
				<h2 className=' text-3xl mb-8 font-bold text-[#304D30]'>Register</h2>
				<form className='w-full mb-6' onSubmit={handleSubmit}>
					<label>Full Name</label>
					<input
						type='text'
						className='w-full rounded-md border border-gray-400 py-2 px-4 mb-3'
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>

					<label>Email Address</label>
					<input
						type='email'
						className='w-full rounded-md border border-gray-400 py-2 px-4 mb-3'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label>Password</label>
					<input
						type='password'
						className='w-full rounded-md border border-gray-400 py-2 px-4 mb-3'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength={7}
					/>
					<button className='bg-[#304D30] text-white px-8 py-4 rounded-md'>
						REGISTER
					</button>
				</form>
				<p>
					Already have an account?{" "}
					<Link to='/login' className='text-[#5C8374]'>
						Login
					</Link>
				</p>
			</section>
			<div className='md:w-[40%] hidden md:inline-block'>
				<img
					src='https://source.unsplash.com/-q69Jfp6MtM'
					alt='Login'
					className='object-cover w-full h-full'
				/>
			</div>
		</div>
	);
}