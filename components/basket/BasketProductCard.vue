<template>
	<div
		class="bg-primary bg-opacity-3 rounded-2xl px-4 py-4 flex items-center"
	>
		<img
			:src="$apiUrl.BaseUrl() + $apiUrl.GetMediaUrl(product.main_image)"
			alt=""
			class="w-32 h-32 rounded-2xl me-6"
		/>
		<div class="flex flex-col flex-grow me-4">
			<span class="text-natural-dark font-black text-xl mb-3">
				{{ product.title || '~' }}
			</span>
			<div class="flex items-center">
				<span
					class="py-1.5 px-6 rounded-lg bg-white text-natural-dark font-bold me-4"
				>
					{{ weightString }}
				</span>
			</div>
		</div>
		<div class="flex items-center me-4 select-none">
			<MyIcon
				name="minus"
				class="w-5 h-5 text-primary-dark bg-primary bg-opacity-40 rounded-md cursor-pointer"
				@click="decQuantity"
			/>
			<span
				class="w-14 h-14 mx-4 border-2 border-primary-dark rounded-xl text-xl text-natural-dark flex items-center justify-center font-bold"
			>
				{{ product.quantity || 1 }}
			</span>
			<MyIcon
				name="plus"
				class="w-5 h-5 text-primary-dark bg-primary bg-opacity-40 rounded-md cursor-pointer"
				@click="incQuantity"
			/>
		</div>
		<div class="flex items-center justify-end me-12 w-64">
			<span class="text-3xl font-black text-natural-dark flex-shrink-0">
				{{ formattedPrice || '0' }}
			</span>
			<MyIcon
				name="toman"
				class="w-8 h-8 text-natural-dark ms-1 flex-shrink-0"
			/>
		</div>
		<MyIcon
			name="trash"
			class="w-9 h-9 text-natural-dark hover:text-red-500 duration-500 cursor-pointer me-2"
			@click="$emit('delete')"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Product, ShopCategory } from '~/config/types'

@Component({
	components: { MyIcon },
})
export default class BasketItemCard extends Vue {

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

	incQuantity() {
		this.$emit('update:product', {
			...this.product,
			quantity: (this.product.quantity || 0) + 1,
		})
	}

	decQuantity() {
		this.$emit('update:product', {
			...this.product,
			quantity: Math.max((this.product.quantity || 0) - 1, 1),
		})
	}
}
</script>

<style scoped></style>
