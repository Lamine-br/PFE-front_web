import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Home,
	Profile,
	Login,
	Users,
	RegisterEmployeur,
	RegisterChercheur,
	Offre,
	HomeEmployeur,
	OffresEmployeur,
	CandidaturesEmployeur,
	OffreEmployeur,
	CandidatureEmployeur,
	HomeGestionnaire,
	InscriptionsGestionnaire,
	InscriptionGestionnaire,
	UtilisateursGestionnaire,
	UtilisateurGestionnaire,
} from "./pages";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register/employeur' element={<RegisterEmployeur />} />
				<Route path='/register/chercheur' element={<RegisterChercheur />} />
				<Route path='/offres/:id' element={<Offre />} />
				<Route path='/employeur' element={<HomeEmployeur />} />
				<Route path='/employeur/offres' element={<OffresEmployeur />} />
				<Route path='/employeur/offres/:id' element={<OffreEmployeur />} />
				<Route
					path='/employeur/candidatures'
					element={<CandidaturesEmployeur />}
				/>
				<Route
					path='/employeur/candidatures/:id'
					element={<CandidatureEmployeur />}
				/>
				<Route path='/gestionnaire' element={<HomeGestionnaire />} />
				<Route
					path='/gestionnaire/inscriptions'
					element={<InscriptionsGestionnaire />}
				/>
				<Route
					path='/gestionnaire/inscriptions/:id'
					element={<InscriptionGestionnaire />}
				/>
				<Route
					path='/gestionnaire/utilisateurs'
					element={<UtilisateursGestionnaire />}
				/>
				<Route
					path='/gestionnaire/utilisateurs/:id'
					element={<UtilisateurGestionnaire />}
				/>
				<Route path='/profile' element={<Profile />} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
