<template>
	<div class="flex justify-center">
		<q-card class="q-ma-lg user-card" v-if="user">
			<q-card-section>
				<q-btn color="primary" icon="arrow_left" label="back to list" @click="router.back()" />
			</q-card-section>
			<q-card-section class="q-pa-lg">
				<q-avatar>
					<img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`" />
				</q-avatar>
				<div class="text-h4 q-mb-xs">{{ user.first_name }} {{ user.last_name }}</div>
				<div class="text-caption text-grey">{{ user.email }}</div>
			</q-card-section>

			<q-card-actions align="left" class="q-pa-lg">
				<q-btn flat round :color="user.favorite ? 'red' : 'gray'" icon="favorite" @click.prevent="toggleFavorite(user.id)" />
				<q-btn flat round :color="bookmark ? 'teal' : 'gray'" icon="bookmark" :disable="!bookmark" />
				<q-btn flat round :color="share ? 'primary' : 'gray'" icon="share" :disable="!share" />
			</q-card-actions>
		</q-card>

		<div v-if="!user">Error 404. User not found.</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useUsersStore } from 'src/stores/users-store';
import { useRoute, useRouter } from 'vue-router';
import { User, UserMock } from 'src/models/user.model';

const usersStore = useUsersStore();
const router = useRouter();
const route = useRoute();

const user = ref(UserMock);
const bookmark = ref(false);
const share = ref(false);

const toggleFavorite = function (userId: number) {
	user.value.favorite = !user.value.favorite;
	usersStore.setFavorite(userId);
};

onMounted(() => {
	usersStore.fetchUser(Number(route.params.id)).then(res => {
		const favorites: number[] = usersStore.getFavorites();
		const usr: User = res.data.data;
		usr.favorite = favorites.includes(usr.id);
		user.value = usr;
	});
});
</script>

<style scoped>
.user-card {
	min-width: 400px;
}
</style>
