import { ActionTree, MutationTree } from 'vuex'
import FA from '~/config/fa'
import { OrderStatus } from '~/config/types'

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
			value: OrderStatus.SUBMITTED,
		},
		{
			bgClass: 'bg-red-500',
			textClass: 'text-red-500',
			borderClass: 'border-red-500',
			name: FA.cancelled(),
			value: OrderStatus.CANCELLED,
		},
		{
			bgClass: 'bg-purple-500',
			textClass: 'text-purple-500',
			borderClass: 'border-purple-500',
			name: FA.payed(),
			value: OrderStatus.PAYED,
		},
		{
			bgClass: 'bg-green-500',
			textClass: 'text-green-500',
			borderClass: 'border-green-500',
			name: FA.processing(),
			value: OrderStatus.PROCESSING,
		},
		{
			bgClass: 'bg-blue-500',
			textClass: 'text-blue-500',
			borderClass: 'border-blue-500',
			name: FA.delivered(),
			value: OrderStatus.DELIVERED,
		},
	],
})

export type TypeState = ReturnType<typeof state>

export const mutations: MutationTree<TypeState> = {}

export const actions: ActionTree<TypeState, TypeState> = {}
