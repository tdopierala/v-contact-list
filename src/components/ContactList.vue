<template>
	<q-page class="flex justify-center">
		<q-list bordered separator class="user-list">
			<q-item clickable v-ripple v-for="user in usersStore.users" :key="user.id" :to="`/user/${user.id}`">
				<q-item-section avatar>
					<q-avatar>
						<img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`" />
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>{{ user.first_name }} {{ user.last_name }}</q-item-label>
					<q-item-label caption>{{ user.email }}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<q-icon name="star" :color="user.favorite ? 'yellow' : 'gray'" @click.prevent="setFavorite(user.id)" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
	<div class="q-pa-lg flex flex-center">
		<q-pagination v-model="usersStore.currentPage" :max="usersStore.totalPages" direction-links />
	</div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useUsersStore } from 'src/stores/users-store';
import { User } from 'src/models/user.model';

const usersStore = useUsersStore();

const getUsers = function (page: number) {
	usersStore.fetchUsers(page);
};

const setFavorite = function (userId: number) {
	const user: User = usersStore.users.find(user => user.id === userId) as User;
	user.favorite = !user.favorite;
	user.favorite ? usersStore.addFavorite(userId) : usersStore.removeFavorite(userId);
};

watch(
	() => usersStore.currentPage,
	newPage => {
		getUsers(newPage);
	}
);

onMounted(() => {
	getUsers(1);
	usersStore.getFavorites();
});
</script>

<style scoped>
.user-list {
	width: 50%;
}
</style>
