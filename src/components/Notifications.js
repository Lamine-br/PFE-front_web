import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { useState } from "react";
import { FaBell, FaCheck, FaClock, FaTag, FaUser } from "react-icons/fa";
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

const NOTIFICATIONS = [
	{
		id: "1",
		title: "Nouvelle offre disponible.",
		description: "KPMG vient de partager une nouvelle offre.",
		avatar: null,
		createdAt: set(new Date(), { hours: 10, minutes: 30 }),
		isUnRead: true,
	},
	{
		id: "2",
		title: "Candidature refusée.",
		description: "KPMG vient de partager une nouvelle offre.",
		avatar: null,
		createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
		isUnRead: true,
	},
];

export default function Notifications() {
	const [notifications, setNotifications] = useState(NOTIFICATIONS);

	const totalUnRead = notifications.filter(
		(item) => item.isUnRead === true
	).length;

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const handleMarkAllAsRead = () => {
		setNotifications(
			notifications.map((notification) => ({
				...notification,
				isUnRead: false,
			}))
		);
	};

	return (
		<>
			<IconButton
				color={open ? "primary" : "default"}
				onClick={handleOpen}
				sx={{ width: 40, height: 40 }}
			>
				<Badge badgeContent={totalUnRead} color='error'>
					<FaBell />
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
						<Typography variant='subtitle1'>Notifications</Typography>
						<Typography variant='body2' sx={{ color: "text.secondary" }}>
							You have {totalUnRead} unread messages
						</Typography>
					</Box>

					{totalUnRead > 0 && (
						<Tooltip title=' Mark all as read'>
							<IconButton color='primary' onClick={handleMarkAllAsRead}>
								<FaCheck />
							</IconButton>
						</Tooltip>
					)}
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<List
					disablePadding
					subheader={
						<ListSubheader
							disableSticky
							sx={{ py: 1, px: 2.5, typography: "overline" }}
						>
							New
						</ListSubheader>
					}
				>
					{notifications.slice(0, 2).map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
						/>
					))}
				</List>

				<Divider sx={{ borderStyle: "dashed" }} />

				<Box sx={{ p: 1 }}>
					<Button fullWidth disableRipple>
						View All
					</Button>
				</Box>
			</Popover>
		</>
	);
}

NotificationItem.propTypes = {
	notification: PropTypes.shape({
		createdAt: PropTypes.instanceOf(Date),
		id: PropTypes.string,
		isUnRead: PropTypes.bool,
		title: PropTypes.string,
		description: PropTypes.string,
		type: PropTypes.string,
		avatar: PropTypes.any,
	}),
};

function NotificationItem({ notification }) {
	const { avatar, title } = renderContent(notification);

	return (
		<ListItemButton
			sx={{
				py: 1.5,
				px: 2.5,
				mt: "1px",
				...(notification.isUnRead && {
					bgcolor: "action.selected",
				}),
			}}
		>
			<ListItemAvatar>
				<Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={title}
				secondary={
					<Typography
						variant='caption'
						sx={{
							mt: 0.5,
							display: "flex",
							alignItems: "center",
							color: "text.disabled",
						}}
					>
						<FaClock className='mr-1' />
						{fToNow(notification.createdAt)}
					</Typography>
				}
			/>
		</ListItemButton>
	);
}

function renderContent(notification) {
	const title = (
		<Typography variant='subtitle2'>
			{notification.title}
			<Typography
				component='span'
				variant='body2'
				sx={{ color: "text.secondary" }}
			>
				&nbsp; {noCase(notification.description)}
			</Typography>
		</Typography>
	);

	if (notification.type === "order_placed") {
		return {
			avatar: (
				<img
					alt={notification.title}
					src='/assets/icons/ic_notification_package.svg'
				/>
			),
			title,
		};
	}
	if (notification.type === "order_shipped") {
		return {
			avatar: (
				<img
					alt={notification.title}
					src='/assets/icons/ic_notification_shipping.svg'
				/>
			),
			title,
		};
	}
	if (notification.type === "mail") {
		return {
			avatar: (
				<img
					alt={notification.title}
					src='/assets/icons/ic_notification_mail.svg'
				/>
			),
			title,
		};
	}
	if (notification.type === "chat_message") {
		return {
			avatar: (
				<img
					alt={notification.title}
					src='/assets/icons/ic_notification_chat.svg'
				/>
			),
			title,
		};
	}
	return {
		avatar: notification.avatar ? (
			<img alt={notification.title} src={notification.avatar} />
		) : (
			<FaUser />
		),
		title,
	};
}
