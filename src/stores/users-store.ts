import axios from 'axios';
import { defineStore } from 'pinia';
import { User, UserMock } from 'src/models/user.model';

const api = 'https://reqres.in/api';
const storage = 'favoriteUsers';

export const useUsersStore = defineStore('users', {
	state: () => ({
		users: [UserMock] as User[],
		usersB: [UserMock] as User[],
		totalPages: 0 as number,
		currentPage: 1 as number,
	}),

	getters: {
		getUser: state => {
			return (userId: number) => state.users.find(user => user.id === userId);
		},
		getUsers: state => state.users.filter(() => true),
		// filterUsers: state => {
		// 	return (phrase: string) =>
		// 		state.users.filter(user => {
		// 			if (phrase === '') return true;
		// 			else return user.first_name.toLowerCase().includes(phrase.toLowerCase()) || user.last_name.toLowerCase().includes(phrase.toLowerCase());
		// 		});
		// },
	},

	actions: {
		async fetchUsers(page: number): Promise<void> {
			await axios
				.get(`${api}/users?page=${page}`)
				.then(res => {
					const favorites: number[] = this.getFavorites();

					this.users = res.data.data;
					this.totalPages = res.data.total_pages;

					this.users.map(user => (user.favorite = favorites.includes(user.id)));
					this.usersB = this.users;
				})
				.catch(error => {
					this.users.length = 0;
					console.log(error);
				});
		},

		async fetchUser(userId: number) {
			return await axios.get(`${api}/users/${userId}`);
		},

		filterUsers(pharse: string) {
			this.users = this.usersB;
			this.users = this.users.filter(user => {
				return user.first_name.toLowerCase().includes(pharse.toLowerCase()) || user.last_name.toLowerCase().includes(pharse.toLowerCase());
			});
		},

		getFavorites(): number[] {
			return localStorage.getItem(storage) ? JSON.parse(localStorage.getItem(storage) as string) : [];
		},

		setFavorite(userId: number): void {
			const user: User = this.users.find(user => user.id === userId) as User;
			user.favorite = !user.favorite;
			user.favorite ? this.addFavorite(userId) : this.removeFavorite(userId);
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
