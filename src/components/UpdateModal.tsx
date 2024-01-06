import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { titleToSlug } from "../../util";

export default function UpdateModal({
	isOpen,
	closeModal,
	noteID,
	title,
	content,
}: {
	closeModal: any,
	isOpen: boolean,
	noteID: number,
	title: string,
	content: string,
}) {
	const navigate = useNavigate();
	const [noteTitle, setNoteTitle] = useState(title);
    const [noteContent, setNoteContent] = useState(content);


	const updateNoteData = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const { error } = await supabase
				.from("notes")
				.update({
					title: noteTitle,
					content: noteContent,
					slug: titleToSlug(noteTitle),
				})
				.eq("id", noteID);
            if (error) throw error;
            closeModal();
			alert("Updated successfully!🎉");
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
        }
    };
    
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black/60' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-gray-900 mb-3'
									>
										Update Note
									</Dialog.Title>
									<form
										className='w-full flex flex-col'
										onSubmit={updateNoteData}
									>
										<label htmlFor='title'>Title</label>
										<input
											type='text'
											name='title'
											className='border-2 p-4 rounded-md text-lg mb-5'
                                            value={noteTitle}
											onChange={(e) => setNoteTitle(e.target.value)}
										/>

										<label htmlFor='content'>Content</label>
										<textarea
											name='content'
											rows={10}
											className='border-2 p-4 rounded-md text-lg mb-3'
											value={noteContent}
											onChange={(e) => setNoteContent(e.target.value)}
										/>

										<button className='bg-blue-500 text-white px-8 py-4 rounded-md'>
											Update Note
										</button>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}