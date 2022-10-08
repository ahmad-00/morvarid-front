import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'
import { Product } from '~/config/types'

export const state = () => ({
	basket: [] as Product[],
	selectedAddressId: null as string | null
})

export type BasketState = ReturnType<typeof state>

export const mutations: MutationTree<BasketState> = {
	set(state, basket: Product[]) {
		const b = basket.map(v => ({
			id: v.id,
			title: v.title,
			weight: v.weight,
			main_image: v.main_image,
			price: v.price,
			payable_price: v.payable_price,
			max_order_quantity: v.max_order_quantity,
			category: v.category,
			quantity: v.quantity,
			wholesale_min_count: v.wholesale_min_count,
			wholesale_payable_price: v.wholesale_payable_price,
		}))
		// @ts-ignore
		this.$cookies.set(
			'basket',
			b,
			{
				maxAge: 60 * 60 * 24 * 365,
				path: '/',
				httpOnly: false,
			}
		)
		Vue.set(state, 'basket', b)
	},
	selectAddressId(state, addressId: string | null) {
		Vue.set(state, 'selectedAddressId', addressId)
	}
}

export const actions: ActionTree<BasketState, BasketState> = {
	get(context) {
		if (!context.state.basket.length) {
			let b = null
			try {
				b = this.$cookies.get('basket') || []
			} catch (e) {
				b = []
			}
			context.commit('set', b)
		}
	},
	async add(context, data) {
		const p = context.state.basket.find((t) => t.id == data.productId)
		if (p) {
			await context.commit(
				'set',
				context.state.basket.map((t) =>
					t.id == data.productId ? data : t
				)
			)
		} else {
			context.commit('set', [...context.state.basket, data])
		}
	},
	async remove(context, productId) {
		await context.commit(
			'set',
			context.state.basket.filter((t) => t.id != productId)
		)
	},
	async reset(context) {
		context.commit('set', [])
	},
}
