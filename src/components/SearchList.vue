<template>
	<div class="q-my-md">
		<q-input v-model="text" label="Search users by name" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['input']);
const text = ref('');

watch(text, txt => {
	emit('input', txt);
});
</script>
