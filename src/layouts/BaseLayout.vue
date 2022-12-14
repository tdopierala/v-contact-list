<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

				<q-toolbar-title> Quasar App </q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>

			<q-tabs align="left">
				<q-route-tab to="/page1" label="Page One" />
				<q-route-tab to="/page2" label="Page Two" />
				<q-route-tab to="/page3" label="Page Three" />
			</q-tabs>
		</q-header>

		<!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
			</q-list>
		</q-drawer> -->

		<q-page-container class="q-pa-md">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
