export function setGroupMemberRelations(state, payload) {
	state.groupMemberRelations = payload;
}

export function setProjectMemberRelations(state, payload) {
	state.projectMemberRelations = payload;
}

export function setHasData(state, payload) {
	state.hasData = payload;
}

export function setIsLoading(state, payload) {
	state.isLoading = payload;
}

export function setErrorMessage(state, payload) {
	state.errorMessage = payload;
}
