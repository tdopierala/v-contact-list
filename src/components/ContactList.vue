<template>
	<div class="flex column justify-center q-mx-auto users-list-container">
		<search-list @input="usersStore.filterUsers" />

		<q-list bordered separator v-if="usersStore.users.length">
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
					<q-btn flat round icon="favorite" :color="user.favorite ? 'red' : 'gray'" @click.prevent="usersStore.setFavorite(user.id)" />
				</q-item-section>
			</q-item>
		</q-list>

		<q-list bordered separator v-if="!usersStore.users.length">
			<q-item v-ripple>
				<q-item-section>
					<q-item-label>No elements found.</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</div>
	<div class="q-pa-lg flex flex-center">
		<q-pagination v-model="usersStore.currentPage" :max="usersStore.totalPages" direction-links />
	</div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useUsersStore } from 'src/stores/users-store';
import SearchList from './SearchList.vue';

const usersStore = useUsersStore();

const getUsers = function (page: number) {
	usersStore.fetchUsers(page);
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
.users-list-container {
	max-width: 60%;
}
</style>
