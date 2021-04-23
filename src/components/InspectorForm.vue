<template>
	<ValidationObserver #default="{invalid}">
		<v-container class="mt-14">
			<v-row justify="center">
				<v-col
					sm="12"
					md="6"
					lg="4"
				>
					<ValidationProvider rules="required">
						<v-text-field
							v-model="groupId"
							label="Group ID"
							hint="Enter Gitlab group ID you want to inspect"
							persistent-hint
						>
							<template #append-outer>
								<v-btn
									:disabled="invalid"
									class="ml-4"
									@click="inspectButtonClickHandler"
								>
									Inspect
								</v-btn>
							</template>
						</v-text-field>
					</ValidationProvider>
				</v-col>
			</v-row>

			<div class="mt-12">
				<v-row v-if="isLoading">
					<v-col class="text-center">
						<v-progress-circular
							:size="80"
							:width="6"
							color="primary"
							indeterminate
						/>
					</v-col>
				</v-row>
				<v-row v-else-if="errorMessage" justify="center">
					<v-col
						sm="12"
						md="6"
						lg="4"
						class="mt-6"
					>
						<v-alert type="error">{{ errorMessage }}</v-alert>
					</v-col>
				</v-row>
				<template v-else-if="hasData">
					<v-expansion-panels key="table" multiple>
						<v-expansion-panel
							v-for="user in userInfo"
							:key="user.id"
							hide-actions
						>
							<v-expansion-panel-header>
								<v-row align="center" class="spacer">
									<v-col sm="3" md="1">
										<a :href="user.url" target="_blank">
											<v-avatar size="36px">
												<img :alt="user.name" :src="user.avatar" />
											</v-avatar>
										</a>
									</v-col>

									<v-col sm="5">
										<strong>{{ user.name }}</strong> (@{{ user.username }})
									</v-col>
								</v-row>
							</v-expansion-panel-header>

							<v-expansion-panel-content>
								<v-divider />
								<div v-if="user.groups.length" class="mt-6">
									<span class="text-h5">Groups</span>
									<v-simple-table class="mt-3 user-access-table">
										<template #default>
											<thead>
												<tr>
													<th class="text-left">Group name</th>
													<th class="text-left">Access level</th>
												</tr>
											</thead>
											<tbody>
											<tr v-for="group in user.groups" :key="group.id">
												<td>
													<a
														:href="group.url"
														class="text-decoration-none"
														target="_blank"
													>
														{{ group.name }}
													</a>
												</td>
												<td>{{ group.accessLevel }}</td>
											</tr>
											</tbody>
										</template>
									</v-simple-table>
								</div>

								<div v-if="user.projects.length" class="mt-6">
									<span class="text-h5">Projects</span>
									<v-simple-table class="mt-3 user-access-table">
										<template #default>
											<thead>
											<tr>
												<th class="text-left">Project name</th>
												<th class="text-left">Access level</th>
											</tr>
											</thead>
											<tbody>
											<tr v-for="project in user.projects" :key="project.id">
												<td>
													<a
														:href="project.url"
														class="text-decoration-none"
														target="_blank"
													>
														{{ project.name }}
													</a>
												</td>
												<td>{{ project.accessLevel }}</td>
											</tr>
											</tbody>
										</template>
									</v-simple-table>
								</div>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
					<v-row>
						<v-col class="text-center mt-6">
							<strong class="text-body-1">Found {{ userInfo.length }} users total.</strong>
						</v-col>
					</v-row>
				</template>
			</div>
		</v-container>
	</ValidationObserver>

</template>

<script>
	import {mapGetters, mapState} from 'vuex';

	export default {
		name: 'InspectorForm',

		data: () => ({
			groupId: '10975505',
		}),

		computed: {
			...mapState(['hasData', 'errorMessage', 'isLoading']),
			...mapGetters(['userInfo']),
		},

		methods: {
			inspectButtonClickHandler() {
				this.$store.dispatch('inspectGroup', this.groupId);
			}
		}
	};
</script>

<style scoped>
	.user-access-table tr > :nth-child(2) {
		width: 10em;
	}
</style>
