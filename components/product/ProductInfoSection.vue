<template>
	<div class="flex flex-col">
		<span class="text-4xl font-black text-natural-dark mb-3">
			{{ product.title || '~' }}
		</span>
		<div class="flex items-center mb-5">
			<span class="text-natural-dark opacity-50 me-2">
				{{ (product.weight && weightString) || '~' }}
			</span>
			<span
				class="rounded-md bg-primary bg-opacity-10 px-3 py-1 text-sm font-bold text-primary-dark"
			>
				{{ (category && category.name) || '~' }}
			</span>
		</div>
		<div class="flex items-center">
			<span class="text-5xl font-black text-natural-dark">
				{{ formattedPrice || '0' }}
			</span>
			<MyIcon name="toman" class="w-10 h-10 text-natural-dark ms-1" />
		</div>
		<span class="text-natural-dark mt-8">
			{{ product.description }}
		</span>
		<div class="flex items-center mt-5">
			<span class="text-natural-dark w-20 me-4">
				{{ $strings.weight() + ' :' }}
			</span>
			<span
				class="py-3 px-6 rounded-md bg-primary-dark bg-opacity-5 text-natural-dark font-bold"
			>
				{{ weightString }}
			</span>
		</div>
		<div v-if="false" class="flex items-center mt-4">
			<span class="text-natural-dark w-20 me-4">
				{{ $strings.grade() + ' :' }}
			</span>
			<span
				class="py-3 px-6 rounded-md bg-primary-dark bg-opacity-5 text-natural-dark font-bold"
			>
				{{ 'AAA' }}
			</span>
		</div>
		<span
			class="text-lg font-bold border-2 px-8 py-4 rounded-xl mt-8 self-start cursor-pointer"
			:class="{
				'ripple-bg-primary-dark border-transparent text-white': !isInBasket,
				'ripple-bg-white border-primary-dark text-primary-dark': isInBasket,
			}"
			@click="isInBasket ? removeFromBasket(product) : addToBasket(product, 1)"
		>
			{{
				isInBasket
					? $strings.remove_from_basket()
					: $strings.add_to_basket()
			}}
		</span>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import Vue from 'vue'
import { Product, ShopCategory } from '~/config/types'

@Component({
	components: {
		MyIcon,
	},
})
export default class ProductInfoSection extends Vue {
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

	get isInBasket(): boolean {
		return !!this.basket.find((v) => v.id === this.product.id)
	}

	get basket(): Product[] {
		return this.$store.state.basket.basket || []
	}

	addToBasket(product: Product, quantity: number) {
		this.$store.dispatch('basket/add', {
			...product,
			quantity: quantity,
		})
	}

	removeFromBasket(product: Product) {
		this.$store.dispatch('basket/remove', product.id)
	}
}
</script>

<style scoped></style>
