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
						$apiUrl.BaseUrl() +
						$apiUrl.GetMediaUrl(product.main_image)
					"
					alt=""
					class="w-full h-full absolute left-0 top-0 object-cover"
				/>
				<span
					v-if="product.quantity"
					class="w-8 h-8 bg-white rounded-xl absolute end-0 top-0 start-0 end-0 mx-auto mt-4 flex items-center justify-center text-sm text-natural-semidark font-bold shadow-sm p-0.5"
				>
					<span class="line-clamp-1">
						{{ product.quantity }}
					</span>
				</span>
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
				class="text-lg font-bold text-natural-dark hover:text-primary duration-300 line-clamp-2 me-3"
			>
				{{ product.title || '~' }}
			</nuxt-link>
			<span v-else class="bg-gray-200 rounded-md w-20 me-3">
				<span class="text-lg opacity-0 select-none"> . </span>
			</span>
			<span class="flex-grow" />
			<div v-if="!loading" class="flex items-center">
				<span class="text-lg font-bold text-natural-dark flex-shrink-0">
					{{ formattedPrice || '0' }}
				</span>
				<MyIcon
					name="toman"
					class="w-6 h-6 text-natural-dark ms-1 flex-shrink-0"
				/>
			</div>
			<span v-else class="bg-gray-200 rounded-md w-12">
				<span class="text-lg opacity-0 select-none"> . </span>
			</span>
		</div>
		<span class="flex-grow" />
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

<style scoped></style>
