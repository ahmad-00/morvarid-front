<template>
	<div class="flex w-full p-2 rounded-2xl">
		<div class="relative w-16 h-16">
			<img
				:src="
					$apiUrl.MediaBaseUrl($config) +
					$apiUrl.GetMediaUrl(product.main_image)
				"
				alt=""
				class="rounded-xl w-full h-full"
			/>
			<div
				class="absolute left-0 top-0 w-full h-full rounded-xl border-2 border-primary border-opacity-25 shadow-inner pointer-events-none"
			/>
		</div>
		<div class="flex flex-col ms-2 flex-grow me-3 text-natural-dark">
			<div class="flex flex-row items-center">
				<div class="flex flex-col">
					<span class="text-sm font-bold me-4">
						{{ product.title || $strings.without_name() }}
					</span>
					<div class="flex flex-row mt-1.5">
						<span
							class="flex items-center py-1 px-4 rounded bg-white me-2"
						>
							<span class="text-xs font-bold">
								{{ weightString }}
							</span>
						</span>
					</div>
				</div>
				<span class="flex-grow" />
				<div class="flex flex-col items-end">
					<div class="flex items-center text-natural-dark">
						<span class="text-xs font-medium me-1">
							{{ product.quantity || 1 }}
						</span>
						<span class="text-xs font-medium me-1"> * </span>
						<span class="text-xl font-bold me-1">
							{{ formattedPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-5 h-5"
							content="self-start"
						/>
					</div>
					<div
						v-if="hasDiscount"
						class="flex items-center mt-1 text-green-500"
					>
						<span
							class="text-xs font-medium me-1 text-natural-mute"
						>
							{{ product.quantity || 1 }}
						</span>
						<span
							class="text-xs font-medium me-1 text-natural-mute"
						>
							*
						</span>
						<span class="text-xs font-bold flex-shrink-0">
							{{ formattedDiscountPrice || '0' }}
						</span>
						<MyIcon
							name="toman"
							class="w-4 h-4 mx-1 flex-shrink-0"
						/>
						<span class="text-xs font-normal flex-shrink-0">
							{{ $strings.discount() }}
						</span>
					</div>
					<div
						v-if="isWholesale"
						class="flex items-center mt-1 text-yellow-500"
					>
						<span
							class="text-xs font-medium me-1 text-natural-mute"
						>
							{{ product.quantity || 1 }}
						</span>
						<span
							class="text-xs font-medium me-1 text-natural-mute"
						>
							*
						</span>
						<span class="text-xs font-bold flex-shrink-0">
							{{ formattedWholesaleDiscountPrice || '0' }}
						</span>
						<MyIcon
							name="toman"
							class="w-4 h-4 mx-1 flex-shrink-0"
						/>
						<span class="text-xs font-normal flex-shrink-0">
							{{ $strings.wholesale_discount() }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import MaterialLabel from '~/components/utils/MaterialLabel.vue'
import BasketProductCard from '~/components/basket/BasketProductCard.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Product, ShopCategory } from '~/config/types'

@Component({
	components: { MaterialLabel, BasketProductCard, MyIcon },
})
export default class BasketProductHorizontalCard extends Vue {
	@Prop({}) product!: Product

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
}
</script>

<style></style>
