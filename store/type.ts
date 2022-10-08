import { ActionTree, MutationTree } from 'vuex'
import FA from '~/config/fa'

export type StatusType = {
	name: string
	value: string
	borderClass: string
	bgClass: string
	textClass: string
}

export const state = () => ({
	orderStatuses: [
		{
			bgClass: 'bg-yellow-500',
			textClass: 'text-yellow-500',
			borderClass: 'border-yellow-500',
			name: FA.submitted(),
			value: 'submitted',
		},
		{
			bgClass: 'bg-red-500',
			textClass: 'text-red-500',
			borderClass: 'border-red-500',
			name: FA.cancelled(),
			value: 'cancelled',
		},
		{
			bgClass: 'bg-purple-500',
			textClass: 'text-purple-500',
			borderClass: 'border-purple-500',
			name: FA.payed(),
			value: 'payed',
		},
		{
			bgClass: 'bg-green-500',
			textClass: 'text-green-500',
			borderClass: 'border-green-500',
			name: FA.processing(),
			value: 'processing',
		},
		{
			bgClass: 'bg-blue-500',
			textClass: 'text-blue-500',
			borderClass: 'border-blue-500',
			name: FA.delivered(),
			value: 'delivered',
		},
	],
})

export type TypeState = ReturnType<typeof state>

export const mutations: MutationTree<TypeState> = {}

export const actions: ActionTree<TypeState, TypeState> = {}
