import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Content } from '../../util';
import { convertDateString } from "../../util";

export default function Dashboard({ userID }: { userID: string }) {
    const [notes, setNotes] = useState<Content[]>([])
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        sessionStorage.removeItem("token")
        if (error) return alert("Encountered an error ⚡️")
        navigate("/")
    }

    useEffect(() => {
        async function fetchNotes() {
            try {
                const { data, error } = await supabase.from("notes").select().eq("user", userID)
                if (error) throw error
                setNotes(data)
            } catch (error) {
                alert("Error fetching notes")
            }
        }
       fetchNotes()
    }, [userID])

	return (
		<div className='w-full'>
            <nav className="px-8 h-[10vh] bg-[#304D30] w-full flex items-center justify-between">
                <Link to="/dashboard" className="text-2xl font-bold text-[#EEE7DA]">Note-Keep</Link>
                <button className="p-3 bg-red-400 text-white px-4 rounded-sm" onClick={() => handleLogout()}>Log out</button>
            </nav>

            <main className="p-8 w-full ">
                <header className="flex items-center justify-between">
                    <h2 className="font-bold text-xl mb-3">Available Notes</h2>
                    <Link to="/create" className="bg-blue-600 text-white rounded-md p-4 mb-3 block">Add Note</Link>
                </header>

                <div className="w-full">
                    {notes.map(note => (
                        <Link to={`/notes/${note.slug}`} className="bg-[#EEE7DA] rounded-md p-4 mb-3 block" key={note.id}>

                        <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                            <p className="text-sm">Created on {convertDateString(note.created_at)}</p>
                    </Link>
                    ))}


                </div>
            </main>


		</div>
	);
}
