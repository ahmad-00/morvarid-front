<template>
	<div
		class="flex flex-col"
		:class="{
			'animate-pulse': loading,
		}"
	>
		<nuxt-link
			v-if="!loading"
			:to="$routeUrl.ShopProductUrl(product.id)"
			class="relative w-full rounded-13 block mt-8"
		>
			<div
				class="w-full h-1/2 bg-primary-dark bg-opacity-5 absolute left-0 top-0 -mt-8 rounded-13"
			/>
			<div class="pt-1/1 rounded-13 overflow-hidden relative bg-white">
				<img
					:src="
						$apiUrl.MediaBaseUrl($config) +
						$apiUrl.GetMediaUrl(product.main_image)
					"
					alt=""
					class="w-full h-full absolute left-0 top-0 object-cover"
				/>
				<div
					class="absolute left-0 right-0 bottom-0 flex items-center mb-6 mx-6 justify-end"
				>
					<div
						v-if="hasDiscount"
						class="text-white bg-green-500 border-white border-2 rounded-full py-1 px-3 text-xs font-medium"
					>
						{{ discountPercent + '٪' }}
					</div>
				</div>
				<span
					v-if="product.quantity"
					class="w-8 h-8 bg-white rounded-xl absolute end-0 top-0 start-0 mx-auto mt-4 flex items-center justify-center text-sm text-natural-semidark font-bold shadow-sm p-0.5"
				>
					<span class="line-clamp-1">
						{{ product.quantity }}
					</span>
				</span>
				<div
					class="absolute left-0 top-0 w-full h-full rounded-13 border-2 border-primary border-opacity-25 shadow-inner pointer-events-none"
				/>
				<div
					class="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-primary-dark bg-opacity-30 cursor-pointer opacity-0 hover:opacity-100 duration-300"
				>
					<span
						class="rounded-full bg-primary-dark cursor-pointer w-10 h-10 p-2.5"
					>
						<MyIcon name="eye" class="w-full h-full text-white" />
					</span>
				</div>
			</div>
		</nuxt-link>
		<div v-else class="relative w-full mt-8">
			<div
				class="w-full h-1/2 bg-gray-200 bg-opacity-25 absolute left-0 top-0 -mt-8 rounded-13"
			/>
			<div class="pt-1/1 rounded-13 bg-gray-200 w-full"></div>
		</div>
		<div class="flex items-start mt-4">
			<nuxt-link
				v-if="!loading"
				:to="$routeUrl.ShopProductUrl(product.id)"
				class="text-lg font-bold text-natural-dark hover:text-primary duration-300 line-clamp-2 me-4"
			>
				{{ product.title || '~' }}
			</nuxt-link>
			<span v-else class="bg-gray-200 rounded-md w-20 me-3">
				<span class="text-lg opacity-0 select-none"> . </span>
			</span>
			<span class="flex-grow" />
			<div v-if="!loading" class="flex flex-col">
				<div class="flex items-center">
					<span
						class="text-lg font-bold text-natural-dark flex-shrink-0"
					>
						{{ formattedPrice || '0' }}
					</span>
					<MyIcon
						name="toman"
						class="w-6 h-6 text-natural-dark ms-1 flex-shrink-0"
					/>
				</div>
				<div
					v-if="hasDiscount"
					class="flex items-center mt-1 self-center"
				>
					<span
						class="text-sm font-normal text-natural-mute flex-shrink-0 line-through text-opacity-50"
					>
						{{ formattedMainPrice || '0' }}
					</span>
				</div>
			</div>
			<span v-else class="bg-gray-200 rounded-md w-12">
				<span class="text-lg opacity-0 select-none"> . </span>
			</span>
		</div>
		<span class="flex-grow" />
		<div
			v-if="!loading && (product.quantity ? isWholesale : hasWholesale)"
			class="flex items-center mt-1"
		>
			<span class="text-xs font-bold text-yellow-500 flex-shrink-0">
				{{ formattedWholesaleDiscountPrice || '0' }}
			</span>
			<MyIcon
				name="toman"
				class="w-4 h-4 text-yellow-500 mx-1 flex-shrink-0"
			/>
			<span class="text-xs font-medium text-yellow-500 flex-shrink-0">
				{{ $strings.wholesale_discount() }}
			</span>
		</div>
		<div v-if="!loading" class="flex items-center mt-2">
			<span class="text-sm text-natural-dark opacity-50 me-2">
				{{ (product.weight && weightString) || '~' }}
			</span>
			<span
				class="rounded-md bg-primary bg-opacity-10 px-2.5 py-1 text-xs font-bold text-primary-dark"
			>
				{{ (category && category.name) || '~' }}
			</span>
		</div>
		<span v-else class="bg-gray-200 rounded-md w-32 mt-2">
			<span class="text-sm opacity-0 select-none"> . </span>
		</span>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Product, ShopCategory } from '~/config/types'

@Component({
	components: { MyIcon },
})
export default class ProductCard extends Vue {
	@Prop() product!: Product
	@Prop({ default: false }) loading?: boolean

	get hasDiscount(): boolean {
		return (
			!!this.product.payable_price &&
			this.product.payable_price != this.product.price
		)
	}

	get hasWholesale(): boolean {
		return (
			!!this.product.wholesale_payable_price &&
			this.product.payable_price != this.product.wholesale_payable_price
		)
	}

	get isWholesale(): boolean {
		const q = Number(this.product.quantity) || 0
		return (
			!!this.product.wholesale_payable_price &&
			this.product.payable_price !=
				this.product.wholesale_payable_price &&
			q >= this.product.wholesale_min_count
		)
	}

	get formattedMainPrice(): string {
		return this.$stringUtils.thousandFormat(this.product.price || '') || ''
	}

	get formattedPrice(): string {
		if (this.hasDiscount) {
			return this.formattedPayablePrice
		} else {
			return this.$stringUtils.prettyPrice(this.product.price || '') || ''
		}
	}

	get formattedPayablePrice(): string {
		return (
			this.$stringUtils.prettyPrice(this.product.payable_price || '') ||
			''
		)
	}

	get discountPercent(): number {
		return (
			+(
				100 -
				(this.product.payable_price / this.product.price) * 100
			).toFixed(0) || 0
		)
	}

	get formattedWholesaleDiscountPrice(): string {
		return (
			this.$stringUtils.prettyPrice(
				this.product.payable_price -
					this.product.wholesale_payable_price
			) || ''
		)
	}

	get categories(): ShopCategory[] {
		return this.$store.state.category.shopCategories || []
	}

	get category(): ShopCategory | null {
		return (
			this.categories.find((v) => v.id == this.product.category) || null
		)
	}

	get weightString(): string {
		const m = this.$stringUtils.stringWeight(this.product.weight)
		if (!m.value) return ''
		return m.value + ' ' + m.label
	}

	mounted() {}
}
</script>

<style scoped></style>
