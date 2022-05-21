<template>
	<MainContainer
		type="shop"
		:fetched="fetched"
		:loading.sync="loading"
		@tryAgain="fetchData"
	>
		<div class="flex flex-col px-6 items-center mt-16">
			<div class="max-w-screen-xl w-full flex flex-col">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
					<div class="grid-cols-1 lg:col-span-6 flex flex-col">
						<ProductSliderSection :loading="loading" :images="images" />
					</div>
					<div class="grid-cols-1 lg:col-span-6">
						<ProductInfoSection :loading="loading" :product="product" />
					</div>
				</div>
			</div>
		</div>
		<ProductList
			:products="relatedProducts"
			:title="$strings.related_goods()"
			class="mb-32"
			:loading="loading"
		/>
	</MainContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import MainContainer from '~/components/home/MainContainer.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import ProductSliderSection from '~/components/product/ProductSliderSection.vue'
import { Image, Product, ShopCategory } from '~/config/types'
import ProductInfoSection from '~/components/product/ProductInfoSection.vue'
import ProductList from '~/components/product/ProductList.vue'
import { Context } from '@nuxt/types'

const _fetchData = async ({ app, store, route, error, $axios }: Context) => {
	try {
		const productId = route.params.product_id || null
		const r1 = await $axios.get(app.$apiUrl.GetShopProduct(productId))
		const product: Product = r1.data
		const r2 = await $axios.get(app.$apiUrl.GetShopProducts(), {
			params: {
				offset: 0,
				limit: 8,
				category_id: product.category,
			},
		})
		const relatedProducts = r2.data.results

		return {
			product: product,
			relatedProducts: relatedProducts,
		}
	} catch (e: any) {
		app.$errorPage(error, e)
		return Promise.reject(e)
	}
}

@Component({
	middleware: ['fetch'],
	components: {
		ProductList,
		ProductInfoSection,
		ProductSliderSection,
		MainContainer,
		MyIcon,
	},
})
export default class ProductPage extends Vue {
	fetched = false
	loading = true
	product = {} as Product
	relatedProducts = [] as Product[]

	get productId(): string | null {
		return this.$route.params.product_id || null
	}

	get images(): Image[] {
		return (
			([
				this.product.main_image,
				...(this.product.images?.map((v) => v.image) || []),
			]
				.filter((v) => v)
				.map((v) => ({
					id: null,
					path: v,
					path_thumb1: v,
					path_thumb2: v,
				})) as Image[]) || []
		)
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
				this.product = r.product
				this.relatedProducts = r.relatedProducts
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
