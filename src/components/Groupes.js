import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { useState, useEffect } from "react";
import {
	FaBell,
	FaCheck,
	FaClock,
	FaTag,
	FaUsers,
	FaPlus,
	FaUserPlus,
} from "react-icons/fa";
import { fToNow } from "../util/formatTime";
import {
	Box,
	List,
	Badge,
	Button,
	Avatar,
	Tooltip,
	Divider,
	Popover,
	Typography,
	IconButton,
	ListSubheader,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { axiosInstance } from "../util/axios";
import { NouveauGroupe } from "./NouveauGroupe";
import { AjouterUser } from "./AjouterUser";

// const NOTIFICATIONS = [
// 	{
// 		id: "1",
// 		title: "Nouvelle offre disponible.",
// 		description: "KPMG vient de partager une nouvelle offre.",
// 		avatar: null,
// 		createdAt: set(new Date(), { hours: 10, minutes: 30 }),
// 		isUnRead: true,
// 	},
// 	{
// 		id: "2",
// 		title: "Candidature refusée.",
// 		description: "KPMG vient de partager une nouvelle offre.",
// 		avatar: null,
// 		createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
// 		isUnRead: true,
// 	},
// ];

export default function Groupes() {
	const [groupes, setGroupes] = useState([]);
	const [showNouveauGroupe, setShowNouveauGroupe] = useState(false);

	async function getGroupes() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/chercheur/groupes", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setGroupes(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addGroupe(nom, description) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addGroupe",
				{
					nom,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				getGroupes();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getGroupes();
	}, []);

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const redirectToMainPage = () => {
		window.location.href = "/chercheur/groupes";
	};

	return (
		<>
			<IconButton
				color={open ? "primary" : "default"}
				onClick={handleOpen}
				sx={{ width: 40, height: 40 }}
			>
				<Badge badgeContent={groupes.length} color='error'>
					<FaUsers color='EEEDFF' />
				</Badge>
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						mt: 1.5,
						ml: 0.75,
						width: 360,
					},
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant='subtitle1'>Groupes</Typography>
						<Typography variant='body2' sx={{ color: "text.secondary" }}>
							Vous faites partie de {groupes.length} groupes
						</Typography>
					</Box>

					<Tooltip title=' Ajouter un groupe'>
						<IconButton
							color='primary'
							onClick={() => {
								handleClose();
								setShowNouveauGroupe(true);
							}}
						>
							<FaPlus />
						</IconButton>
					</Tooltip>
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<List disablePadding sx={{ maxHeight: 300, overflowY: "auto" }}>
					{groupes.map((groupe) => (
						<GroupeItem
							key={groupe._id}
							groupe={groupe}
							onUpdate={getGroupes}
						/>
					))}
				</List>

				<Divider sx={{ borderStyle: "dashed" }} />
				<Box sx={{ p: 1 }}>
					<Button fullWidth disableRipple onClick={() => redirectToMainPage()}>
						Voir tout
					</Button>
				</Box>
			</Popover>

			{showNouveauGroupe && (
				<NouveauGroupe
					onDismiss={() => setShowNouveauGroupe(false)}
					onConfirm={(nom, description) => addGroupe(nom, description)}
				/>
			)}
		</>
	);
}

GroupeItem.propTypes = {
	groupe: PropTypes.shape({
		_id: PropTypes.string,
		nom: PropTypes.string,
		description: PropTypes.string,
		createur: PropTypes.string,
		membres: PropTypes.arrayOf(PropTypes.string),
		offres: PropTypes.arrayOf(PropTypes.string),
	}),
};

function GroupeItem({ groupe, onUpdate }) {
	const { avatar, title } = renderContent(groupe);
	const [url, setUrl] = useState("");
	const [showAddUser, setShowAddUser] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));

	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addUserToGroupe(id, email, numero) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addUserToGroupe",
				{
					id,
					email,
					numero,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				onUpdate();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
	}, []);

	return (
		<ListItemButton
			onClick={() => {}}
			sx={{
				py: 1.5,
				px: 2.5,
				mt: "1px",
				...(groupe.isUnRead && {
					bgcolor: "action.selected",
				}),
			}}
		>
			<ListItemText
				primary={title}
				secondary={
					<>
						<Typography
							variant='caption'
							sx={{
								mt: 0.5,
								display: "flex",
								alignItems: "center",
								color: "text.disabled",
							}}
							className='max-w-1/2'
						>
							{groupe.description}
						</Typography>
						<ListItemAvatar className='flex gap-[-5px] mt-1'>
							{groupe.membres.map((item) => (
								<Avatar
									sx={{ bgcolor: "background.neutral" }}
									src={url + item.image}
									className='-mr-3'
									title={item.nom + " " + item.prenom}
								>
									{avatar}
								</Avatar>
							))}
						</ListItemAvatar>
					</>
				}
			/>
			{user.email === (groupe.createur ? groupe.createur.email : "") ? (
				<FaUserPlus
					className='m-2'
					color='FF584D'
					size={20}
					onClick={(e) => {
						e.stopPropagation();
						setShowAddUser(true);
					}}
				/>
			) : (
				""
			)}

			{showAddUser && (
				<AjouterUser
					data={groupe}
					onConfirm={(email, numero) =>
						addUserToGroupe(groupe._id, email, numero)
					}
					onDismiss={() => setShowAddUser(false)}
				/>
			)}
		</ListItemButton>
	);
}

function renderContent(groupe) {
	let avatar = groupe.nom;
	let title = groupe.nom;

	return { avatar, title };
}
