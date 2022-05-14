import { Plugin } from '@nuxt/types'

const fetch: Plugin = async ({ store, app, $axios, error, redirect }) => {
	if (store.state?.user?.token && store.state?.user?.user) {
		redirect(app.$routeUrl.HomeUrl())
	}
}

export default fetch
