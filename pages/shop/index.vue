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
				:loading="loading"
			/>
			<ProductList
				:products="cardamons"
				:title="$strings.types_of_cardamon_available_for_sale()"
				:more-link="$routeUrl.ShopCategoryUrl(this.cardamonCategoryId)"
				class="mb-32"
				:loading="loading"
			/>
		</template>
		<template v-else>
			<ShopWeightList
				:data="weightInfoList"
				@select="(w) => changeWeight(w)"
				class="mb-20"
				:loading="loading"
			/>
			<div class="flex flex-col px-6 items-center mb-32">
				<div class="max-w-screen-xl w-full flex flex-col">
					<div class="h-px bg-gray-300 mb-20" />
					<div
						v-if="loading || products.length"
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10"
					>
						<template v-if="loading">
							<ProductCard
								v-for="i in 4"
								:key="i"
								:loading="true"
							/>
						</template>
						<template v-else>
							<ProductCard
								v-for="(p, i) in products"
								:key="i"
								:product="p"
							/>
						</template>
					</div>
					<UndrawEmpty
						v-else
						class="w-full max-w-xs h-auto text-primary self-center"
					/>
				</div>
			</div>
		</template>
	</MainContainer>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'
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
import ShopWeightList from '~/components/shop/ShopWeightList.vue'
import UndrawEmpty from '~/assets/img/undraw_empty.svg'

const Qs = require('qs')

const _fetchData = async ({
	app,
	store,
	route,
	error,
	$axios,
	$config,
}: Context) => {
	try {
		const weights = route.query['weights[]'] || []
		const categoryId = route.params.category_id || null
		if (!categoryId) {
			const [r1, r2, r3] = await Promise.all([
				$axios.get(app.$apiUrl.GetWeightsUrl()),
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 8,
						offset: 0,
						category_id: $config.env.CATEGORY_SAFFRON_ID,
					},
				}),
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 8,
						offset: 0,
						category_id: $config.env.CATEGORY_CARDAMON_ID,
					},
				}),
			])
			return {
				weights: [0, ...r1.data.weights],
				saffrons: r2.data.results,
				cardamons: r3.data.results,
				products: [],
			}
		} else {
			const [r1, r2] = await Promise.all([
				$axios.get(app.$apiUrl.GetWeightsUrl()),
				$axios.get(app.$apiUrl.GetShopProducts(), {
					params: {
						limit: 100,
						offset: 0,
						category_id: categoryId,
						weight: weights,
					},
					paramsSerializer: function (params) {
						return Qs.stringify(params, { arrayFormat: 'repeat' })
					},
				}),
			])
			return {
				saffrons: [],
				cardamons: [],
				weights: [0, ...r1.data.weights],
				products: r2.data.results,
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
		ShopWeightList,
		ShopWeightCard,
		ProductCard,
		ProductList,
		ShopCover,
		ShopCategories,
		MainContainer,
		MyIcon,
		UndrawEmpty,
	},
})
export default class ShopPage extends Vue {
	fetched = false
	loading = true
	saffrons = [] as Product[]
	cardamons = [] as Product[]
	products = [] as Product[]
	weights = [] as number[]

	get saffronCategoryId(): string {
		return this.$config.env.CATEGORY_SAFFRON_ID || ''
	}

	get cardamonCategoryId(): string {
		return this.$config.env.CATEGORY_CARDAMON_ID || ''
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

	get coverInfo() {
		if (this.category?.id === this.cardamonCategoryId) {
			return {
				title: this.$strings.buy_n(this.category.name),
				subtitle: this.$strings.cardamon_footer_message(),
				image: '/img/image_category_cardamon.jpg',
				image2: '/img/image_cardamon_weight.jpg',
			}
		} else if (this.category?.id === this.saffronCategoryId) {
			return {
				title: this.$strings.buy_n(this.category.name),
				subtitle: this.$strings.saffron_footer_message(),
				image: '/img/image_category_saffron.jpg',
				image2: '/img/image_saffron_weight.jpg',
			}
		} else if (this.category) {
			return {
				title: this.$strings.buy_n(this.category.name),
				subtitle: '',
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

	get queryWeights(): any {
		return this.$route.query['weights[]']
	}

	get selectedWeights(): number[] {
		const w = this.queryWeights
		if (!w) return [0]
		if (typeof w === 'string') return [0]
		const a = w
			.map((v: any) => +(v || 0))
			.filter((v: any) => v)
			.filter((v: any) => this.weights.includes(v))
		return a.length ? a : [0]
	}

	get weightInfoList(): any[] {
		return this.weights.map((w) => ({
			weight: w,
			title:
				this.$stringUtils.stringWeight(w).value || this.$strings.all(),
			subtitle:
				this.$stringUtils.stringWeight(w).label ||
				this.$strings.weight(),
			image: this.coverInfo.image2,
			selected: this.selectedWeights.includes(w),
		}))
	}

	@Watch('queryWeights')
	onWeightChange() {
		this.fetchData()
	}

	async changeWeight(w: number) {
		if (w === 0 && this.selectedWeights.includes(0)) return
		this.loading = true
		if (w === 0) {
			await this.$router.replace({
				query: {
					...this.$route.query,
					'weights[]': [],
				},
			})
		} else if (this.selectedWeights.includes(w)) {
			await this.$router.replace({
				query: {
					...this.$route.query,
					'weights[]': this.selectedWeights
						.filter((v) => v)
						.filter((v) => v !== w)
						.map((v) => String(v)),
				},
			})
		} else {
			await this.$router.replace({
				query: {
					...this.$route.query,
					'weights[]': [...this.selectedWeights, w]
						.filter((v) => v)
						.map((v) => String(v)),
				},
			})
		}
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
			$config: this.$config,
			error: this.$nuxt.error,
		} as any)
			.then((r) => {
				this.weights = r.weights
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

	head() {
		if (this.category) {
			return {
				title: this.coverInfo.subtitle
					? this.coverInfo.title + ' | ' + this.coverInfo.subtitle
					: this.coverInfo.title,
			}
		} else {
			return {
				title:
					this.$strings.shop() + ' | ' + this.$strings.app_subtitle(),
			}
		}
	}
}
</script>

<style scoped></style>
