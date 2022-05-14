import { Plugin } from '@nuxt/types'

const fetch: Plugin = async ({
	store,
	app,
	$axios,
	error,
	redirect,
	route,
}) => {
	if (!store.state?.user?.token || !store.state?.user?.user) {
		redirect(app.$routeUrl.LoginUrl())
	}
}

export default fetch
