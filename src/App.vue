<template>
	<v-app>
		<v-app-bar color="primary" class="flex-grow-0">
			<v-toolbar-title class="white--text">Gitlab Group Inspector</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<InspectorForm />
		</v-main>
	</v-app>
</template>

<script>
	import InspectorForm from '@/components/InspectorForm';

	export default {
		name: 'App',

		components: {
			InspectorForm,
		},
	};
</script>
