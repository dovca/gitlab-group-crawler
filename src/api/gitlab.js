import {Gitlab} from '@gitbeaker/browser';

export default new Gitlab({
	token: process.env.VUE_APP_GITLAB_ACCESS_TOKEN
});
