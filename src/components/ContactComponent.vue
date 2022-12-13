<template>
	<ul>
		<li>{{ user?.first_name }} {{ user?.last_name }}</li>
	</ul>
</template>

<script setup lang="ts">
// import { computed, ref } from 'vue';

import { useUsersStore } from 'src/stores/users-store';
import { useRoute } from 'vue-router';

const usersStore = useUsersStore();
const route = useRoute();

const user = usersStore.getUser(Number(route.params.id));
</script>
