<template>
	<div
		class="flex flex-col"
		:class="{
			'animate-pulse': loading,
		}"
	>
		<div class="flex items-center mb-3">
			<span v-if="!loading" class="text-3xl font-bold text-natural-dark">
				{{ product.title || '~' }}
			</span>
			<span v-else class="w-52 rounded-md bg-gray-200">
				<span class="opacity-0 select-none text-3xl">.</span>
			</span>
			<div class="flex-grow" />
			<MyIcon
				name="arrow-left"
				class="w-10 h-10 text-natural-dark hover:text-primary duration-300 cursor-pointer flex-shrink-0 self-start"
				@click="back"
			/>
		</div>

		<div v-if="!loading" class="flex items-center mb-5">
			<span class="text-natural-dark opacity-50 me-2">
				{{ (product.weight && weightString) || '~' }}
			</span>
			<span
				class="rounded-md bg-primary bg-opacity-10 px-3 py-1 text-sm font-bold text-primary-dark"
			>
				{{ (category && category.name) || '~' }}
			</span>
		</div>
		<div v-else class="bg-gray-200 rounded-md w-32 mb-5">
			<span class="opacity-0 select-none">.</span>
		</div>
		<div v-if="!loading" class="flex flex-col">
			<div v-if="hasWholesale" class="flex items-center mb-3">
				<span class="text-sm font-bold text-yellow-500 flex-shrink-0">
					{{ formattedWholesaleDiscountPrice || '0' }}
				</span>
				<MyIcon
					name="toman"
					class="w-5 h-5 text-yellow-500 mx-1 flex-shrink-0"
				/>
				<span class="text-sm font-medium text-yellow-500 flex-shrink-0">
					{{ $strings.wholesale_discount() }}
				</span>
			</div>
			<div class="flex items-center">
				<span class="text-5xl font-bold text-natural-dark">
					{{ formattedPrice || '0' }}
				</span>
				<MyIcon name="toman" class="w-10 h-10 text-natural-dark ms-1" />
			</div>
			<div v-if="hasDiscount" class="flex items-center mt-2.5">
				<span
					class="text-base font-normal text-natural-mute flex-shrink-0 line-through text-opacity-50 me-2"
				>
					{{ formattedMainPrice || '0' }}
				</span>
				<div
					class="text-white bg-green-500 rounded-full py-1 px-3 text-xs font-medium"
				>
					{{ discountPercent + '٪' }}
				</div>
			</div>
		</div>

		<div v-else class="flex items-center w-40 bg-gray-200 rounded-md">
			<span class="text-5xl opacity-0 select-none">. </span>
		</div>
		<span v-if="!loading" class="text-natural-dark mt-8">
			{{ product.description }}
		</span>
		<div v-else class="flex flex-col mt-8">
			<span v-for="i in 4" class="bg-gray-200 rounded-md mb-3">
				<span class="opacity-0 select-none">.</span>
			</span>
		</div>
		<div v-if="!loading" class="flex items-center mt-5">
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
			v-if="!loading"
			class="text-base font-bold border-2 px-8 py-4 rounded-xl mt-8 self-start cursor-pointer"
			:class="{
				'ripple-bg-primary-dark border-transparent text-white':
					!isInBasket,
				'ripple-bg-white border-primary-dark text-primary-dark':
					isInBasket,
			}"
			@click="
				isInBasket ? removeFromBasket(product) : addToBasket(product, 1)
			"
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

	back() {
		if (window.history.length > 2) {
			this.$router.back()
		} else {
			this.$router.push(this.$routeUrl.ShopUrl())
		}
	}
}
</script>

<style scoped></style>
