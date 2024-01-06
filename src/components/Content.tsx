import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { Link, useParams } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import { supabase } from "../../supabaseClient";
import type { Content } from "../../util";
import { convertDateString } from "../../util";

export default function Content() {
	const { slug } = useParams();
	const [noteData, setNoteData] = useState<Content>({ content: "", created_at: "", title: "", slug: "", user: "", id: 0 });
	const [updated, setUpdated] = useState(false);

	const [updateModal, setUpdateModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const closeUpdateModal = () => setUpdateModal(false);
	const closeDeleteModal = () => setDeleteModal(false);

	const openUpdateModal = () => setUpdateModal(true);
	const openDeleteModal = () => setDeleteModal(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const { data, error } = await supabase
					.from("notes")
					.select()
					.eq("slug", slug);
				if (error) throw error;
				setNoteData(data[0]);
				setUpdated(true);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, [slug]);

	return (
		<div className='w-full'>
			<nav className='px-8 h-[10vh] bg-[#304D30] w-full flex items-center justify-between'>
				<Link to='/dashboard' className='text-2xl font-bold text-[#EEE7DA]'>
					Note-Keep
				</Link>
				<div>
					<button
						onClick={openUpdateModal}
						className='p-3 bg-blue-600 text-white px-4 rounded-md mr-3'
					>
						Update
					</button>
					<button
						className='p-3 bg-red-400 text-white px-4 rounded-md'
						onClick={openDeleteModal}
					>
						Delete Note
					</button>
				</div>
			</nav>

			<main className='p-8 w-full '>
				<h2 className='font-bold text-2xl'>{noteData.title}</h2>
				<p className='text-sm mb-3 opacity-40 italic'>
					Created on {convertDateString(noteData.created_at)}
				</p>

				<div className='mt-8 opacity-60'>{noteData.content}</div>
			</main>
			{updated && (
				<>
					<DeleteModal
						closeModal={closeDeleteModal}
						isOpen={deleteModal}
						noteID={noteData.id}
					/>
					<UpdateModal
						closeModal={closeUpdateModal}
						isOpen={updateModal}
						noteID={noteData.id}
						title={noteData.title}
						content={noteData.content}
					/>
				</>
			)}
		</div>
	);
}