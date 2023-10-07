<template>
	<div
		class="bg-primary bg-opacity-3 rounded-2xl px-4 py-4 flex-col lg:flex-row flex lg:items-center"
	>
		<div class="flex items-center mb-4 lg:mb-0">
			<div class="relative w-28 h-28 me-6">
				<img
					v-if="product && product.main_image"
					:src="
						$apiUrl.MediaBaseUrl($config) +
						$apiUrl.GetMediaUrl(product.main_image)
					"
					alt=""
					class="rounded-2xl w-full h-full"
				/>
				<div
					class="absolute left-0 top-0 w-full h-full rounded-2xl border-2 border-primary border-opacity-25 shadow-inner pointer-events-none"
				/>
			</div>
			<div class="flex flex-col flex-grow me-4">
				<span
					class="text-natural-dark font-bold text-lg mb-3 line-clamp-2"
				>
					{{ product.title || '~' }}
				</span>
				<div class="flex items-center line-clamp-1">
					<span
						class="py-1.5 px-6 rounded-lg bg-white text-natural-dark font-bold me-4 text-sm"
					>
						{{ weightString }}
					</span>
				</div>
			</div>
		</div>
		<div class="flex-grow" />
		<div
			class="flex items-center border-t lg:border-t-0 border-gray-200 pt-4 lg:pt-0 justify-center"
		>
			<div class="flex items-center me-4 select-none">
				<MyIcon
					name="minus"
					class="w-5 h-5 text-primary-dark bg-primary bg-opacity-40 rounded-md cursor-pointer"
					@click="decQuantity"
				/>
				<div class="relative mx-4 inline">
					<span
						class="h-12 border-2 px-3 border-primary-dark rounded-xl text-lg text-natural-dark flex items-center justify-center font-bold"
						:style="{
							minWidth: '48px',
						}"
						@click="
							(e) => {
								e.stopPropagation()
								// isQuantityInputVisible = !isQuantityInputVisible
							}
						"
					>
						{{ product.quantity }}
					</span>
					<div
						v-if="isQuantityInputVisible"
						class="absolute flex flex-col items-center left-0 right-0 mt-1"
						@click="(e) => e.stopPropagation()"
					>
						<div
							class="w-52 bg-white border border-gray-200 px-2 pt-4 pb-2 rounded-lg shadow-lg"
						>
							<TextInput
								type="number"
								:label="$strings.quantity()"
								:value="product.quantity"
								@change="
									(v) => {
										$emit('update:product', {
											...product,
											quantity: +v || '',
										})
									}
								"
							/>
						</div>
					</div>
				</div>
				<MyIcon
					name="plus"
					class="w-5 h-5 text-primary-dark bg-primary bg-opacity-40 rounded-md cursor-pointer"
					@click="incQuantity"
				/>
			</div>
		</div>
		<div
			class="flex items-center border-t lg:border-t-0 border-gray-200 pt-4 lg:pt-0 mt-4 lg:mt-0"
		>
			<div class="flex flex-col me-12 w-auto lg:w-64">
				<div class="flex flex-col self-end items-center">
					<div class="flex items-center">
						<span
							class="text-2xl font-bold text-natural-dark flex-shrink-0"
						>
							{{ formattedPrice || '0' }}
						</span>
						<MyIcon
							name="toman"
							class="w-6 h-6 text-natural-dark ms-1 flex-shrink-0"
						/>
					</div>
					<div v-if="hasDiscount" class="flex items-center mt-1">
						<span
							class="text-xs font-bold text-green-500 flex-shrink-0"
						>
							{{ formattedDiscountPrice || '0' }}
						</span>
						<MyIcon
							name="toman"
							class="w-4 h-4 text-green-500 mx-1 flex-shrink-0"
						/>
						<span
							class="text-xs font-medium text-green-500 flex-shrink-0"
						>
							{{ $strings.discount() }}
						</span>
					</div>
					<div v-if="isWholesale" class="flex items-center mt-1">
						<span
							class="text-xs font-bold text-yellow-500 flex-shrink-0"
						>
							{{ formattedWholesaleDiscountPrice || '0' }}
						</span>
						<MyIcon
							name="toman"
							class="w-4 h-4 text-yellow-500 mx-1 flex-shrink-0"
						/>
						<span
							class="text-xs font-medium text-yellow-500 flex-shrink-0"
						>
							{{ $strings.wholesale_discount() }}
						</span>
					</div>
				</div>
			</div>
			<div class="flex-grow flex lg:hidden" />
			<MyIcon
				name="trash"
				class="w-8 h-8 text-natural-dark hover:text-red-500 duration-500 cursor-pointer me-2"
				@click="$emit('delete')"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import TextInput from '~/components/utils/TextInput.vue'
import { Product, ShopCategory } from '~/config/types'

@Component({
	components: { MyIcon, TextInput },
})
export default class BasketItemCard extends Vue {
	@Prop({}) product!: Product

	isQuantityInputVisible = false

	get hasDiscount(): boolean {
		return (
			!!this.product.payable_price &&
			this.product.payable_price != this.product.price
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

	get formattedPrice(): string {
		if (this.isWholesale) {
			return this.formattedWholesalePayablePrice
		} else if (this.hasDiscount) {
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

	get formattedWholesalePayablePrice(): string {
		return (
			this.$stringUtils.prettyPrice(
				this.product.wholesale_payable_price || ''
			) || ''
		)
	}

	get formattedDiscountPrice(): string {
		return (
			this.$stringUtils.prettyPrice(
				this.product.price - this.product.payable_price
			) || ''
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

	incQuantity() {
		const q = Number(this.product.quantity) || 0
		this.$emit('update:product', {
			...this.product,
			quantity: Math.min(
				q + 1,
				this.product.max_order_quantity || Number.MAX_VALUE
			),
		})
	}

	decQuantity() {
		const q = Number(this.product.quantity) || 0
		this.$emit('update:product', {
			...this.product,
			quantity: Math.max(q - 1, 1),
		})
	}

	clickOutside() {
		this.isQuantityInputVisible = false
	}

	mounted() {
		document.addEventListener('click', this.clickOutside)
	}

	destroyed() {
		document.removeEventListener('click', this.clickOutside)
	}
}
</script>

<style scoped></style>
