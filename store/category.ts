import Vue from 'vue'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ArticleCategory, ShopCategory } from '~/config/types'
import FA from '~/config/fa'

export const state = () => ({
	articleCategories: Array(5)
		.fill('')
		.map((_, i) => ({
			id: `${i + 1}`,
			title: 'ﻧﺎم دﺳﺘﻪ',
		})) as ArticleCategory[],
	shopCategories: null as ShopCategory[] | null,
})

export type CategoryState = ReturnType<typeof state>

export const mutations: MutationTree<CategoryState> = {
	setArticleCategories(state, articleCategories) {
		Vue.set(state, 'articleCategories', articleCategories)
	},
	setShopCategories(state, shopCategories) {
		Vue.set(state, 'shopCategories', shopCategories)
	},
}

export const actions: ActionTree<CategoryState, CategoryState> = {
	async getShopCategories(context) {
		const r1 = await this.$axios.get(this.$apiUrl.GetShopCategories())
		context.commit('setShopCategories', r1.data || null)
		return r1
	},
}
