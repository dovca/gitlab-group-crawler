import {accessLevelNames} from '@/libs/helpers';

export function userInfo(state) {
	const members = {};
	const allRelations = [...state.groupMemberRelations, ...state.projectMemberRelations];

	allRelations.forEach(({member, group, project, accessLevel}) => {
		if (!members[member.id]) {
			members[member.id] = {
				id: member.id,
				username: member.username,
				name: member.name,
				avatar: member.avatar_url,
				url: member.web_url,
				groups: [],
				projects: [],
			};
		}

		const aggregatedMemberData = members[member.id];

		if (group) {
			aggregatedMemberData.groups.push({
				id: group.id,
				name: group.full_name,
				url: group.web_url,
				accessLevel: accessLevelNames[accessLevel],
			});
		}

		if (project) {
			aggregatedMemberData.projects.push({
				id: project.id,
				name: project.name_with_namespace,
				url: project.web_url,
				accessLevel: accessLevelNames[accessLevel],
			});
		}
	});

	return Object.values(members);
}
