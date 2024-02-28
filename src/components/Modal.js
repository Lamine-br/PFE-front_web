import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	Avatar,
	IconButton,
	Popover,
} from "@mui/material";

import esi from "../assets/logo_esi.png";
import { FaEllipsisV } from "react-icons/fa";
// mocks_
const account = {
	displayName: "Brahami Lamine",
	email: "jl_brahami@esi.dz",
	photoURL: esi,
};

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "Modifier",
		icon: "eva:home-fill",
	},
	{
		label: "Supprimer",
		icon: "eva:person-fill",
	},
];

// ----------------------------------------------------------------------

export function Modal() {
	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = (event) => {
		event.stopPropagation(); // Arrête la propagation de l'événement
		setOpen(null);
	};

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}
			>
				<FaEllipsisV color='#465475' size={15} />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem key={option.label} onClick={handleClose}>
							{option.label}
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</div>
	);
}
