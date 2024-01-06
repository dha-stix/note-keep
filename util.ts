export interface Content {
	content: string;
	created_at: string;
	title: string;
	slug: string;
	user: string;
	id: number;
}

export const convertDateString = (datetimeString: string): string => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const datetime = new Date(datetimeString);
	const day = datetime.getDate();
	const month = months[datetime.getMonth()];
	const year = datetime.getFullYear();
	const formattedDateString = `${day} ${month}, ${year}`;
	return formattedDateString;
};

export const titleToSlug = (title: string): string => {
	const slug = title.toLowerCase().replace(/\s+/g, "-");
	const cleanSlug = slug.replace(/[^a-zA-Z0-9-]/g, "");
	return cleanSlug + `${Math.random().toString(36).substring(2, 10)}`;
};