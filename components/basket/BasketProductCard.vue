<template>
	<div
		class="bg-primary bg-opacity-3 rounded-2xl px-4 py-4 flex-col lg:flex-row flex lg:items-center"
	>
		<div class="flex items-center mb-4 lg:mb-0">
			<div class="relative w-28 h-28 me-6">
				<img
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
				<span
					class="w-12 h-12 mx-4 border-2 border-primary-dark rounded-xl text-lg text-natural-dark flex items-center justify-center font-bold"
				>
					{{ product.quantity || 1 }}
				</span>
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
			<div class="flex items-center justify-end me-12 w-auto lg:w-64">
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
