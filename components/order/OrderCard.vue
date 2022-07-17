<template>
	<div
		class="flex flex-col rounded-xl border relative border-gray-100 bg-white shadow-sm overflow-hidden"
		:class="{}"
		@click="$emit('click')"
	>
		<div class="flex flex-col p-5">
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
				<span class="text-sm text-natural-mute font-medium">
					{{ createdString }}
				</span>
				<span
					class="w-1 h-1 rounded-full bg-natural-mute opacity-25 mx-3"
				/>
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.order_code() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold">
					{{ data.tracking_number }}
				</span>
				<span
					class="w-1 h-1 rounded-full bg-natural-mute opacity-25 mx-3"
				/>
				<span class="text-xs text-natural-mute me-1.5">
					{{ $strings.amount() }}
				</span>
				<span class="text-sm text-natural-semidark font-bold me-1">
					{{ totalPriceString }}
				</span>
				<MyIcon name="toman" class="w-5 h-5 text-natural-semidark" />
			</div>
		</div>
		<div v-if="detailed" class="h-px mx-5 bg-gray-100" />
		<div v-if="detailed" class="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
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
		<div v-if="!detailed" class="flex items-center p-1.5" v-dragscroll.x>
			<div v-for="(item, i) in data.items" :key="i" class="p-1.5">
				<div class="relative w-16 h-16">
					<img
						:src="
							$apiUrl.BaseUrl($config) +
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

	get totalPriceString(): string {
		return this.$stringUtils.thousandFormat(this.data?.total_fee)
	}

	get createdString(): string {
		return moment(this.data?.created_at, 'YYYY/MM/DD').format(
			'jDD jMMMM jYYYY'
		)
	}
}
</script>

<style scoped></style>
