import { useNavigate } from "react-router-dom";

export default function App() {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen w-full flex flex-col items-center justify-center md-w-[70%] p-8'>
			<h2 className='text-4xl text-center font-extrabold text-[#304D30] mb-2'>
				Note-Keep
			</h2>
			<div className='w-[70%] mb-4'>
				<p className='text-center opacity-60'>
					Say goodbye to scattered notes and hello to a more organized life.
				</p>
				<p className='text-center opacity-60'>
					Noke-Keep offers a versatile platform for all your note-taking needs,
					helping you stay focused and in control.
				</p>
			</div>
			<button
				onClick={() => navigate("/login")}
				className='bg-[#304D30] text-[#EEF0E5] px-4 py-3 rounded-md w-[200px] font-bold'
			>
				SIGN IN
			</button>
		</div>
	);
}