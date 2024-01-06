import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Content from "./components/Content";
import CreateContent from "./components/CreateContent";
import NotAuthenticated from "./components/NotAuthenticated";

export default function App() {
	const [token, setToken] = useState(false);
	const [userID, setUserID] = useState("")

	useEffect(() => {
		const fetchSession = () => {
			const session = sessionStorage.getItem("token");
			if (session) {
				setToken(true);
				const userDetails = JSON.parse(session)
				setUserID(userDetails.user.id)
			}
		}
		fetchSession()
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				{token ? (
					<Route path='/dashboard' element={<Dashboard userID={userID} />} />
				) : (
					<Route path='/dashboard' element={<NotAuthenticated />} />
				)}

				{token ? (
					<Route path='/notes/:slug' element={<Content />} />
				) : (
					<Route path='/notes/:slug' element={<NotAuthenticated />} />
				)}
				
				{token ? (
					<Route path='/create' element={<CreateContent userID={userID} />} />
				) : (
					<Route path='/create' element={<NotAuthenticated />} />
				)}
			</Routes>
		</Router>
	);
}