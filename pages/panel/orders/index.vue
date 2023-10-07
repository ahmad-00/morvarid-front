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
					class="flex items-center bg-white rounded-md border border-gray-200 self-start ps-3 py-1 overflow-hidden"
				>
					<span
						class="text-natural-dark pe-3 text-xs border-e border-gray-200"
					>
						{{ $strings.status() }}
					</span>
					<div class="flex items-center overflow-hidden px-3 -me-2" v-dragscroll.x>
						<span
							v-for="(s, i) in statuses"
							:key="i"
							class="text-xs px-2 py-1 rounded-md me-2 border cursor-pointer duration-300 flex-shrink-0 whitespace-nowrap"
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
			<OrderCard
				:data="targetOrder"
				class="mb-6"
				:detailed="true"
				@pay="payOrder"
				@cancel="openCancelOrderDialog"
			/>
		</template>
		<ModalContainer
			:visible="isCancelDialogVisible"
			:title="$strings.cancel_order()"
			size="lg"
			:loading="modalLoading"
			@close="isCancelDialogVisible = false"
		>
			<div class="flex flex-col items-center text-center p-8">
				<span class="text-sm text-natural-semidark">
					{{ $strings.cancel_order_message() }}
				</span>
			</div>
			<div class="px-8 pb-8 grid grid-cols-1 gap-6">
				<TextInput
					:label="$strings.recipient_phone_number()"
					v-model="cancelDialogData.iban"
					name="iban"
					:errors="cancelDialogErrors"
				/>
				<TextInput
					:label="$strings.full_name_of_account_holder()"
					v-model="cancelDialogData.account_owner_full_name"
					name="account_owner_full_name"
					:errors="cancelDialogErrors"
				/>
			</div>
			<div
				slot="footer"
				class="flex items-center justify-end border-t border-gray-200 p-4"
			>
				<button
					class="me-4 ripple-bg-white border-2 border-gray-200 ripple-bg-white text-natural-semidark px-8 py-3 font-bold rounded-xl"
					@click="isCancelDialogVisible = false"
				>
					{{ $strings.cancel() }}
				</button>
				<button
					class="text-white px-8 py-3 font-bold rounded-xl ripple-bg-red-500"
					@click="cancelOrder"
				>
					{{ $strings.cancel_order() }}
				</button>
			</div>
		</ModalContainer>
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
import Pagination from '~/components/utils/Pagination.vue'
import UndrawNoData from '~/assets/img/undraw_no_data.svg'
import ModalContainer from '~/components/utils/ModalContainer.vue'
import TextInput from '~/components/utils/TextInput.vue'

export const LIMIT = 12

@Component({
	middleware: ['fetch', 'auth'],
	components: {
		ModalContainer,
		Pagination,
		OrderCard,
		PanelContainer,
		UserMenu,
		MyIcon,
		UndrawNoData,
		TextInput,
	},
})
export default class PanelOrdersPage extends Vue {
	fetched = false
	loading = false

	orders = [] as Order[]
	total = 0
	targetOrder = null as Order | null
	isCancelDialogVisible = false
	modalLoading = false
	cancelDialogData = {
		iban: '',
		account_owner_full_name: '',
	}
	cancelDialogErrors = null as any

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

	payOrder() {
		this.$router.push({
			path: this.$routeUrl.ShopBasketUrl(),
			query: {
				tracking_number: this.targetOrder?.tracking_number,
			},
		})
	}

	openCancelOrderDialog() {
		this.cancelDialogErrors = null
		this.cancelDialogData = {
			iban: '',
			account_owner_full_name: '',
		}
		this.isCancelDialogVisible = true
	}

	async cancelOrder() {
		this.modalLoading = true
		try {
			await this.$axios.post(
				this.$apiUrl.CancelOrderUrl(this.targetOrder?.id),
				{
					iban: this.cancelDialogData.iban,
					account_owner_full_name:
						this.cancelDialogData.account_owner_full_name,
				}
			)
			this.$toast.success(this.$strings.order_canceled(), '', {} as any)
			this.modalLoading = false
			this.isCancelDialogVisible = false
			this.targetOrder = null
			await this.fetchData()
		} catch (e: any) {
			this.cancelDialogErrors = this.$toastErrors(this, e, false)
			this.modalLoading = false
		}
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
