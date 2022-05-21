<template>
	<div class="flex w-full p-2 rounded-2xl">
		<img
			:src="$apiUrl.BaseUrl() + $apiUrl.GetMediaUrl(product.main_image)"
			alt=""
			class="w-16 h-16 rounded-xl"
		/>
		<div class="flex flex-col ms-2 flex-grow me-3 text-natural-dark">
			<div class="flex flex-row items-center">
				<span class="text-sm font-bold me-4">
					{{ product.title || $strings.without_name() }}
				</span>
				<span class="flex-grow" />
				<span class="text-xs font-medium me-1">
					{{ product.quantity || 1 }}
				</span>
				<span class="text-xs font-medium me-1"> * </span>
				<span class="text-xl font-bold me-1">
					{{ formattedPrice }}
				</span>
				<MyIcon name="toman" class="w-5 h-5" content="self-start" />
			</div>
			<div class="flex flex-row">
				<span class="flex items-center py-1 px-4 rounded bg-white me-2">
					<span class="text-xs font-bold">
						{{ weightString }}
					</span>
				</span>
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

	get formattedPrice(): string {
		return this.$stringUtils.thousandFormat(this.product.price || '') || ''
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
