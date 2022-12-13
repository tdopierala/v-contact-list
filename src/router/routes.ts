import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('layouts/BaseLayout.vue'),
		children: [
			{ path: '', component: () => import('components/ContactList.vue') },
			{ path: '/user/:id', component: () => import('components/ContactComponent.vue') },
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
