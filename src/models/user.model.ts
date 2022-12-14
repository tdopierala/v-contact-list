export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
	favorite?: boolean;
}

export const UserMock: User = {
	id: 0,
	email: '',
	first_name: '',
	last_name: '',
	avatar: '',
	favorite: false,
};
