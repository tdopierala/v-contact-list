<template>
	<q-list bordered separator>
		<q-item clickable v-ripple v-for="user in usersStore.users" :key="user.id" :to="`/user/${user.id}`">
			<q-item-section>
				<q-item-label>{{ user.first_name }} {{ user.last_name }}</q-item-label>
				<q-item-label caption>{{ user.email }}</q-item-label>
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useUsersStore } from 'src/stores/users-store';

const usersStore = useUsersStore();

onMounted(() => {
	console.log(usersStore.fetchUsers());
});
</script>
