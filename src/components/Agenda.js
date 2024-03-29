import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const myEventsList = [
	{
		id: 1,
		title: "Meeting with John",
		start: new Date(2024, 2, 30, 10, 0),
		end: new Date(2024, 2, 30, 11, 30),
	},
	{
		id: 2,
		title: "Lunch break",
		start: new Date(2024, 2, 30, 12, 0),
		end: new Date(2024, 2, 30, 13, 0),
	},
	{
		id: 3,
		title: "Project presentation",
		start: new Date(2024, 3, 1, 14, 0),
		end: new Date(2024, 3, 1, 16, 0),
	},
];

const localizer = momentLocalizer(moment);

export const Agenda = (props) => (
	<div>
		<Calendar
			localizer={localizer}
			events={myEventsList}
			startAccessor='start'
			endAccessor='end'
			style={{ height: 500 }}
		/>
	</div>
);
