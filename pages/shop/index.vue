<template>
	<MainContainer
		type="shop"
		:fetched="fetched"
		:loading.sync="loading"
		@tryAgain="fetchData"
	>
		<ShopCategories class="mb-9" />
		<ShopCover
			:title="coverInfo.title"
			:image="coverInfo.image"
			class="mb-20"
		/>
		<template v-if="!categoryId">
			<ProductList
				:products="saffrons"
				:title="$strings.types_of_saffron_available_for_sale()"
				:more-link="$routeUrl.ShopCategoryUrl(this.saffronCategoryId)"
				class="mb-20"
			/>
			<ProductList
				:products="cardamons"
				:title="$strings.types_of_cardamon_available_for_sale()"
				:more-link="$routeUrl.ShopCategoryUrl(this.cardamonCategoryId)"
				class="mb-32"
			/>
		</template>
		<div v-else class="flex flex-col px-6 items-center mb-32">
			<div class="max-w-screen-xl w-full flex flex-col">
				<div class="grid grid-cols-4 gap-16 mb-20">
					<ShopWeightCard
						v-for="(weight, i) in weights"
						:key="i"
						:title="$stringUtils.stringWeight(weight).value || $strings.all()"
						:subtitle="$stringUtils.stringWeight(weight).label  || $strings.weight()"
						:image="coverInfo.image2"
						:selected="selectedWeight === weight"
						@click="selectedWeight = weight"
					/>
				</div>
				<div class="h-px bg-gray-300 mb-20" />
				<div class="grid grid-cols-4 gap-10">
					<ProductCard
						v-for="(p, i) in filteredProducts"
						:key="i"
						:product="p"
					/>
				</div>
			</div>
		</div>
	</MainContainer>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import Vue from 'vue'
import MainContainer from '~/components/home/MainContainer.vue'
import ShopCategories from '~/components/shop/ShopCategories.vue'
import ShopCover from '~/components/shop/ShopCover.vue'
import { Product, ShopCategory } from '~/config/types'
import ProductList from '~/components/product/ProductList.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ShopWeightCard from '~/components/shop/ShopWeightCard.vue'
import { Context } from '@nuxt/types'

const _fetchData = async ({ app, store, route, error, $axios }: Context) => {
	try {
		const categoryId = route.params.category_id || null
		if (!categoryId) {
			const [r1, r2] = await Promise.all([
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 8,
						offset: 0,
						category_id: process.env.CATEGORY_SAFFRON_ID,
					},
				}),
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 8,
						offset: 0,
						category_id: process.env.CATEGORY_CARDAMON_ID,
					},
				}),
			])
			return {
				saffrons: r1.data.results,
				cardamons: r2.data.results,
				products: [],
			}
		} else {
			const [r1] = await Promise.all([
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 100,
						offset: 0,
						category_id: categoryId,
					},
				}),
			])
			return {
				saffrons: [],
				cardamons: [],
				products: r1.data.results,
			}
		}
	} catch (e: any) {
		app.$errorPage(error, e)
		return Promise.reject(e)
	}
}

@Component({
	middleware: ['fetch'],
	components: {
		ShopWeightCard,
		ProductCard,
		ProductList,
		ShopCover,
		ShopCategories,
		MainContainer,
		MyIcon,
	},
})
export default class ShopPage extends Vue {
	fetched = false
	loading = true
	selectedWeight = null as number | null
	saffrons = [] as Product[]
	cardamons = [] as Product[]
	products = [] as Product[]

	get saffronCategoryId(): string {
		return process.env.CATEGORY_SAFFRON_ID || ''
	}

	get cardamonCategoryId(): string {
		return process.env.CATEGORY_CARDAMON_ID || ''
	}

	get categoryId(): string | null {
		return this.$route.params.category_id || null
	}

	get categories(): ShopCategory[] {
		return this.$store.state.category.shopCategories || []
	}

	get category(): ShopCategory | null {
		return this.categories.find((v) => v.id === this.categoryId) || null
	}

	get weights(): (number | null)[] {
		return [0, ...new Set(this.products.map(v => +v.weight))].sort()
	}

	get coverInfo() {
		if (this.category?.id === this.cardamonCategoryId) {
			return {
				title: this.$strings.buy_n(this.category.name),
				image: '/img/image_category_cardamon.jpg',
				image2: '/img/image_cardamon_weight.jpg',
			}
		} else if (this.category?.id === this.saffronCategoryId) {
			return {
				title: this.$strings.buy_n(this.category.name),
				image: '/img/image_category_saffron.jpg',
				image2: '/img/image_saffron_weight.jpg',
			}
		} else if (this.category) {
			return {
				title: this.$strings.buy_n(this.category.name),
				image: '/img/image_category_all.jpg',
				image2: null,
			}
		} else {
			return {
				title: this.$strings.shop(),
				image: '/img/image_category_all.jpg',
				image2: null,
			}
		}
	}

	get filteredProducts() {
		return this.products.filter(v => !this.selectedWeight || v.weight === this.selectedWeight)
	}

	async asyncData(context: Context) {
		if (process.server) {
			return {
				...((await _fetchData(context)) || {}),
				fetched: true,
				loading: false,
			}
		} else {
			return {
				fetched: false,
				loading: true,
			}
		}
	}

	async fetchData() {
		this.loading = true
		_fetchData({
			app: this,
			route: this.$route,
			store: this.$store,
			$axios: this.$axios,
			error: this.$nuxt.error,
		} as any)
			.then((r) => {
				this.saffrons = r.saffrons
				this.cardamons = r.cardamons
				this.products = r.products
				this.fetched = true
			})
			.catch((e) => this.$toastErrors(this, e))
			.finally(() => {
				this.loading = false
			})
	}

	mounted() {
		if (!this.fetched) {
			this.fetchData()
		}
	}
}
</script>

<style scoped></style>
