<template>
	<div
		class="flex flex-col rounded-xl border relative border-gray-100 bg-white shadow-sm overflow-hidden"
		:class="{}"
		@click="$emit('click')"
	>
		<div v-if="data" class="flex flex-col p-5">
			<div class="flex items-center mb-5">
				<div
					class="flex items-center rounded-md bg-opacity-10 p-0.5"
					:class="{ [status.bgClass]: true }"
				>
					<MyIcon
						name="bag"
						class="w-5 h-5 text-white me-1.5 rounded-md p-0.5"
						:class="{ [status.bgClass]: true }"
					/>
					<span class="text-xs me-1 text-natural-semidark">
						{{ status.name || '~' }}
					</span>
				</div>
				<div class="flex-grow" />
				<MyIcon
					v-if="!detailed"
					name="arrow-left"
					class="w-5 h-5 text-natural-dark"
				/>
			</div>
			<div class="flex items-center flex-wrap">
				<div class="flex items-center">
					<span class="text-sm text-natural-mute font-medium">
						{{ createdString }}
					</span>
				</div>
				<div class="flex items-center">
					<span
						class="w-1 h-1 rounded-full bg-natural-mute opacity-25 mx-3"
					/>
					<span class="text-xs text-natural-mute me-1.5">
						{{ $strings.order_code() }}
					</span>
					<span class="text-sm text-natural-semidark font-bold">
						{{ data.tracking_number }}
					</span>
				</div>
				<div class="flex items-center">
					<span
						class="w-1 h-1 rounded-full bg-natural-mute opacity-25 mx-3"
					/>
					<span class="text-xs text-natural-mute me-1.5">
						{{ $strings.amount() }}
					</span>
					<span class="text-sm text-natural-semidark font-bold me-1">
						{{ formattedActualTotalPrice }}
					</span>
					<MyIcon
						name="toman"
						class="w-5 h-5 text-natural-semidark"
					/>
				</div>
				<div v-if="discountPrice" class="flex items-center">
					<span
						class="w-1 h-1 rounded-full bg-natural-mute opacity-25 mx-3"
					/>
					<span class="text-xs text-natural-mute me-1.5">
						{{ $strings.discount() }}
					</span>
					<span class="text-sm text-natural-semidark font-bold me-1">
						{{ formattedDiscountPrice }}
					</span>
					<MyIcon
						name="toman"
						class="w-5 h-5 text-natural-semidark"
					/>
				</div>
			</div>
		</div>
		<div v-if="detailed" class="h-px mx-5 bg-gray-100" />
		<div
			v-if="detailed && data"
			class="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5"
		>
			<div class="flex items-center">
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.province() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold">
					{{ data.address.province || '~' }}
				</span>
			</div>
			<div class="flex items-center">
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.city() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold">
					{{ data.address.city || '~' }}
				</span>
			</div>
			<div class="flex items-center">
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.postal_code() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold">
					{{ data.address.postal_code || '~' }}
				</span>
			</div>
			<div class="flex items-center">
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.address() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold">
					{{ data.address.details || '~' }}
				</span>
			</div>
		</div>
		<div class="h-px bg-gray-100" />
		<div
			v-if="!detailed && data"
			class="flex items-center p-1.5"
			v-dragscroll.x
		>
			<div v-for="(item, i) in data.items" :key="i" class="p-1.5">
				<div class="relative w-16 h-16">
					<img
						v-if="item.product_detail.main_image"
						:src="
							$apiUrl.MediaBaseUrl($config) +
							$apiUrl.GetMediaUrl(item.product_detail.main_image)
						"
						class="rounded-xl w-full h-full"
						alt=""
					/>
					<div
						class="absolute left-0 top-0 w-full h-full rounded-xl border-2 border-primary border-opacity-25 shadow-inner pointer-events-none"
					/>
				</div>
			</div>
		</div>
		<div
			v-if="detailed"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5"
		>
			<ProductCard
				v-for="(product, i) in products"
				:key="i"
				:product="product"
			/>
		</div>
		<div
			v-if="
				detailed &&
				data &&
				['submitted', 'payed', 'processing'].includes(
					data && data.status
				)
			"
			class="flex items-center p-5 border-t border-gray-100 bg-gray-50"
		>
			<div class="flex-grow" />
			<span
				v-if="['submitted'].includes(data && data.status)"
				class="text-sm text-white font-bold ripple-bg-yellow-500 px-4 py-2 rounded-md ms-4 cursor-pointer"
				@click="$emit('pay')"
			>
				{{ $strings.pay() }}
			</span>
			<span
				v-if="
					['submitted', 'payed', 'processing'].includes(
						data && data.status
					)
				"
				class="text-sm text-white font-bold ripple-bg-red-500 px-4 py-2 rounded-md ms-4 cursor-pointer"
				@click="$emit('cancel')"
			>
				{{ $strings.cancel_order() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Order, Product } from '~/config/types'
import moment from 'moment-jalaali'
import ProductCard from '~/components/product/ProductCard.vue'

moment.loadPersian()

@Component({
	middleware: ['fetch', 'auth'],
	components: { ProductCard, MyIcon },
})
export default class OrderCard extends Vue {
	@Prop({}) data?: Order
	@Prop({}) detailed?: boolean

	get orderStatuses(): any[] {
		return this.$store.state.type.orderStatuses || []
	}

	get status(): any {
		return (
			this.orderStatuses.find((v) => v.value === this.data?.status) ||
			this.orderStatuses[0]
		)
	}

	get products(): Product[] {
		return (
			(this.data?.items?.map((v) => ({
				...v.product_detail,
				quantity: v.quantity,
			})) as Product[]) || []
		)
	}

	get totalPrice(): number {
		return (
			this.products
				.map((v) => (v.quantity || 0) * v.price)
				.reduce((a, b) => a + b, 0) || 0
		)
	}

	get actualTotalPrice(): number {
		return (
			this.products
				.map((v) => {
					const q = Number(v.quantity) || 0
					if (
						q >= v.wholesale_min_count &&
						v.wholesale_payable_price
					) {
						return (v.quantity || 0) * v.wholesale_payable_price
					} else if (v.payable_price) {
						return (v.quantity || 0) * v.payable_price
					} else {
						return (v.quantity || 0) * v.price
					}
				})
				.reduce((a, b) => a + b, 0) || 0
		)
	}

	get discountPrice(): number {
		return this.totalPrice - this.actualTotalPrice
	}

	get formattedTotalPrice(): string {
		return this.$stringUtils.prettyPrice(this.totalPrice) || ''
	}

	get formattedActualTotalPrice(): string {
		return this.$stringUtils.prettyPrice(this.actualTotalPrice) || ''
	}

	get formattedDiscountPrice(): string {
		return this.$stringUtils.prettyPrice(this.discountPrice) || ''
	}

	get createdString(): string {
		return moment(this.data?.created_at, 'YYYY/MM/DD').format(
			'jDD jMMMM jYYYY'
		)
	}
}
</script>

<style scoped></style>
