import { Stack, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import errorImage from "../assets/error.png"; // Import the image

export function Error() {
	return (
		<Stack
			id='home'
			sx={{
				display: "flex",
				width: "50%",
				height: "500px",
				mb: { xs: 10, sm: 0 },
				mt: 5,
				ml: 35,
				position: "relative", // Added relative positioning
			}}
		>
			<img
				src={errorImage} // Use the imported image
				alt='Error'
				style={{
					width: "100%",
					height: "350px",
					objectFit: "cover",
					position: "absolute",
					overflowY: "hidden",
					top: 80,
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					width: "80%",
					paddingLeft: { xs: 2, sm: 10 },
					textAlign: { xs: "center", sm: "left" },
					paddingTop: 1,
					ml: 20,
				}}
			>
				<Typography
					sx={{
						fontWeight: 800,
						color: "#FF584D",
					}}
					variant='h2'
				>
					Oops !
				</Typography>
				<Typography
					sx={{
						ml: -10,
						fontWeight: 800,
						color: "#000000",
					}}
					variant='h5'
				>
					Erreur 404 - Page Introuvable
				</Typography>
				<Box sx={{ ml: 1, mt: 1 }}>
					<Button
						variant='contained'
						sx={{
							fontFamily: "Acme",
							height: "40px",
							width: "160px",
							backgroundColor: "#FF584D",
							borderRadius: "10px",
							color: "white",
							"&:hover": {
								backgroundColor: "#AC2117",
							},
						}}
						component={Link}
						to='/'
					>
						<Typography
							sx={{
								fontWeight: 600,
								fontSize: "13px",
								textDecoration: "none",
								"&::first-letter": {
									textTransform: "uppercase",
								},
								textTransform: "lowercase",
							}}
						>
							Retour à l&apos;accueil
						</Typography>
					</Button>
				</Box>
			</Box>
		</Stack>
	);
}
