<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="orders"
		@tryAgain="fetchData"
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
			<div class="flex items-center mb-8">
				<div
					class="flex items-center bg-white rounded-md border border-gray-200 self-start px-3 py-1"
				>
				<span
					class="text-natural-dark pe-3 me-3 text-xs border-e border-gray-200"
				>
					{{ $strings.status() }}
				</span>
					<div class="flex items-center -me-2">
					<span
						v-for="(s, i) in statuses"
						:key="i"
						class="text-xs px-2 py-1 rounded-md me-2 border cursor-pointer duration-300"
						:class="{
							'border-opacity-100 bg-opacity-10':
								s.value === status.value,
							[status.borderClass]: s.value === status.value,
							[status.bgClass]: s.value === status.value,
							[status.textClass]: s.value === status.value,
							'bg-opacity-0 border-opacity-0 text-natural-semidark ':
								s.value !== status.value,
						}"
						@click="changeStatus(s.value)"
					>
						{{ s.name }}
					</span>
					</div>
				</div>
				<div class="flex-grow" />
			</div>
			<div v-if="orders && orders.length" class="flex flex-col">
				<OrderCard
					v-for="(order, i) in orders"
					:key="i"
					:data="order"
					class="mb-6 cursor-pointer"
					@click="targetOrder = order"
				/>
			</div>
			<UndrawNoData
				v-else
				class="w-full max-w-xs h-auto text-primary self-center mt-16 mb-12"
			/>
			<Pagination
				:total="total"
				:limit="limit"
				:current="page"
				:link="$routeUrl.PanelOrdersUrl"
				class="self-center mt-4 mb-12"
			/>
		</template>
		<template v-else>
			<OrderCard :data="targetOrder" class="mb-6" :detailed="true" />
		</template>
	</PanelContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import UserMenu from '~/components/home/UserMenu.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import PanelContainer from '~/components/panel/PanelContainer.vue'
import { Order } from '~/config/types'
import OrderCard from '~/components/order/OrderCard.vue'
import { StatusType } from '~/store/type'
import Pagination from "~/components/utils/Pagination.vue";
import UndrawNoData from '~/assets/img/undraw_no_data.svg'

export const LIMIT = 12

@Component({
	middleware: ['fetch', 'auth'],
	components: {
		Pagination,
		OrderCard,
		PanelContainer,
		UserMenu,
		MyIcon,
		UndrawNoData,
	},
})
export default class PanelOrdersPage extends Vue {
	fetched = false
	loading = false
	orders = [] as Order[]
	total = 0
	targetOrder = null as Order | null

	@Watch('$route.query')
	onRouteQueryChange() {
		this.fetchData()
	}

	get limit(): any {
		return LIMIT
	}

	get page(): any {
		return Math.max(Number(this.$route.params.page) || 1, 1) || 1
	}

	get statuses(): StatusType[] {
		return this.$store.state.type.orderStatuses
	}

	get status(): StatusType {
		return (
			this.statuses.find((v) => v.value == this.$route.query.status) ||
			this.statuses.find((v) => v.value == 'processing') ||
			this.statuses[0]
		)
	}

	changeStatus(v: any) {
		if (this.status.value == v) return
		this.$router.replace({
			path: this.$routeUrl.PanelOrdersUrl(1),
			query: {
				...this.$route.query,
				status: v,
			},
		})
	}

	async fetchData() {
		this.fetched = false
		this.loading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.GetOrdersUrl(), {
				params: {
					limit: LIMIT,
					offset: (this.page - 1) * LIMIT,
					status: this.status.value,
				},
			})
			this.orders = r.data.results
			this.total = r.data.count
			this.fetched = true
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	mounted() {
		this.fetchData()
	}

	head() {
		return {
			title: this.$strings.orders() + ' | ' + this.$strings.app_title(),
		}
	}
}
</script>

<style scoped></style>
