import api from '@/api/gitlab';

export async function inspectGroup(ctx, rootGroupId) {
	const fetchSubgroupsRecursively = async (group) => {
		const subgroups = await api.Groups.subgroups(group.id);
		const deepSubgroups = await Promise.all(subgroups.map(fetchSubgroupsRecursively));

		return [group, ...deepSubgroups.flat(1)];
	};

	const makeMemberRelations = (resource, key, members) => members.map((member) => ({
		[key]: resource,
		member,
		accessLevel: member.access_level
	}));

	try {
		ctx.commit('setIsLoading', true);

		const groupMemberRelations = [];
		const projectMemberRelations = [];
		const rootGroup = await api.Groups.show(rootGroupId)
		const allGroups = await fetchSubgroupsRecursively(rootGroup);

		await Promise.all(allGroups.map(async (group) => {
			const [groupMembers, groupProjects] = await Promise.all([
				api.GroupMembers.all(group.id),
				api.GroupProjects.all(group.id),
			]);

			groupMemberRelations.push(...makeMemberRelations(group, 'group', groupMembers));

			await Promise.all(groupProjects.map(async (project) => {
				const projectMembers = await api.ProjectMembers.all(project.id);

				projectMemberRelations.push(...makeMemberRelations(project, 'project', projectMembers));
			}));
		}));

		ctx.commit('setGroupMemberRelations', groupMemberRelations);
		ctx.commit('setProjectMemberRelations', projectMemberRelations);
		ctx.commit('setErrorMessage', null);
		ctx.commit('setHasData', true);
	} catch (e) {
		ctx.commit('setErrorMessage', `Failed to inspect group.`);
	} finally {
		ctx.commit('setIsLoading', false);
	}
}
