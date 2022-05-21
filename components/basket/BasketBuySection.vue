<template>
	<div class="flex flex-col flex-grow">
		<div v-if="products.length" class="flex flex-col flex-grow">
			<BasketProductCard
				v-for="(p, i) in products"
				:product="p"
				@update:product="updateItem"
				:key="i"
				class="mb-4"
				@delete="deleteItem(p)"
			/>
			<div class="flex-grow" />
			<div class="flex items-start justify-end mt-16">
				<MaterialLabel
					v-if="false"
					:value="discountCodeTemp"
					class="bg-primary-dark bg-opacity-5 rounded-lg w-full max-w-sm flex items-center me-16"
					:label="$strings.discount_code()"
				>
					<input
						class="appearance-none px-5 py-4 font-bold text-natural-dark bg-transparent flex-grow w-full focus:outline-none me-1 rounded-lg"
						v-model="discountCodeTemp"
					/>
					<button
						class="ripple-bg-primary-dark text-white font-bold py-3 px-8 rounded-lg me-1 focus:outline-none"
					>
						{{ $strings.apply() }}
					</button>
				</MaterialLabel>
				<div class="flex flex-col w-full max-w-md">
					<div class="flex items-center py-px ps-8 pe-6 w-full">
						<span class="text-xl text-natural-dark flex-grow">
							{{ $strings.total() }}
						</span>
						<span class="text-3xl text-natural-dark font-bold">
							{{ formattedTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-8 h-8 text-natural-dark ms-1 flex-shrink-0"
						/>
					</div>
					<div
						v-if="false"
						class="flex items-center py-px ps-8 pe-6 w-full mt-3"
					>
						<span class="text-xl text-natural-dark flex-grow">
							{{ $strings.discount() }}
						</span>
						<span class="text-3xl text-green-500 font-bold">
							{{ formattedTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-7 h-7 text-natural-dark ms-1 flex-shrink-0"
						/>
					</div>
					<div
						class="flex items-center bg-primary-dark bg-opacity-10 rounded-full py-2 ps-8 pe-6 w-full mt-7"
					>
						<span
							class="text-xl text-natural-dark flex-grow font-medium"
						>
							{{ $strings.payment_amount() }}
						</span>
						<span class="text-3xl font-bold text-natural-dark">
							{{ formattedTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-7 h-7 text-natural-dark ms-1 flex-shrink-0"
						/>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="flex flex-col flex-grow items-center justify-center">
			<span class="text-3xl font-bold text-natural-mute opacity-50 my-12">
				{{ $strings.nothing_found() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import BasketProductCard from '~/components/basket/BasketProductCard.vue'
import { Product } from '~/config/types'
import MaterialLabel from '~/components/utils/MaterialLabel.vue'

@Component({
	components: { MaterialLabel, BasketProductCard, MyIcon },
})
export default class BasketBuySection extends Vue {
	@Prop({}) products!: Product[]

	discountCodeTemp = null as string | null

	get totalPrice(): number {
		return (
			this.products
				.map((v) => (v.quantity || 0) * v.price)
				.reduce((a, b) => a + b, 0) || 0
		)
	}

	get formattedTotalPrice(): string {
		return this.$stringUtils.thousandFormat(this.totalPrice) || ''
	}

	updateItem(product: Product) {
		this.$emit(
			'update:products',
			this.products.map((v) => (v.id !== product.id ? v : product))
		)
	}

	deleteItem(product: Product) {
		this.$emit(
			'update:products',
			this.products.filter((v) => v.id !== product.id)
		)
	}
}
</script>

<style scoped></style>
