import { Link } from "react-router-dom";

export default function NotAuthenticated() {
	return (
		<div className='w-full h-[100vh] flex flex-col items-center justify-center'>
			<h2 className='font-bold text-2xl text-center mb-3'>
				You are not authorized to view this page
			</h2>

			<Link
				to='/login'
				className='bg-[#304D30] text-white px-8 py-4 rounded-md'
			>
				LOG IN
			</Link>
		</div>
	);
}