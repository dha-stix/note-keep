import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSignIn();
	};

	const handleSignIn = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
			sessionStorage.setItem("token", JSON.stringify(data));
			setEmail("");
			setPassword("");
			navigate("/dashboard");
		} catch (error) {
			alert(`Encountered an errror - ${error.message}`);
		}
	};

	return (
		<div className='h-screen w-full flex'>
			<section className='md:w-[60%] w-full p-8 flex flex-col justify-center'>
				<h2 className=' text-3xl mb-8 font-bold text-[#304D30]'>Log in</h2>
				<form className='w-full mb-6' onSubmit={handleSubmit}>
					<label>Email Address</label>
					<input
						type='email'
						className='w-full rounded-md border border-gray-400 py-2 px-4 mb-6'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label>Password</label>
					<input
						type='password'
						className='w-full rounded-md border border-gray-400 py-2 px-4 mb-4'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className='bg-[#304D30] text-white px-8 py-4 rounded-md'>
						LOG IN
					</button>
				</form>
				<p>
					Don't have an account?{" "}
					<Link to='/register' className='text-[#5C8374]'>
						Register
					</Link>
				</p>
			</section>
			<div className='md:w-[40%] hidden md:inline-block'>
				<img
					src='https://source.unsplash.com/8eSrC43qdro'
					alt='Login'
					className='object-cover w-full h-full'
				/>
			</div>
		</div>
	);
}