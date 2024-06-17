import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Home,
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
	UtilisateurEGestionnaire,
	StatistiquesGestionnaire,
	HomeAgence,
	FichiersAgence,
	FichierAgence,
	MetiersGestionnaire,
	HomeChercheur,
	AgendaChercheur,
	CandidaturesChercheur,
	CandidatureChercheur,
	EmploisChercheur,
	EmploiChercheur,
	ProfileChercheur,
	ProfileEmployeur,
	AbonnementsGestionnaire,
	AbonnementsEmployeur,
	EnregistrementsChercheur,
	PostulerChercheur,
	CandidaturesSpontanees,
	CandidatureSpontaneeChercheur,
	FavorisChercheur,
	EmploisEmployeur,
	EmploiEmployeur,
	UtilisateurCGestionnaire,
	RelationsChercheur,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register/employeur' element={<RegisterEmployeur />} />
				<Route path='/register/chercheur' element={<RegisterChercheur />} />
				<Route path='/offres/:id' element={<Offre />} />

				{/*  Employeur */}
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
				<Route path='/employeur/emplois' element={<EmploisEmployeur />} />
				<Route path='/employeur/emplois/:id' element={<EmploiEmployeur />} />

				<Route
					path='register/employeur/abonnements/'
					element={<AbonnementsEmployeur />}
				/>
				<Route path='/employeur/profile' element={<ProfileEmployeur />} />

				{/*  Gestionnaire */}
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
					path='/gestionnaire/utilisateurs/employeurs/:id'
					element={<UtilisateurEGestionnaire />}
				/>
				<Route
					path='/gestionnaire/utilisateurs/chercheurs/:id'
					element={<UtilisateurCGestionnaire />}
				/>
				<Route
					path='/gestionnaire/statistiques'
					element={<StatistiquesGestionnaire />}
				/>
				<Route path='/gestionnaire/metiers' element={<MetiersGestionnaire />} />
				<Route
					path='/gestionnaire/abonnements'
					element={<AbonnementsGestionnaire />}
				/>

				{/*  Agence */}
				<Route path='/agence' element={<HomeAgence />} />
				<Route path='/agence/fichiers' element={<FichiersAgence />} />
				<Route path='/agence/fichiers/:id' element={<FichierAgence />} />

				{/*  Chercheur */}
				<Route path='/chercheur' element={<HomeChercheur />} />
				<Route
					path='/chercheur/candidatures'
					element={<CandidaturesChercheur />}
				/>
				<Route
					path='/chercheur/candidatures/:id'
					element={<CandidatureChercheur />}
				/>
				<Route path='/offres/:id/postuler' element={<PostulerChercheur />} />
				<Route path='/chercheur/emplois' element={<EmploisChercheur />} />
				<Route path='/chercheur/emplois/:id' element={<EmploiChercheur />} />
				<Route path='/chercheur/agenda' element={<AgendaChercheur />} />
				<Route
					path='/chercheur/candidaturesSpontanees'
					element={<CandidaturesSpontanees />}
				/>
				<Route
					path='/chercheur/candidaturesSpontanees/:id'
					element={<CandidatureSpontaneeChercheur />}
				/>
				<Route path='/chercheur/profile' element={<ProfileChercheur />} />
				<Route
					path='/chercheur/enregistrements'
					element={<EnregistrementsChercheur />}
				/>
				<Route path='/chercheur/favoris' element={<FavorisChercheur />} />
				<Route path='/chercheur/relations' element={<RelationsChercheur />} />
				<Route
					path='/chercheur/relations/groupes'
					element={<RelationsChercheur />}
				/>
				<Route
					path='/chercheur/relations/groupes/:id'
					element={<RelationsChercheur />}
				/>
				<Route
					path='/chercheur/relations/amis'
					element={<RelationsChercheur />}
				/>
				<Route
					path='/chercheur/relations/amis/:id'
					element={<RelationsChercheur />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
