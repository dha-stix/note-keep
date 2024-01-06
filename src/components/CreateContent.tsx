import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { titleToSlug } from "../../util";

export default function Content({ userID }: { userID: string }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const handleCancel = () => navigate("/dashboard");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveNote();
	};

	const saveNote = async () => {
		try {
			const { data, error } = await supabase
				.from("notes")
				.insert({ title, content, slug: titleToSlug(title), user: userID })
				.single();
			if (error) throw error;
			navigate("/dashboard");
			setContent("");
			setTitle("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='w-full p-8'>
			<header className='flex justify-between items-center mb-4'>
				<h2 className='text-3xl font-bold text-[#304D30]'>Create Content</h2>
				<MdCancel
					className='text-5xl text-red-500 cursor-pointer'
					onClick={handleCancel}
				/>
			</header>

			<form className='w-full flex flex-col' onSubmit={handleSubmit}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					name='title'
					className='border-2 p-4 rounded-md text-lg mb-5'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor='content'>Content</label>
				<textarea
					name='content'
					rows={10}
					className='border-2 p-4 rounded-md text-lg mb-3'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button className='px-6 py-3 bg-blue-500 text-white w-[200px] rounded-md'>
					SAVE
				</button>
			</form>
		</div>
	);
}