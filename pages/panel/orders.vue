<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="orders"
	>
		<div class="flex items-center mb-10">
			<MyIcon
				v-if="targetOrder"
				name="arrow-left"
				class="transform rotate-180 w-8 h-8 me-2 text-natural-dark cursor-pointer"
				@click="targetOrder = null"
			/>
			<span class="text-xl font-bold text-natural-dark me-4">
				<span v-if="!targetOrder">
					{{ $strings.orders() }}
				</span>
				<span v-else>
					{{ $strings.order() + ' ' + targetOrder.tracking_number }}
				</span>
			</span>
		</div>
		<template v-if="!targetOrder">
			<div v-if="orders && orders.length" class="flex flex-col">
				<OrderCard
					v-for="(order, i) in orders"
					:key="i"
					:data="order"
					class="mb-6 cursor-pointer"
					@click="targetOrder = order"
				/>
			</div>
		</template>
		<template v-else>
			<OrderCard
				:data="targetOrder"
				class="mb-6"
				:detailed="true"
			/>
		</template>
	</PanelContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserMenu from '~/components/home/UserMenu.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import PanelContainer from '~/components/panel/PanelContainer.vue'
import { Order } from '~/config/types'
import OrderCard from '~/components/order/OrderCard.vue'

@Component({
	middleware: ['fetch', 'auth'],
	components: {
		OrderCard,
		PanelContainer,
		UserMenu,
		MyIcon,
	},
})
export default class PanelAddressesPage extends Vue {
	fetched = false
	loading = false
	orders = [] as Order[]
	targetOrder = null as Order | null

	async fetchData() {
		this.fetched = false
		this.loading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.GetOrdersUrl(), {
				params: {
					limit: 50,
					offset: 0,
				},
			})
			this.orders = r.data.results
			this.fetched = true
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	mounted() {
		this.fetchData()
	}
}
</script>

<style scoped></style>
