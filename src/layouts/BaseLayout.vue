<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-toolbar-title> {{ appName }} </q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-page-container class="q-pa-lg">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const appName = ref('Contact List App');
</script>
