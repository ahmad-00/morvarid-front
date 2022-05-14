import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { User } from '~/config/types'

export const state = () => ({
	user: null as User | null,
	token: null as string | null,
	refreshToken: null as string | null,
	time: 0,
})

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
	set(state, user) {
		Vue.set(state, 'user', user)
	},
	setTime(state, time) {
		Vue.set(state, 'time', time)
	},
	setToken(state, token) {
		if (!token) {
			// @ts-ignore
			this.$cookies.remove('token')
		} else {
			// @ts-ignore
			this.$cookies.set('token', token, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/',
				httpOnly: false,
			})
		}
		Vue.set(state, 'token', token)
	},
	setRefreshToken(state, refreshToken) {
		if (!refreshToken) {
			// @ts-ignore
			this.$cookies.remove('refresh_token')
		} else {
			// @ts-ignore
			this.$cookies.set('refresh_token', refreshToken, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/',
				httpOnly: false,
			})
		}
		Vue.set(state, 'refreshToken', refreshToken)
	},
}

export const actions: ActionTree<UserState, UserState> = {
	passwordLogin(context, data) {
		const req = this.$axios.post(this.$apiUrl.LoginUrl(), {
			username: data.username,
			password: data.password,
		})
		req.then((res) => {
			const user = res.data as User
			context.commit('setToken', user.token?.access)
			context.commit('setRefreshToken', user.token?.refresh)
			user.token = null
			context.commit('set', user)
		})
		return req
	},
	async profile(context) {
		const r1 = await this.$axios.get(this.$apiUrl.GetUserInfoUrl())
		context.commit('set', r1.data || null)
		return r1
	},
	logout(context) {
		context.commit('setToken', null)
		context.commit('setRefreshToken', null)
		context.commit('set', null)
	},
}
