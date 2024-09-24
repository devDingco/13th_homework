/** @format */

export function changeDateToISO(createdAt) {
	let date = new Date(createdAt);
	return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
		date.getDate(),
	).padStart(2, '0')}`;
}
