import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = function ({ app, store, $axios, redirect }, inject) {
	store.commit('user/setToken', app.$cookies.get('token'))
	store.commit('user/setRefreshToken', app.$cookies.get('refresh_token'))

	$axios.onRequest((config) => {
		console.log('onRequest')
		const token = store.state.user.token
		if (token) config.headers['Authorization'] = `Bearer ${token}`
		return config
	})

	$axios.onRequestError((error) => {
		return Promise.reject(error)
	})

	$axios.onResponse((response) => {
		console.log('onResponse: ' + response?.status)
		return response
	})
	$axios.onResponseError(async (error) => {
		console.log('onResponse: ' + error.code + ' ' + error?.response?.status)
		if (!error.response) {
			return Promise.reject(error)
		}

		const originalRequest = error.config
		const refreshToken = store.state.user.refreshToken

		if (
			[400, 401, 403].includes(error.response.status) &&
			originalRequest.url === app.$apiUrl.RefreshTokenUrl()
		) {
			store.commit('user/setToken', null)
			store.commit('user/setRefreshToken', null)
			store.commit('user/set', null)
			redirect(app.$routeUrl.LoginUrl())
			return Promise.reject(error)
		}

		if ([401, 403].includes(error.response.status) && refreshToken) {
			return $axios
				.post(app.$apiUrl.RefreshTokenUrl(), {
					refresh: refreshToken,
				})
				.then((r) => {
					store.commit('user/setToken', r.data.access)
					store.commit('user/setRefreshToken', refreshToken)
					return $axios(originalRequest)
				})
		}

		return Promise.reject(error)
	})
}

export default myPlugin
