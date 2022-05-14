import { Plugin } from '@nuxt/types'

const fetch: Plugin = async ({ store, app, $axios, error, redirect }) => {
	try {
		const requests = []
		if (!store.state.category.shopCategories) {
			requests.push(store.dispatch('category/getShopCategories'))
		}
		if (store.state.user.token && !store.state.user.user) {
			requests.push(store.dispatch('user/profile'))
		}
		if (requests.length) {
			requests.push(store.dispatch('basket/get'))
		}
		await Promise.all(requests)
	} catch (e: any) {
		if ([401, 403].includes(e.response?.status)) {
			redirect(app.$routeUrl.LoginUrl())
		} else if (error) {
			app.$errorPage(error, e)
		}
		return
	}
}

export default fetch
