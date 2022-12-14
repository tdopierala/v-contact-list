import axios from 'axios';
import { defineStore } from 'pinia';
import { User } from 'src/models/user.model';

const api = 'https://reqres.in/api';
const storage = 'favoriteUsers';

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [
			{
				id: 7,
				email: 'michael.lawson@reqres.in',
				first_name: 'Michael',
				last_name: 'Lawson',
				avatar: 'https://reqres.in/img/faces/7-image.jpg',
			},
		] as User[],
		totalPages: 0 as number,
		currentPage: 1 as number,
	}),
	getters: {
		getUser: state => {
			return (userId: number) => state.users.find(user => user.id === userId);
		},
	},
	actions: {
		async fetchUsers(page: number): Promise<void> {
			await axios.get(`${api}/users?page=${page}`).then(res => {
				const favorites: number[] = this.getFavorites();

				this.users = res.data.data;
				this.totalPages = res.data.total_pages;

				this.users.map(user => (user.favorite = favorites.includes(user.id)));
			});
		},
		getFavorites(): number[] {
			return localStorage.getItem(storage) ? JSON.parse(localStorage.getItem(storage) as string) : [];
		},
		addFavorite(userId: number): void {
			const favorites: number[] = this.getFavorites();

			if (!favorites.includes(userId)) {
				favorites.push(userId);
				localStorage.setItem(storage, JSON.stringify(favorites));
			}
		},
		removeFavorite(userId: number): void {
			const favorites: number[] = this.getFavorites();

			if (favorites.includes(userId)) {
				localStorage.setItem(storage, JSON.stringify(favorites.filter(fv => fv !== userId)));
			}
		},
	},
});
