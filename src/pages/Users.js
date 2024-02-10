import React from "react";
import { Form, List } from "../components/users";

export function Users() {
	return (
		<div className='flex'>
			<div className='w-1/2'>
				<Form></Form>
			</div>
			<div className='w-1/2'>
				<List></List>
			</div>
		</div>
	);
}
